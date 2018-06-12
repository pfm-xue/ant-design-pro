import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, List, Avatar, Tabs, Button, Table, Divider,
         Form, Input, Modal, Checkbox, Select, TimePicker, Dropdown,
         Menu, Switch, DatePicker } from 'antd';
const { TabPane } = Tabs;
const FormItem = Form.Item;
const { Search, TextArea } = Input;
import styles from './Workplace.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const CreateForm1 = Form.create()(props => {
  const { modalVisible1, form, handleAdd, handleModalVisible1 } = props;

  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  
  return (
    <Modal
      title="実施記録基本情報"
      visible={modalVisible1}
      onOk={okHandle}
      onCancel={() => handleModalVisible1()}
    >    
            
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実施者">
        {form.getFieldDecorator('user', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="実施者" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="開始実施">
        {form.getFieldDecorator('startTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(
          <TimePicker
            placeholder='実施時間(Start)'
            style={{ width: '100%' }}
          />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="実施終了">
        {form.getFieldDecorator('endTime', {
          rules: [{ required: true, message: '入力してください。' }],
        })(
          <TimePicker
            placeholder='実施時間(End)'
            style={{ width: '100%' }}
          />)}
      </FormItem>                         
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="プログラム">
        {form.getFieldDecorator('program', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="プログラム" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="特記事項">
        {form.getFieldDecorator('program'
      )(<TextArea placeholder="特記事項" />)}
      </FormItem>      
    </Modal>
  );
});

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
      title="バイタル情報"
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


      {/* <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="体温">
        {form.getFieldDecorator('vital.vital1', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input addonAfter="℃" placeholder="体温" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="血圧">
        {form.getFieldDecorator('vital.vital2', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="血圧" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="脈帕">
        {form.getFieldDecorator('vital.vital3', {
          rules: [{ required: true, message: '入力してください。' }],
        })(<Input placeholder="脈帕" />)}
    </FormItem>                         
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="SpO2">
        {form.getFieldDecorator('vital.spO2', {
          rules: [{ required: true, message: '入力してください' }],
        })(<Input placeholder="SpO2" />)}
      </FormItem> */}
    </Modal>
  );
});

@connect(({ task, loading }) => ({
  // project,
  // activities,
  // chart,
  task,
  loading: loading.models.task,
  // activitiesLoading: loading.effects['activities/fetchList'],
}))
@Form.create()
export default class Workplace extends PureComponent {

  state = {
    modalVisible1: false,
    modalVisible: false,
    date: '',
    data: [{
      key: '1',
      date: '2018-06-06',
      name: '鈴木',
      record: 　'実施',
      Vital1: '36.8℃',
      Vital2: '126/66',
      Vital3: '68',
      time: '2018-05-29 13:00',
      vitality: '実施',
      Visits: 　'実施',
    },{
      key: '2',
      date: '2018-06-07',
      name: '佐々木',
      record: 　'未実施',
      Vital1: '',
      Vital2: '',
      Vital3: '',
      vitality: '未実施',
      Visits: 　'未実施',
    },{
      key: '3',
      date: '2018-06-07',
      name: '下口 敏輝',
      record: 　'未実施',
      Vital1: '',
      Vital2: '',
      Vital3: '',
      vitality: '未実施',
      Visits: 　'未実施',
    },{
      key: '4',
      date: '2018-06-08',
      name: '鈴木 直哉',
      record: 　'未実施',
      Vital1: '',
      Vital2: '',
      Vital3: '',
      vitality: '未実施',
      Visits: 　'未実施',
    },{
      key: '5',
      date: '2018-06-08',
      name: ' 岡崎 宏典',
      record: 　'未実施',
      Vital1: '',
      Vital2: '',
      Vital3: '',
      vitality: '未実施',
      Visits: 　'未実施',
    }],
  };

  handleModalVisible1 = flag => {
    this.setState({
      modalVisible1: !!flag,
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  componentDidMount() {
    const { dispatch } = this.props;
    // dispatch({
    //   type: 'project/fetchNotice',
    // });
    // dispatch({
    //   type: 'activities/fetchList',
    // });
    // dispatch({
    //   type: 'chart/fetch',
    // });
    // dispatch({
    //   type: 'task/fetch',
    // });    
  }

  handleAdd = fields => {
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

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
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

  toggle = (record) => {
    const number = record.key;
    const newData = this.state.data;
    const index = newData.findIndex(item => number === item.key);
    const item = newData[index];
    item.time = moment(new Date()).format('YYYY-MM-DD HH:mm');
    this.setState({
      data : newData,
    });
  }

  save(form, key) {
    form.validateFields((error, row) => {
      if (error) {
        return;
      }
      const newData = [...this.state.data];
      const index = newData.findIndex(item => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        this.setState({ data: newData, editingKey: '' });
      } else {
        newData.push(data);
        this.setState({ data: newData, editingKey: '' });
      }
    });
  }

  render() {
    const {
      task: { date },
      // projectLoading,
      // activitiesLoading,
      // chart: { radarData },
    } = this.props;

    const { modalVisible1, modalVisible } = this.state;

    const pageHeaderContent = (
      <div className={styles.pageHeaderContent}>
        <div className={styles.avatar}>
          <Avatar
            size="large"
            src="https://gw.alipayobjects.com/zos/rmsportal/BiazfanxmamNRoxxVxka.png"
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
        <Menu.Item key="new"><Link to="/dashboard/assessment" >初回</Link></Menu.Item>
        <Menu.Item key="update"><Link to="/dashboard/assessment" >更新</Link></Menu.Item>
      </Menu>
    );

    const columns = [{
      title: '利用',
      render: () => (
          <Checkbox></Checkbox>
      ),
    },
    {
      title: '到着時間',
      dataIndex: 'time',
      key: 'time',
      filters: [{
        text: '未到着',
        value: '未到着',
      },{
        text: '到着',
        value: '到着',
      }],
      onFilter: (value, record) => record.vitality.indexOf(value) === 0,         
      render: (text, record) => (
        <Fragment>
          {!text ? <Button type="primary" size="small" onClick={() => this.toggle(record)}>未到着</Button> : text }
        </Fragment>
      ),
    },    
    {
      title: '利用者氏名',
      dataIndex: 'name',
      key: 'name',
      render: text => <Link to="/profile/basic">{text}</Link>,
    },
    {
      title: '実施記録',
      dataIndex: 'record',
      key: 'record',
      render: (text, record) => (
        <Fragment>
          {!text ? <Button type="primary" size="small" onClick={() => this.toggle(record)}>未到着</Button> : text }
        </Fragment>
      ),      
      render: text => <a onClick={() => this.handleModalVisible1(true)}>{text}</a>,
    },
    {
      title: 'バイタル',
      children: [{
        title: '体温',
        dataIndex: 'Vital1',
        key: 'Vital1',
      },{
        title: '血圧',
        dataIndex: 'Vital2',
        key: 'Vital2',
      },{
        title: '脈帕',
        dataIndex: 'Vital3',
        key: 'Vital3',
      },{
        title: '操作',
        render: text => <a onClick={() => this.handleModalVisible(true)}><Button size="small" icon="edit" ></Button></a>,
      }],
    },
    {
      title: '体力測定',
      dataIndex: 'vitality',
      key: 'vitality',
      filters: [{
        text: '未実施',
        value: '未実施',
      }, {
        text: '実施',
        value: '実施',
      }],
      onFilter: (value, record) => record.vitality.indexOf(value) === 0,    
    },
    {
      title: '居宅訪問',
      dataIndex: 'Visits',
      key: 'Visits',
    },
    {
      title: '操作',
      render: () => (
        <Fragment>
          <Dropdown overlay={menu} placement="bottomRight">
            <Button　type="primary">アセスメント</Button>
          </Dropdown>
        </Fragment>
      ),
    }];

    const parentMethods1 = {
      handleModalVisible1: this.handleModalVisible1,
    };

    const parentMethods = {
      handleModalVisible: this.handleModalVisible,
    };

    return (
      <PageHeaderLayout content={pageHeaderContent} extraContent={extraContent}>
        <Row gutter={24}>
          <Col>
            <Card>
              <Tabs tabBarExtraContent={salesExtra} >
              {/*アセスメント*/}
              <TabPane tab="アセスメント" key="assessment">
                <div>
                    <Button type="primary" >時間(予定)</Button>
                    <Divider type="vertical" />
                    <DatePicker
                      defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                      onChange={this.dayDate}
                      dateRender={(current) => {
                        const style = {};
                        if (current.date() === 1) {
                          style.border = '1px solid #1890ff';
                          style.borderRadius = '50%';
                        }
                        return (
                          <div className="ant-calendar-date" style={style}>
                            {current.date()}
                          </div>
                        );
                      }}
                    />
                  {/* <Divider type="vertical" />
                  <Button type="primary" >全員</Button> */}
                  <Table dataSource={this.state.data} columns={columns} />
                </div>
              </TabPane>
              {/*計画書*/}
              <TabPane tab="計画書" key="plan">
                <div>
                  <Button type="primary" >時間(予定)</Button>
                    <Divider type="vertical" />
                    <DatePicker
                      defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                      onChange={this.dayDate}
                      dateRender={(current) => {
                        const style = {};
                        if (current.date() === 1) {
                          style.border = '1px solid #1890ff';
                          style.borderRadius = '50%';
                        }
                        return (
                          <div className="ant-calendar-date" style={style}>
                            {current.date()}
                          </div>
                        );
                      }}
                    />
                  {/* <Divider type="vertical" />
                  <Button type="primary" >全員</Button> */}
                  <Table dataSource={this.state.data} columns={columns} />
                </div>
              </TabPane>
              {/*実施記録*/}
              <TabPane tab="実施記録" key="record">
                <div>
                  <Button type="primary" >時間(予定)</Button>
                    <Divider type="vertical" />
                    <DatePicker
                      defaultValue={moment(new Date(), 'YYYY-MM-DD')}
                      onChange={this.dayDate}
                      dateRender={(current) => {
                        const style = {};
                        if (current.date() === 1) {
                          style.border = '1px solid #1890ff';
                          style.borderRadius = '50%';
                        }
                        return (
                          <div className="ant-calendar-date" style={style}>
                            {current.date()}
                          </div>
                        );
                      }}
                    />
                  {/* <Divider type="vertical" />
                  <Button type="primary" >全員</Button> */}
                  <Table dataSource={this.state.data} columns={columns} />
                </div>
              </TabPane>
              </Tabs>
            </Card>
          </Col>
        </Row>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
      </PageHeaderLayout>
    );
  }
}
