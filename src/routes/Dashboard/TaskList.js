import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import {
  Card,
  List,
  Avatar,
  Tabs,
  Button,
  Table,
  Divider,
  Form,
  Input,
  Modal,
  Dropdown,
  Menu,
  DatePicker,
} from 'antd';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Search } = Input;
import styles from './TaskList.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.task,
}))
@Form.create()
export default class TaskList extends PureComponent {
  state = {
    modalVisible1: false,
    modalVisible: false,
    data: '',
  };

  handleModalVisible1 = record => {
    this.setState({
      modalVisible1: true,
      data: record,
    });
  };

  handleModalVisible = record => {
    this.setState({
      modalVisible: true,
      data: record,
    });
  };

  handleCancel = () => {
    this.setState({
      modalVisible: false,
      modalVisible1: false,
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/fetch',
    });
  }

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

  handleEdit = fields => {
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields,
      },
    });

    this.setState({
      modalVisible: false,
      modalVisible1: false,
    });
    location.reload();
  };

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'task/clear',
    });
  }

  renderActivities() {
    const { activities: { list } } = this.props;
    return list.map(item => {
      const events = item.template.split(/@\{([^{}]*)\}/gi).map(key => {
        if (item[key]) {
          return (
            <a href={item[key].link} key={item[key].name}>
              {item[key].name}
            </a>
          );
        }
        return key;
      });
      return (
        <List.Item key={item.id}>
          <List.Item.Meta
            avatar={<Avatar src={item.user.avatar} />}
            title={
              <span>
                <a className={styles.username}>{item.user.name}</a>
                &nbsp;
                <span className={styles.event}>{events}</span>
              </span>
            }
            description={
              <span className={styles.datetime} title={item.updatedAt}>
                {moment(item.updatedAt).fromNow()}
              </span>
            }
          />
        </List.Item>
      );
    });
  }

  toggle = record => {
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm');
    record.arrivalTime = time;
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields: record,
      },
    });
    location.reload();
  };

  render() {
    const { task } = this.props;
    const { modalVisible1, modalVisible, data } = this.state;

    const CreateForm1 = Form.create()(props => {
      const { modalVisible1, form } = props;

      const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          this.handleEdit(fieldsValue);
        });
      };

      return (
        data && (
          <Modal
            title="実施記録基本情報"
            visible={modalVisible1}
            onOk={okHandle}
            onCancel={() => this.handleCancel()}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
              {form.getFieldDecorator('_id', {
                initialValue: data._id,
                rules: [{ required: true, message: '入力してください。' }],
              })(<Input type="hidden" disabled />)}
            </FormItem>
            {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実施者">
            {form.getFieldDecorator('recording.implement_admin', {
              initialValue:data.task_admin._id,
              rules: [{ required: true, message: '入力してください。' }],
            })(<Input disabled placeholder="実施者" />)}
          </FormItem> */}
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="開始実施">
              {form.getFieldDecorator('recording.startTime', {})(
                <DatePicker
                  initialValue={moment(data.recording.startTime, 'YYYY-MM-DD HH:mm:ss')}
                  placeholder="実施時間(Start)"
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実施終了">
              {form.getFieldDecorator('recording.endTime', {})(
                <DatePicker
                  defaultValue={moment(data.recording.endTime, 'YYYY-MM-DD HH:mm:ss')}
                  placeholder="実施時間(End)"
                  format="YYYY-MM-DD HH:mm:ss"
                  showTime
                  style={{ width: '100%' }}
                />
              )}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="プログラム">
              {form.getFieldDecorator('recording.program', {
                initialValue: data.recording.program,
              })(<Input placeholder="プログラム" />)}
            </FormItem>
            {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="特記事項">
            {form.getFieldDecorator('program'
          )(<TextArea placeholder="特記事項" />)}
          </FormItem>       */}
          </Modal>
        )
      );
    });

    const CreateForm = Form.create()(props => {
      const { modalVisible, form } = props;

      const okHandle = () => {
        form.validateFields((err, fieldsValue) => {
          if (err) return;
          form.resetFields();
          this.handleEdit(fieldsValue);
        });
      };

      return (
        data && (
          <Modal
            title="バイタル情報"
            visible={modalVisible}
            onOk={okHandle}
            onCancel={() => this.handleCancel()}
          >
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }}>
              {form.getFieldDecorator('_id', {
                initialValue: data._id,
                rules: [{ required: true, message: '入力してください。' }],
              })(<Input type="hidden" disabled />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="体温">
              {form.getFieldDecorator('vital.vital1', {
                initialValue: data.vital.vital1,
              })(<Input addonAfter="℃" placeholder="体温" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="血圧">
              {form.getFieldDecorator('vital.vital2', {
                initialValue: data.vital.vital2,
              })(<Input placeholder="血圧" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="脈帕">
              {form.getFieldDecorator('vital.vital3', {
                initialValue: data.vital.vital3,
              })(<Input placeholder="脈帕" />)}
            </FormItem>
            <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="SpO2">
              {form.getFieldDecorator('vital.spO2', {
                initialValue: data.vital.spO2,
              })(<Input placeholder="SpO2" />)}
            </FormItem>
          </Modal>
        )
      );
    });

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/gaOngJwsRYRaVAuXXcmB.png"
          />
        </div>
        <div className={styles.content}>
          <div className={styles.contentTitle} />
          <div className={styles.contentTitle}>おはよう, 看護師 ！</div>
        </div>
      </div>
    );

    const extraContent = (
      <div className={styles.extraContent}>
        <div className={styles.statItem}>
          <p>利用者人数</p>
          <p>188</p>
        </div>
        <div className={styles.statItem}>
          <p>社員人数</p>
          <p>20</p>
        </div>
        <div className={styles.statItem}>
          <p>計画書総数</p>
          <p>123</p>
        </div>
      </div>
    );

    const salesExtra = (
      <div className={styles.salesExtraWrap}>
        <Search className={styles.extraContentSearch} placeholder="Search" onSearch={() => ({})} />
      </div>
    );

    const menu = (
      <Menu>
        <Menu.Item key="new">
          <Link to="/dashboard/assessment">初回</Link>
        </Menu.Item>
        {/* <Menu.Item key="update">
          <Link to="/dashboard/assessment">更新</Link>
        </Menu.Item> */}
      </Menu>
    );

    const columns = [
      {
        title: '到着時間',
        dataIndex: 'arrivalTime',
        render: (text, record) => (
          <Fragment>
            {!text ? (
              <Button type="primary" size="small" onClick={() => this.toggle(record)}>
                未到着
              </Button>
            ) : (
              moment(text).format('YYYY-MM-DD HH:mm')
            )}
          </Fragment>
        ),
      },
      {
        title: '利用者氏名',
        dataIndex: 'task_user.name',
        render: (text, record) => (
          <Fragment>
            <Link to={'/patient/show-patient/' + record.task_user._id}>{text}</Link>
          </Fragment>
        ),
      },
      {
        title: '実施記録',
        dataIndex: 'recording',
        render: (text, record) => (
          <Fragment>
            <a onClick={() => this.handleModalVisible1(record)}>実施記録</a>
          </Fragment>
        ),
      },
      {
        title: 'バイタル',
        children: [
          {
            title: '体温',
            dataIndex: 'vital.vital1',
          },
          {
            title: '血圧',
            dataIndex: 'vital.vital2',
          },
          {
            title: '脈帕',
            dataIndex: 'vital.vital3',
          },
          {
            title: '操作',
            render: record => (
              <Fragment>
                <a onClick={() => this.handleModalVisible(record)}>
                  <Button size="small" icon="edit" />
                </a>
              </Fragment>
            ),
          },
        ],
      },
      {
        title: '体力測定',
        dataIndex: 'determine',
        render: text => <Fragment>{!text ? '未実施' : '実施'}</Fragment>,
      },
      {
        title: '居宅訪問',
        dataIndex: 'Visits',
        render: text => <Fragment>{!text ? '未実施' : '実施'}</Fragment>,
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <Dropdown overlay={menu} placement="bottomRight">
              <Button type="primary">アセスメント</Button>
            </Dropdown>
          </Fragment>
        ),
      },
    ];

    const parentMethods1 = {
      handleAdd: this.handleAdd,
      handleModalVisible1: this.handleModalVisible1,
    };

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    function dataSource(value) {
      let taskList = [];
      let list = task.data.list;
      if (value !== '' && typeof value !== 'undefined') {
        list.map((item,i) => {
          item.key = i;
          const executeTime = moment(item.executeTime).format('YYYY-MM-DD');
          const valueTime = moment(value._d).format('YYYY-MM-DD');
          if (executeTime === valueTime) {
            taskList.push(item);
          }
        });
      } else {
        list.map((item,i) => {
            item.key = i;
            taskList.push(item);
        });
      }
      return taskList;
    }

    function dateChange(value) {
      const time = value;
      dataSource(time);
    }

    return (
      <PageHeaderLayout
          content={pageHeaderContent}
          extraContent={extraContent}
         >
        <Card>
          <Tabs tabBarExtraContent={salesExtra}>
            {/*アセスメント*/}
            <TabPane tab="アセスメント" key="assessment">
              <Button type="primary">時間(予定)</Button>
              <Divider type="vertical" />
              <DatePicker
                defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                onChange={dateChange}
              />
              <Table
                // 紧凑型
                size="middle"
                dataSource={dataSource()}
                columns={columns}
                pagination={{ pageSize: 10 }}
              />
            </TabPane>
            {/*計画書*/}
            <TabPane tab="計画書" key="plan">
              <Button type="primary">時間(予定)</Button>
              <Divider type="vertical" />
              <DatePicker
                defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                onChange={this.dayDate}
              />
              <Table
                // 紧凑型
                size="middle"
                dataSource={dataSource()}
                columns={columns}
                pagination={{ pageSize: 5 }}
              />
            </TabPane>
            {/*実施記録*/}
            <TabPane tab="実施記録" key="record">
              <Button type="primary">時間(予定)</Button>
              <Divider type="vertical" />
              <DatePicker
                defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                onChange={this.dayDate}
              />
              <Table
                // 紧凑型
                size="middle"              
                dataSource={dataSource()}
                columns={columns}
                pagination={{ pageSize: 5 }}
                // 边框
                // bordered
              />
            </TabPane>            
          </Tabs>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
      </PageHeaderLayout>
    );
  }
}
