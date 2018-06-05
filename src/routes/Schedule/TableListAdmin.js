import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import { Row, Col, Card, Form, Input, Select, Button, Modal, message, Divider, Calendar, Badge, DatePicker } from 'antd';
import moment from 'moment';
import { Link } from 'dva/router';
import styles from './TableList.less';
import StandardTable from 'components/StandardTable';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const FormItem = Form.Item;
const { Option } = Select;
const getValue = obj =>
  Object.keys(obj)
    .map(key => obj[key])
    .join(',');

@connect(({ rule, loading }) => ({
  rule,
  loading: loading.models.rule,
}))
@Form.create()
export default class TableListAdmin extends PureComponent {
  state = {
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
            <FormItem label="管理者のRole">
              {getFieldDecorator('role')(
                <Select placeholder="请选择" style={{ width: '100%' }}>
                  <Option value="0">介護士</Option>
                  <Option value="1">施設内システム管理者</Option>
                  <Option value="2">看護師</Option>
                  <Option value="3">相談員</Option>
                </Select>
              )}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <FormItem label="管理者の氏名">
              {getFieldDecorator('name')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                検索
              </Button>
              <Button style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                リセット
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
              <FormItem labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="タスク実施時間">
                {(<DatePicker defaultValue={moment(data.time, "YYYY/MM/DD")} format={"YYYY/MM/DD"}/>)}
              </FormItem>                         
              <div>
                <p>プログラム内容：</p>
                {data.map(item => (
                    <li>
                      <Badge status={item.type} text={item.content}>
                      </Badge>
                    </li>
                  ))}
              </div>
            </Card>  
          </div>
        ),
        onOk() {
        },
        onCancel() {
        },
      });
    }

    function dateCellRender(value) {
      const listData = getListData(value);
      return (
        <ul className="events">
          <a onClick={() => confirm(listData)} >
          {listData.map(item => (
              <li key={item.content}>
                <Badge status={item.type} text={item.content}>
                </Badge>
              </li>
            ))}
          </a>
        </ul>
      );
    }

    return (
      <PageHeaderLayout>
        <Card title="検索" >
            <div className={styles.tableListForm}>{this.renderForm()}</div>
        </Card>
        <Card title="スケジュール" >
          <Calendar
            dateCellRender={dateCellRender}
            // monthCellRender={monthCellRender}
          />
        </Card>
      </PageHeaderLayout>
    );
  }
}
