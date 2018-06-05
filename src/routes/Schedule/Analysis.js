import React, { Component, Fragment, CustomForm } from 'react';
import { connect } from 'dva';
import { Row, Card, Calendar, Badge, Form, Col, Input, Select, Button, Menu, Dropdown } from 'antd';

const FormItem = Form.Item;
import styles from './Analysis.less';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';

const rankingListData = [];
for (let i = 0; i < 7; i += 1) {
  rankingListData.push({
    title: `工专路 ${i} 号店`,
    total: 323234,
  });
}

@connect(({ loading }) => ({
  loading: loading.effects['chart/fetch'],
}))
export default class Analysis extends Component {
  componentDidMount() {
    this.props.dispatch({
      type: 'chart/fetch',
    });
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'chart/clear',
    });
  }

  render() {

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
              <FormItem label="タスク実施時間">
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

    const roleList = (
      <Menu>
        <Menu.Item key="0" onClick={this.yesterday}>介護士</Menu.Item>
        <Menu.Item key="1" onClick={this.today}>施設内システム管理者</Menu.Item>
        <Menu.Item key="2" onClick={this.today}>看護師</Menu.Item>
        <Menu.Item key="3" onClick={this.tomorrow}>相談員</Menu.Item>
      </Menu>
    ); 

    return (
      <PageHeaderLayout>
        <Card className={styles.salesCard} bordered={false} title="スケジュール">
          <Row>
            <Dropdown overlay={roleList} placement="bottomRight">
                      <Button type="primary" >role</Button>
            </Dropdown>
          </Row>
          <Row>
              <Calendar
                dateCellRender={dateCellRender}
                // monthCellRender={monthCellRender}
              />
          </Row>
        </Card>
      </PageHeaderLayout>
    );
  }
}
