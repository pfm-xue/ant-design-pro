import React, { PureComponent, Fragment } from 'react';
import moment from 'moment';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { Row, Col, Card, Icon, Avatar, Tabs, Button, Table, Divider, Form, Input, Dropdown, Menu, Select, DatePicker } from 'antd';
const { TabPane } = Tabs;
const { Search } = Input;
const FormItem = Form.Item;
import styles from './PlanDictionary.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

@connect(({ template, loading }) => ({
  template,
  loading: loading.models.template,
}))
@Form.create()
export default class PlanDictionary extends PureComponent {

  state = {

  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'template/fetch',
    });    
  }

  renderSimpleForm() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form onSubmit={this.handleSearch} layout="inline">
        <Row gutter={{ md: 8, lg: 24, xl: 48 }}>
          <Col md={8} sm={24}>
            <FormItem label="プロジェクト">
              {getFieldDecorator('no')(<Input placeholder="请输入" />)}
            </FormItem>
          </Col>
          <Col md={8} sm={24}>
            <span className={styles.submitButtons}>
              <Button type="primary" htmlType="submit">
                検索
              </Button>
              <Divider type="vertical" />
              <Button type="primary" style={{ marginLeft: 8 }} onClick={this.handleFormReset}>
                <Link to="/dictionary/plan-add-data">
                  <Icon type="plus-circle-o" />新規
                </Link>
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

  toggle = (record) => {
    const time = moment(new Date()).format('YYYY-MM-DD HH:mm');
    record.arrivalTime = time;
    this.props.dispatch({
      type: 'task/add',
      payload: {
        fields: record,
      },
    });
    location.reload();
  }

  render() {
    const { template, loading  } = this.props;
    // const { modalVisible1, modalVisible } = this.state;

    const columns = [
      {
        title: 'プロジェクト',
        dataIndex: 'project',
        key: 'project',
        // render: (text) => (
        //   <Fragment>
        //     {!text ? "未実施" : "実施" }
        //   </Fragment>
        // ),
      },
      {
        title: 'データ',
        dataIndex: 'projectData',
        key: 'projectData',
        // render: (text) => (
        //   <Fragment>
        //     {!text ? "未実施" : "実施" }
        //   </Fragment>
        // ),      
      },
      {
        title: '操作',
        render: (record) => (
          <Fragment>
            <Link to={"/dictionary/plan-edit-data/" + record._id}>
              <Button size="small" type="primary">編集</Button>
            </Link>              
          </Fragment>
        ),
      }];

    return (
      <PageHeaderLayout>
        <Row gutter={24}>
          <Col>
            <Card title="検索" >
            {/*Search*/}
              <div className={styles.tableListForm}>{this.renderForm()}</div>
            </Card>
            <Card style={{ marginTop: 16 }} title="データ一覧" >
            {/*アセスメント*/}
              <Table
                dataSource={template.data.list}
                columns={columns}
              />
            </Card>            
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}