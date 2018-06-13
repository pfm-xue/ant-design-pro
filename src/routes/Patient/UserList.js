import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, message, Divider } from 'antd';
import { Link } from 'dva/router';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;


// 利用者 新建
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
      title="利用者登録"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="利用者氏名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ふりがな">
        {form.getFieldDecorator('phonetic', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>      
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
        {form.getFieldDecorator('birth', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: '性別を選択してください' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        )}
      </FormItem> 
    </Modal>
  );
});

// 利用者 编辑
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
      title="利用者情報変更"
      visible={modalVisible1}
      onOk={okHandle}
      onCancel={() => handleModalVisible1()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="利用者氏名">
        {form.getFieldDecorator('name', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ふりがな">
        {form.getFieldDecorator('phonetic', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>      
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
        {form.getFieldDecorator('birth', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
        {form.getFieldDecorator('sex', {
          rules: [{ required: true, message: '性別を選択してください' }],
        })(
          <Select placeholder="请选择" style={{ width: '100%' }}>
            <Option value="0">男</Option>
            <Option value="1">女</Option>
          </Select>
        )}
      </FormItem> 
    </Modal>
  );
});

@connect(({user, loading }) => ({
  user,
  loading: loading.models.user,
}))
@Form.create()
export default class UserList extends PureComponent {
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
      type: 'user/fetch',
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
  //     type: 'user/fetch',
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
      type: 'user/fetch',
      payload: {},
    });
  };

  // toggleForm = () => {
  //   this.setState({
  //     expandForm: !this.state.expandForm,
  //   });
  // };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'user/remove',
          payload: {
            no: selectedRows.map(row => row.no).join(','),
          },
          callback: () => {
            this.setState({
              selectedRows: [],
            });
          },
        });
        break;
      default:
        break;
    }
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

  handleModalVisible1 = flag => {
    this.setState({
      modalVisible1: !!flag,
    });
  };

  handleAdd = fields => {
    const { dispatch } = this.props;    
    dispatch({
      type: 'user/add',
      payload: {
        fields,
      },
    });

    message.success('添加成功');
    this.setState({
      modalVisible: false,
    });
  };

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="利用者氏名">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="性別">
              {getFieldDecorator('no')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">男</Option>
                  <Option value="1">女</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                重置
              </Button>
            </span>
          </Col>
        </Row>
      </Form>
    );
  }

  renderForm() {
    return this.state.expandForm ? this.renderAdvancedForm() : this.renderSimpleForm();
  }

  render() {
    const { user: { data }, loading } = this.props;
    const { modalVisible, modalVisible1 } = this.state;
    const columns = [
      {
        title: '利用者氏名',
        dataIndex: 'name',
      },
      {
        title: 'ふりがな',
        dataIndex: 'phonetic',
      },
      {
        title: '生年月日',
        dataIndex: 'birth',
      },
      {
        title: '性別',
        dataIndex: 'sex',
      },
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleModalVisible1(true)}>
              編集
            </Button>
            <Divider type="vertical" />
            <Link to={"/profile/basic/" + record._id} className={styles.logo} key="logo">
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
    const parentMethods1 = {
      handleAdd: this.handleAdd,
      handleModalVisible1: this.handleModalVisible1,
    };

    return (
      <PageHeaderLayout title="利用者一覧">
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListForm}>{this.renderForm()}</div>
            <div className={styles.tableListOperator}>
              <Button icon="plus" type="primary" onClick={() => this.handleModalVisible(true)}>
                新建
              </Button>
            </div>
            <StandardTable
              selectedRows=''
              loading={loading}
              data={data}
              columns={columns}
              // onSelectRow={this.handleSelectRows}
              // onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
      </PageHeaderLayout>
    );
  }
}
