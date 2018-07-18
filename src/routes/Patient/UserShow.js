import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Card,
  Tabs,
  Row,
  Col,
  Button,
  Calendar,
  Steps,
  Icon,
  Form,
  Modal,
  Input,
  Upload,
  DatePicker,
} from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import { Link } from 'dva/router';
// import styles from './UserShow.less';
import moment from 'moment';

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

@connect(({ user, task, plan, assessment }) => ({
  task,
  user,
  plan,
  assessment,
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
      type: 'task/fetch',
    });
    dispatch({
      type: 'user/show',
      payload: this.props.match.params.id,
    });
    dispatch({
      type: 'plan/fetch',
    });
    dispatch({
      type: 'assessment/fetch',
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

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

  render() {
    const {
      user: { data },
      task,
      plan,
      assessment,
      dispatch,
      match,
    } = this.props;
    const { modalVisible, fileList, previewVisible, previewImage } = this.state;
    let scheduleTime = '';

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

    function editData(data) {
      if (scheduleTime !== '') {
        data.executeTime = scheduleTime._d;
        dispatch({
          type: 'task/add',
          payload: {
            fields: data,
          },
        });
      }
    }

    function dateChange(data) {
      const time = data;
      scheduleTime = time;
    }

    function confirm(data) {
      Modal.confirm({
        iconType: 'bars',
        title: 'タスク詳細情報',
        okText: '保存',
        cancelText: 'キャンセル',
        maskClosable: 'false',
        onOk() {
          editData(data);
        },
        content: (
          <div>
            <Card title="" style={{ marginBottom: 24 }} bordered={false}>
              <FormItem label="タスク予定時間">
                {
                  <DatePicker
                    onChange={dateChange}
                    defaultValue={moment(data.executeTime, 'YYYY/MM/DD')}
                    format={'YYYY/MM/DD'}
                  />
                }
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
      });
    }

    function getListData(value) {
      const list = task.data.list;
      const id = match.params.id;
      let data;
      list.map(item => {
        const executeTime = moment(item.executeTime).format('YYYY-MM-DD');
        const valueTime = moment(value._d).format('YYYY-MM-DD');
        if (executeTime === valueTime && item.task_user._id === id) {
          data = item;
        }
      });
      return data;
    }

    function dateCellRender(value) {
      const list = getListData(value);
      if (typeof list === 'undefined') {
        return <div />;
      } else {
        return (
          <ul className="events">
            <a onClick={() => confirm(list)}>
              <li>予定時間:{moment(list.executeTime).format('YYYY-MM-DD')}</li>
              <li>利用者氏名：{list.task_user.name}</li>
              <li>管理者：{list.task_admin.adminName}</li>
            </a>
          </ul>
        );
      }
    }

    return (
      <PageHeaderLayout title="利用者詳細情報">
        <Card style={{ marginBottom: 24 }} title="利用者情報" bordered={false}>
          { data.list && (
            <DescriptionList
              size="large"
              title=""
              style={{ marginBottom: 32 }}
            >
              <Description term="利用者氏名">{data.list[0].name}</Description>
              <Description term="ふりがな">{data.list[0].phonetic}</Description>
              <Description term="生年月日">
                {moment(data.list[0].birth).format('YYYY-MM-DD')}
              </Description>
              <Description term="性別">{data.list[0].sex}</Description>
              <Description term="電話番号">{data.list[0].telephoneNumber}</Description>
              <Description term="住所">{data.list[0].address}</Description>
            </DescriptionList>
          )}
        </Card>
        <Card bodyStyle={{ padding: 0 }} bordered={false} title="">
          <Tabs>
            {/*スケジュール*/}
            <TabPane tab="スケジュール" key="assessment">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Button type="primary" icon="plus" onClick={() => this.handleModalVisible(true)}>
                  新規
                </Button>
                <br />
                <br />
                <Calendar dateCellRender={dateCellRender} />
              </Card>
            </TabPane>
            {/*計画書*/}
            <TabPane tab="ファイル一覧" key="plan">
              <Card title="" style={{ marginBottom: 24 }} bordered={false}>
                <Row>
                <Col  sm={12} xs={24} style={{ marginBottom: 24 }} >
                <Card title="計画書" style={{ marginBottom: 24 }} bordered={false}>
                  <Link to="/form/advanced-form">
                    <Button type="primary" icon="plus">
                      新規
                    </Button>
                  </Link>
                  <br />
                  <br />
                  <Steps direction="vertical">
                    {plan.data.list.map(item => (
                      <Step
                        title={moment(item.createDate).format('YYYY-MM-DD')}
                        description={item.planAuthor}
                        icon={
                          <Link to={'/profile/plan-show/' + item._id}>
                            <Icon type="edit" />
                          </Link>
                        }
                      />
                    ))}
                  </Steps>
                  </Card>
                </Col>
                <Col  sm={12} xs={24} style={{ marginBottom: 24 }} >
                <Card title="アセスメント" style={{ marginBottom: 24 }} bordered={false}>
                  <Link to="/dashboard/assessment">
                    <Button type="primary" icon="plus">
                      新規
                    </Button>
                  </Link>
                  <br />
                  <br />                
                  <Steps direction="vertical">
                    {assessment.data.list.map(item => (
                      <Step
                        title={moment(item.total_Short).format('YYYY-MM-DD')}
                        description={item.joint_arm}
                        icon={
                          <Link to={'/profile/plan-show/' + item._id}>
                            <Icon type="edit" />
                          </Link>
                        }
                      />
                    ))}
                  </Steps>
                  </Card>
                </Col>
                </Row>
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
