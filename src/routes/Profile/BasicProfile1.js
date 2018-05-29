import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Tabs, Button, Calendar, Steps, Icon, Form, Modal, Input, TimePicker, message, Popconfirm, Row, Col } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';
import StandardTable from 'components/StandardTable';
const { Description } = DescriptionList;
import { Link } from 'dva/router';
const FormItem = Form.Item;

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {

  state = {
    modalVisible1: false,
  };

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    const parameter = "";

    return (
      <PageHeaderLayout title="個別機能訓綶計画詳細情報">
        <Card style={{ marginBottom: 24 }} title="操作" bordered={false} >
        <Link to="/form/advanced-form"><Button type="primary" icon="edit" >編集</Button></Link>
        <Divider type="vertical" />
        <Button type="danger" icon="delete" >
            削除
        </Button>
        <Divider type="vertical" />
        <Button type="primary" icon="printer" >
            プレビュー
        </Button>
        </Card>
        <Row>
          <Col>
            <Card style={{ marginBottom: 24 }} title="個人情報" bordered={false} >
              <Row>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <p><b>作成日:</b>{parameter}</p>
                <p><b>前回作成日:</b>{parameter}</p>
                <p><b>計画作成者:</b>{parameter}</p>
                <p><b>ふりがな:</b>{parameter}</p>
                <p><b>性別:</b>{parameter}</p>
                <p><b>生年月日:</b>{parameter}</p>
                <p><b>介護認定:</b>{parameter}</p>
                <p><b>管理者:</b>{parameter}</p>
                <p><b>看護:</b>{parameter}</p>
                <p><b>介護:</b>{parameter}</p>
                <p><b>機能訓練:</b>{parameter}</p>
                </Col>
                <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <p><b>相談員:</b>{parameter}</p>
                <p><b>氏名:</b>{parameter}</p>
                <p><b>本人の希望:</b>{parameter}</p>
                <p><b>家族の希望:</b>{parameter}</p>
                <p><b>前回作成日:</b>{parameter}</p>
                <p><b>計画作成者:</b>{parameter}</p>
                <p><b>障害老人の日常生活自立度:</b>{parameter}</p>
                <p><b>認知症老人の日常生活自立度:</b>{parameter}</p>
                <p><b>運同時のリスク(血圧、不整脈、呼吸等):</b>{parameter}</p>
                <p><b>生活課題:</b>{parameter}</p>
                <p><b>在宅環境(生活課題に関連する在宅環境課題):</b>{parameter}</p>
                </Col>
              </Row>
            </Card>
          </Col>
        </Row>
        <Row>
          <Col>
            <Row>
              <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <Card style={{ marginBottom: 24 }} title="個別機能訓練加算Ⅰ" bordered={false} >
                  <p><b>長期目標:</b>{parameter}</p>
                  <p><b>前回作成日:</b>{parameter}</p>
                  <p><b>目標逹成度:</b>{parameter}</p>
                  <p><b>短期目標:</b>{parameter}</p>
                  <p><b>目標逹成度:</b>{parameter}</p>
                  <p><b>①プログラム内容:</b>{parameter}</p>
                  <p><b>留意点:</b>{parameter}</p>
                  <p><b>頻度:</b>{parameter}</p>
                  <p><b>時間:</b>{parameter}</p>
                  <p><b>主な実施者:</b>{parameter}</p>
                  <p className={styles.right} ><b>プログラム立案者:</b>{parameter}</p>
                </Card>
              </Col>
              <Col sm={12} xs={24} style={{ marginBottom: 24 }}>
                <Card style={{ marginBottom: 24 }} title="個別機能訓綶計画書Ⅱ" bordered={false} >
                  <p><b>長期目標:</b>{parameter}</p>
                  <p><b>前回作成日:</b>{parameter}</p>
                  <p><b>目標逹成度:</b>{parameter}</p>
                  <p><b>短期目標:</b>{parameter}</p>
                  <p><b>目標逹成度:</b>{parameter}</p>
                  <p><b>①プログラム内容:</b>{parameter}</p>
                  <p><b>留意点:</b>{parameter}</p>
                  <p><b>頻度:</b>{parameter}</p>
                  <p><b>時間:</b>{parameter}</p>
                  <p><b>主な実施者:</b>{parameter}</p>
                  <p className={styles.right} ><b>プログラム立案者:</b>{parameter}</p>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </PageHeaderLayout>
    );
  }
}
