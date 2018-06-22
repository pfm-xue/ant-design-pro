import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Card, DatePicker, Table, Divider, Tabs, Button, Calendar, Steps, Icon, Form, Modal, Select, Input, TimePicker, message, Popconfirm, Upload } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import StandardTable from 'components/StandardTable';
const { Description } = DescriptionList;
import { Link } from 'dva/router';
import moment from 'moment';

const FormItem = Form.Item;
const { TabPane } = Tabs;
const { Step } = Steps;

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

@connect(({ task, role, loading }) => ({
  role,
  task,
  roleLoading: loading.models.user,
  taskLoading: loading.models.task,
}))
@Form.create()
export default class RoleShow extends PureComponent {
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
      type: 'role/show',
      payload: this.props.match.params.id,
    });    
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
    const { task, roleLoading, role: {data} } = this.props;
    const { modalVisible } = this.state;

    const { previewVisible, previewImage, fileList } = this.state;
    
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const parentMethods = {
      handleAddTask: this.handleAddTask,
      handleModalVisible: this.handleModalVisible,
    };

    function confirm(data) {
      Modal.confirm({
        iconType: 'bars',
        title: 'タスク詳細情報',
        okText: '保存',
        cancelText: 'キャンセル',
        maskClosable: 'false',
        content: (
          <div>
            <Card title="" style={{ marginBottom: 24 }} bordered={false}>
              <FormItem label="タスク予定時間">
                {(<DatePicker defaultValue={moment(data.executeTime, "YYYY/MM/DD")} format={"YYYY/MM/DD"}/>)}
              </FormItem>                         
              <div>
                <ul className="events">
                    <li>利用者氏名：{data.task_user.name}</li>
                    <li>管理者氏名：{data.task_admin.adminName}</li>
                </ul>
              </div>
            </Card>  
          </div>
        ),
        onOk() {
          // const data = {
          //   _id: data._id,
          //   executeTime1: data.executeTime,
          // };
          // this.handleAdd(data);
        },
        onCancel() {
        },
      });
    }

    function getListData(value) {
      const list = task.data.list;
      let data;
      list.map(item => {
        const executeTime = moment(item.executeTime).format('YYYY-MM-DD');
        const valueTime = moment(value._d).format('YYYY-MM-DD');
        if ( executeTime === valueTime ) {
          data = item;
        }
      }) 
      return data;
    }

    function dateCellRender(value) {
      const list = getListData(value);
      if(typeof(list) === "undefined"){
        return <div></div>;
      } else {
        return (
          <ul className="events">
            <a onClick={() => confirm(list)} >
              <li>予定時間:{moment(list.executeTime).format('YYYY-MM-DD')}</li>
              <li>利用者氏名：{list.task_user.name}</li>
            </a>
          </ul>
        );
      }
    }
  
    return data && (
      <PageHeaderLayout title="管理者詳細情報">
        <Card style={{ marginBottom: 24 }} title="管理者情報" bordered={false} >
          <DescriptionList loading={roleLoading} size="large" title="" style={{ marginBottom: 32 }}>
              {/* <Description term="名前">{data.list[0].adminName}</Description>
              <Description term="role">{data.list[0].role}</Description>
              <Description term="電話番号">{data.list[0].telephoneNumber}</Description>
              <Description term="Email">{data.list[0].email}</Description> */}
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