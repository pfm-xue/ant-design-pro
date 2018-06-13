import React, { PureComponent, } from 'react';
import { connect } from 'dva';
import { Card, Badge, Tabs, Button, Calendar, Steps, Icon, Form, Modal, Input, message, Upload } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'dva/router';
import styles from './TableList.less';
import moment from 'moment';
import {_} from 'lodash';

const { Description } = DescriptionList;
const { TabPane } = Tabs;
const { Step } = Steps;

 
const FormItem = Form.Item;

const CreateForm = Form.create()(props => {
  const { modalVisible, form, handleAdd, handleModalVisible } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="タスク新規"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実行時間">
        {form.getFieldDecorator('executeTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="使用者">
        {form.getFieldDecorator('task_user', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者">
        {form.getFieldDecorator('task_admin', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ user, task }) => ({
  task,
  user,
}))
@Form.create()
export default class UserShow extends PureComponent {
  state = {
    modalVisible: false,
    formValues: {},
    fileList: [],
    previewVisible: false,
    previewImage: '',
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'user/show',
      payload: this.props.match.params.id,
    });
    dispatch({
      type: 'task/fetch',
    });    
  }

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'user/fetch',
      payload: {},
    });
  };

  handleSearch = e => {
    e.preventDefault();

    const { dispatch, form } = this.props;

    form.validateFields((err, fieldsValue) => {
      if (err) return;

      const values = {
        ...fieldsValue,
        updatedAt: fieldsValue.updatedAt && fieldsValue.updatedAt.valueOf(),
      };

      this.setState({
        formValues: values,
      });

      dispatch({
        type: 'user/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields,
      },
    });

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
    const { user: { data }, task } = this.props;

    const { modalVisible, fileList, previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    function dateCellRender(value) {
      // const list = task.data.list;
      // for (var i=0;i<31;i++) {
      //   const executeTime = list[0].executeTime;
      //   if (moment(executeTime).format('YYYY-MM-DD') === moment(value._d).format('YYYY-MM-DD') ) {
      //     return (
      //       <ul className="events">
      //         {/* <a onClick={() => confirm(listData)} > */}
      //         {/* {listData.map(item => (
      //             <li key={item.content}>
      //               <Badge status={item.type} text={item.content}>
      //               </Badge>
      //             </li>
      //           ))} */}
      //         {/* </a> */}
      //         <div>{moment(value._d).format('YYYY-MM-DD')}</div>;
      //       </ul>
      //     );
      //   }
      // }
    }

    return (
      <PageHeaderLayout title="使用者詳細情報">
          <Card style={{ marginBottom: 24 }} title="使用者情報" bordered={false} >
              {/* <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
                <p><Description term="利用者氏名">{data.list[0].name}</Description></p>
                <p><Description term="ふりがな">{data.list[0].phonetic}</Description></p>
                <p><Description term="生年月日">{moment(data.list[0].birth).format('YYYY-MM-DD')}</Description></p>
                <p><Description term="性別">{data.list[0].sex}</Description></p>
                <p><Description term="電話番号">1234567893215</Description></p>
                <p><Description term="住所">东京都江戸川区江戸川（1～3丁目、4丁目1～14番）</Description></p>
              </DescriptionList> */}
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
                  // monthCellRender={monthCellRender}
                />
            </Card>      
        　</TabPane>
            {/*計画書*/}
            <TabPane tab="計画書" key="plan">
            <Card title="" style={{ marginBottom: 24 }} bordered={false}>
              <Link to="/form/advanced-form" >
                <Button type="primary" icon="plus">新規</Button>
              </Link>
              <br/><br/>
                <Steps direction="vertical" >
                  <Step title="2018-07-01" description='藤野和宏  第六次生成計画書。 -- 藤野和宏、冈本柊人' icon={<Link to="/profile/plan-show" ><Icon type="edit" /></Link>}/>
                  <Step title="2018-04-01" description='藤野和宏  第五次生成計画書。 -- 冈本柊人' icon={<Link to="/dashboard/monitor" ><Icon type="edit" /></Link>}/>
                  <Step title="2018-01-01" description='藤野和宏  第四次生成計画書。 -- 藤野和宏、冈本柊人' icon={<Link to="/dashboard/monitor" ><Icon type="edit" /></Link>}/>
                  <Step title="2017-09-01" description='第三次生成計画書。 -- 藤野和宏、冈本柊人' icon={<Link to="/dashboard/monitor" ><Icon type="edit" /></Link>}/>                
                  <Step title="2017-06-01" description='第二次生成計画書。 -- 冈本柊人' icon={<Link to="/dashboard/monitor" ><Icon type="edit" /></Link>}/>
                  <Step title="2017-03-01" description='計画書が初めて作成する。 -- 藤野和宏、冈本柊人' icon={<Link to="/dashboard/monitor" ><Icon type="edit" /></Link>}/>
                </Steps>
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
