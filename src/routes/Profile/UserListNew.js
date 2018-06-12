import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Select, Card, Badge, Table, Divider, Tabs, Button, Calendar, Steps, Icon, Form, Modal, Input, TimePicker, message, Popconfirm, Upload, DatePicker } from 'antd';
import StandardTable from 'components/StandardTable';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
const { Description } = DescriptionList;
const { TabPane } = Tabs;
const { Step } = Steps;

import { Link } from 'dva/router';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
      title="管理者登録"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者ID">
        {form.getFieldDecorator('adminId', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="名前">
        {form.getFieldDecorator('adminName', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="Email">
        {form.getFieldDecorator('email', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>      
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="電話番号">
        {form.getFieldDecorator('telephoneNumber', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="role">
        {form.getFieldDecorator('role', {
          rules: [{ required: true, message: 'Please input some description...' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="介護士">介護士</Option>
            <Option value="施設内システム管理者1">施設内システム管理者</Option>
            <Option value="看護師">看護師</Option>
            <Option value="相談員">相談員</Option>
          </Select>
        )}
      </FormItem>
    </Modal>
  );
});

@connect(({ task, loading }) => ({
  task,
  loading: loading.models.role,
}))
@Form.create()
export default class UserListNew extends PureComponent {
  state = {
    modalVisible1: false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
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
  }

  // handleStandardTableChange = (pagination, filtersArg, sorter) => {
  //   const { dispatch } = this.props;
  //   const { formValues } = this.state;

  //   const filters = Object.keys(filtersArg).reduce((obj, key) => {
  //     const newObj = { ...obj };
  //     newObj[key] = getValue(filtersArg[key]);
  //     return newObj;
  //   }, {});

  //   const params = {
  //     currentPage: pagination.current,
  //     pageSize: pagination.pageSize,
  //     ...formValues,
  //     ...filters,
  //   };
  //   if (sorter.field) {
  //     params.sorter = `${sorter.field}_${sorter.order}`;
  //   }

  //   dispatch({
  //     type: 'role/fetch',
  //     payload: params,
  //   });
  // };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'task/fetch',
      payload: {},
    });
  };

  // toggleForm = () => {
  //   this.setState({
  //     expandForm: !this.state.expandForm,
  //   });
  // };

  // handleMenuClick = e => {
  //   const { dispatch } = this.props;
  //   const { selectedRows } = this.state;

  //   if (!selectedRows) return;

  //   switch (e.key) {
  //     case 'remove':
  //       dispatch({
  //         type: 'role/remove',
  //         payload: {
  //           no: selectedRows.map(row => row.no).join(','),
  //         },
  //         callback: () => {
  //           this.setState({
  //             selectedRows: [],
  //           });
  //         },
  //       });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  // handleSelectRows = rows => {
  //   this.setState({
  //     selectedRows: rows,
  //   });
  // };

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
        type: 'task/fetch',
        payload: values,
      });
    });
  };

  handleModalVisible = flag => {
    this.setState({
      modalVisible: !!flag,
    });
  };

  handleModalVisible1 = flag => {
    this.setState({
      modalVisible1: !!flag,
    });
  };

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

  handleCancel = () => this.setState({ previewVisible: false })

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  }

  // renderSimpleForm() {
  //   const { getFieldDecorator } = this.props.form;
  //   return (
  //     <Form onSubmit={this.handleSearch} layout="inline">
  //       <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
  //         <Col md={8} sm={24}>
  //           <FormItem label="管理者ID">
  //             {getFieldDecorator('no')(<Input placeholder="请输入" />)}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <FormItem label="role">
  //             {getFieldDecorator('role')(
  //               <Select placeholder="请选择" style={{ width: '100%' }}>
  //                 <Option value="介護士">介護士</Option>
  //                 <Option value="施設内システム管理者">施設内システム管理者</Option>
  //                 <Option value="看護師">看護師</Option>
  //                 <Option value="相談員">相談員</Option>
  //               </Select>
  //             )}
  //           </FormItem>
  //         </Col>
  //         <Col md={8} sm={24}>
  //           <span className={styles.submitButtons}>
  //             <Button type="primary" htmlType="submit">
  //               查询
  //             </Button>
  //             <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
  //               重置
  //             </Button>
  //           </span>
  //         </Col>
  //       </Row>
  //     </Form>
  //   );
  // }

  // renderForm() {
  //   return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  // }

  handleChange = ({ fileList }) => this.setState({ fileList })

  render() {
    const { task: { data }, loading } = this.props;

    const { selectedRows, modalVisible, fileList, previewVisible, previewImage } = this.state;

    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    const columns = [
      // {
      //   title: '管理者ID',
      //   dataIndex: 'adminId',
      // },
      {
        title: '名前',
        dataIndex: 'adminName',
      },
      {
        title: 'role',
        dataIndex: 'role',
      },
      {
        title: '電話番号',
        dataIndex: 'telephoneNumber',
      },
      {
        title: 'Email',
        dataIndex: 'email',
      },      
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleModalVisible1(true)}>
              編集
            </Button>
            <Divider type="vertical" />
            <Link to="/role/physician-show">
              <Button>详细 </Button>
            </Link>            
          </Fragment>
        ),
      },
    ];

    const parentMethods = {
      handleAdd: this.handleAdd,
      handleModalVisible: this.handleModalVisible,
    };

    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          {/* <a onClick={() => confirm(listData)} > */}
          {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content}>
                </Badge>
              </li>
            ))}
          {/* </a> */}
        </ul>
      );
    }

    function getListData(value) {
      let listData;
      switch (value.date()) {
        case 8:
          listData = [
            { type: 'warning', content: '屋外歩行訓練', adminName:'下口', userAdmin:'鈴木' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
          ]; break;
        case 10:
          listData = [
            { type: 'warning', content: '屋外歩行訓練' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
            { type: 'error', content: '下肢筋力訓練' },
          ]; break;
        case 15:
          listData = [
            { type: 'warning', content: '屋外歩行訓練' },
            { type: 'success', content: '浴槽を跨ぐ練習' },
          ]; break;
        default:
      }
      return listData || [];
    }

    return (
      <PageHeaderLayout title="管理者一覧">
        <Card style={{ marginBottom: 24 }} title="使用者情報" bordered={false} >
          <DescriptionList size="large" title="" style={{ marginBottom: 32 }}>
            <Description term="利用者氏名">曲丽丽</Description>
            <Description term="生年月日">1987-09-20</Description>
            <Description term="性別">女</Description>
            <Description term="電話番号">1234567893215</Description>
            <Description term="住所">东京都江戸川区江戸川（1～3丁目、4丁目1～14番）</Description>
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
