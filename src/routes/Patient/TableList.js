import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, message, Divider } from 'antd';
import { Link } from 'dva/router';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

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
        {form.getFieldDecorator('no', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
        {form.getFieldDecorator('role', {
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
        {form.getFieldDecorator('no', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別">
        {form.getFieldDecorator('role', {
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

// 利用者 图片上传
const CreateForm2 = Form.create()(props => {
  const { ImageUpload, form, handleAdd, handleImageUpload } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="画像のアップロード"
      visible={ImageUpload}
      onOk={okHandle}
      onCancel={() => handleImageUpload()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="利用者氏名">
        {form.getFieldDecorator('no', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="注釈">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="アップロード">
        {form.getFieldDecorator('role', {
          rules: [{ required: true, message: '性別を選択してください' }],
        })(<Input type="file" placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

// 利用者 计划作成
const CreateForm3 = Form.create()(props => {
  const { MakePlan, form, handleAdd, handleMakePlan } = props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleAdd(fieldsValue);
    });
  };
  return (
    <Modal
      title="個別機能訓練計画書"
      visible={MakePlan}
      onOk={okHandle}
      onCancel={() => handleMakePlan()}
    >
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作成日：">
        {form.getFieldDecorator('no', {
          rules: [{ required: true, message: '氏名入力してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="前回作成日：">
        {form.getFieldDecorator('description', {
          rules: [{ required: true, message: '生年月日を選択してください' }],
        })(<Input type="Date" placeholder="请输入" />)}
      </FormItem>
      <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="計画作成者：">
        {form.getFieldDecorator('role', {
          rules: [{ required: true, message: '性別を選択してください' }],
        })(<Input placeholder="请输入" />)}
      </FormItem>
    </Modal>
  );
});

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableList extends PureComponent {
  state = {
    MakePlan: false,
    ImageUpload: false,
    modalVisible1: false,
    modalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'rule/fetch',
    });
  }

  handleStandardTableChange = (pagination, filtersArg, sorter) => {
    const { dispatch } = this.props;
    const { formValues } = this.state;

    const filters = Object.keys(filtersArg).reduce((obj, key) => {
      const newObj = { ...obj };
      newObj[key] = getValue(filtersArg[key]);
      return newObj;
    }, {});

    const params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
      ...formValues,
      ...filters,
    };
    if (sorter.field) {
      params.sorter = `${sorter.field}_${sorter.order}`;
    }

    dispatch({
      type: 'rule/fetch',
      payload: params,
    });
  };

  handleFormReset = () => {
    const { form, dispatch } = this.props;
    form.resetFields();
    this.setState({
      formValues: {},
    });
    dispatch({
      type: 'rule/fetch',
      payload: {},
    });
  };

  toggleForm = () => {
    this.setState({
      expandForm: !this.state.expandForm,
    });
  };

  handleMenuClick = e => {
    const { dispatch } = this.props;
    const { selectedRows } = this.state;

    if (!selectedRows) return;

    switch (e.key) {
      case 'remove':
        dispatch({
          type: 'rule/remove',
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
        type: 'rule/fetch',
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

  handleImageUpload = flag => {
    this.setState({
      ImageUpload: !!flag,
    });
  };

  handleMakePlan = flag => {
    this.setState({
      MakePlan: !!flag,
    });
  };

  handleAdd = fields => {
    this.props.dispatch({
      type: 'rule/add',
      payload: {
        description: fields.desc,
        no: fields.no,
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
    const { rule: { data }, loading } = this.props;
    const { selectedRows, modalVisible, modalVisible1, ImageUpload, MakePlan } = this.state;

    const columns = [
      {
        title: '利用者氏名',
        dataIndex: 'owner',
      },
      {
        title: '生年月日',
        dataIndex: 'birthday',
      },
      {
        title: '性別',
        dataIndex: 'six',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <Button type="primary" onClick={() => this.handleModalVisible1(true)}>
              編集
            </Button>
            {/* <Divider type="vertical" />
            <Button type="primary" onClick={() => this.handleMakePlan(true)}>
              計画を立つ
            </Button>
            <Divider type="vertical" />
            <Button type="primary" onClick={() => this.handleImageUpload(true)}>
              画像のアップロード
            </Button> */}
            <Divider type="vertical" />
            <Link to="/profile/basic" className={styles.logo} key="logo">
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
    const parentMethods2 = {
      handleAdd: this.handleAdd,
      handleImageUpload: this.handleImageUpload,
    };
    const parentMethods3 = {
      handleAdd: this.handleAdd,
      handleMakePlan: this.handleMakePlan,
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
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
            />
          </div>
        </Card>
        <CreateForm {...parentMethods} modalVisible={modalVisible} />
        <CreateForm1 {...parentMethods1} modalVisible1={modalVisible1} />
        <CreateForm2 {...parentMethods2} ImageUpload={ImageUpload} />
        <CreateForm3 {...parentMethods3} MakePlan={MakePlan} />
      </PageHeaderLayout>
    );
  }
}
