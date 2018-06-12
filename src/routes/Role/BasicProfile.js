import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs, Button, Calendar, Steps, Icon, Form, Modal, Select, Input, TimePicker, message, Popconfirm, Upload } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import StandardTable from 'components/StandardTable';
const { Description } = DescriptionList;
import { Link } from 'dva/router';
const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Step } = Steps;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAddTask, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAddTask(fieldsValue);
    });
  };
  return (
    <Modal
      title="管理者登録"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実行時間">
        {form.getFieldDecorator('executeTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input type="Date" placeholder="実行時間" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="到着時間">
        {form.getFieldDecorator('arrivalTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input type="Date" placeholder="到着時間" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))
@Form.create()
export default class BasicProfile extends PureComponent {
  state = {
    modalVisible1: false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetch',
    });
  }

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAddTask = fields => {
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { task, loading } = this.props;
    const { modalVisible } = this.state;

    const { previewVisible, previewImage, fileList } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    function getListData(value) {
      let listData;
      switch (value.date()) {
        case 1:
          listData = [
            { type: 'warning', content: '屋外歩行訓練' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
          ]; break;
        case 2:
          listData = [
            { type: 'warning', content: '屋外歩行訓練' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
            { type: 'error', content: '下肢筋力訓練' },
          ]; break;
        case 30:
          listData = [
            { type: 'warning', content: '屋外歩行訓練' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
          ]; break;
        default:
      }
      return listData || [];
    }

    function getMonthData(value) {
      if (value.month() === 8) {
        return 1394;
      }
    }
    
    function monthCellRender(value) {
      const num = getMonthData(value);
      return num ? (
        <div className="notes-month">
          <section>{num}</section>
          <span>Backlog number</span>
        </div>
      ) : null;
    }

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };

    const onPrev = () => {
      dispatch(routerRedux.push('/dashboard/workplace'));
    };

    // function confirm() {
    //   message.success('点击了确定');
    // }
    
    // function cancel() {
    // }

    // function confirm(data) {
    //   Modal.confirm({
    //     iconType: 'bars',
    //     title: '詳細情報',
    //     okText: '編集',
    //     cancelText: '削除',
    //     maskClosable: 'false',
    //     content: (
    //       <div>                
    //         <Card title="" style={{ marginBottom: 24 }} bordered={false}>
    //           {
    //             data.map(item => (
    //               <li key={item.content}>
    //                 <Badge status={item.type} text={item.content}>
    //                 </Badge>
    //               </li>
    //             ))
    //           }            
    //         </Card>  
    //       </div>
    //     ),
    //     onOk() {
    //     },
    //     onCancel() {
    //     },
    //   });
    // }
    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {/* <a onClick={() => confirm(listData)} > */}
          {
            listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content}>
                </Badge>
              </li>
            ))
          }
          {/* </a> */}
        </ul>
      );
    }
  
    return (
      <PageHeaderLayout title="管理者詳細情報">
        <Card style={{ marginBottom: 24 }} title="管理者情報" bordered={false} >
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term="管理者氏名">曲丽丽</Description>
            <Description term="電話番号">15541188563</Description>
            <Description term="性別">女</Description>
            <Description term="role">介護士、看護師</Description>
          </DescriptionList>
        </Card>
        <Card bodyStyle={{ padding: 0 }} bordered={false} title="" >
          <Tabs>         
            {/*スケジュール*/}
            <TabPane tab="スケジュール" key="assessment">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Button type="primary" icon="plus" onClick={() => this.handleModalVisible(true)} >新規</Button>
                <br/><br/>
                  <Calendar
                    dateCellRender={dateCellRender}
                    monthCellRender={monthCellRender}
                  />
              </Card>      
          　</TabPane>
            {/*画像*/}
            <TabPane tab="画像" key="record">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Upload
                  action="//jsonplaceholder.typicode.com/posts/"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                >
                  {uploadButton}
                </Upload>
                <Modal visible={previewVisible} footer={null} onCancel={this.handleCancel}>
                  <img alt="example" style={{ width: '100%' }} src={previewImage} />
                </Modal>
              </Card>  
            </TabPane>
          </Tabs>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
      </PageHeaderLayout>
    );
  }
}