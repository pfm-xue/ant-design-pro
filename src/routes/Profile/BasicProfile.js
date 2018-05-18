import React, { Component, Fragment } from 'react';
import { connect } from 'dva';
import { Card, Badge, Table, Divider, Button } from 'antd';
import DescriptionList from 'components/DescriptionList';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './BasicProfile.less';

import StandardTable from 'components/StandardTable';

import { Link } from 'dva/router';

const { Description } = DescriptionList;

const progressColumns = [
  {
    title: 'アップロード時間',
    dataIndex: 'time',
    key: 'time',
  },
  {
    title: 'アップロード者',
    dataIndex: 'rate',
    key: 'rate',
  },
  {
    title: '注釈',
    dataIndex: 'operator',
    key: 'operator',
  },
  {
    title: '操作',
    render: () => (
      <Fragment>
        <Button type="primary">
          <Link to="/form/basic-form">編集</Link>
        </Button>
        <Divider type="vertical" />
        <Link to="/profile/basic" className={styles.logo} key="logo">
          <Button>详细 </Button>
        </Link>
      </Fragment>
    ),
  },
];

@connect(({ profile, loading }) => ({
  profile,
  loading: loading.effects['profile/fetchBasic'],
}))
export default class BasicProfile extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'profile/fetchBasic',
    });
  }

  render() {
    const { profile, loading } = this.props;
    const { basicGoods, basicProgress } = profile;
    let goodsData = [];
    if (basicGoods.length) {
      let num = 0;
      let amount = 0;
      basicGoods.forEach(item => {
        num += Number(item.num);
        amount += Number(item.amount);
      });
      goodsData = basicGoods.concat({
        num,
        amount,
      });
    }
    const renderContent = (value, row, index) => {
      const obj = {
        children: value,
        props: {},
      };
      if (index === basicGoods.length) {
        obj.props.colSpan = 0;
      }
      return obj;
    };
    const goodsColumns = [
      {
        title: '作成日',
        dataIndex: 'id',
        key: 'id',
      },
      {
        title: '計画作成者',
        dataIndex: 'name',
        key: 'name',
      },
      {
        title: '注釈',
        dataIndex: 'barcode',
        key: 'barcode',
      },
      {
        title: '操作',
        render: () => (
          <Fragment>
            <Button type="primary">
              <Link to="/form/advanced-form">編集</Link>
            </Button>
            <Divider type="vertical" />
            <Link to="/dashboard/monitor" className={styles.logo} key="logo">
              <Button>详细 </Button>
            </Link>
          </Fragment>
        ),
      },
    ];

    return (
      <PageHeaderLayout title="ユーザー詳細情報">
        <Card bordered={false}>
          <DescriptionList size="large" title="ユーザー情報" style={{ marginBottom: 32 }}>
            <Description term="利用者氏名">曲丽丽</Description>
            <Description term="生年月日">1987-09-20</Description>
            <Description term="性別">女</Description>
            <Description term="電話番号">1234567893215</Description>
            <Description term="住所">东京都江戸川区江戸川（1～3丁目、4丁目1～14番）</Description>
          </DescriptionList>
          <Divider style={{ marginBottom: 32 }} />
          <div className={styles.title}>計画書一覧</div>
          <div className="main">
            <Link to="/form/advanced-form" className={styles.logo} key="logo">
              <Button type="primary">新規計画書</Button>
            </Link>
          </div>   
          <Table
            style={{ marginBottom: 24 }}
            pagination={false}
            loading={loading}
            dataSource={goodsData}
            columns={goodsColumns}
            rowKey="id"
          />
          <div className={styles.title}>画像一覧</div>
          <Link to="/form/basic-form" className={styles.logo} key="logo">
            <Button type="primary">画像のアップロード</Button>
          </Link>
          <Table
            style={{ marginBottom: 16 }}
            pagination={false}
            loading={loading}
            dataSource={basicProgress}
            columns={progressColumns}
          />
        </Card>
        {/* <CreateForm2 {...parentMethods2} ImageUpload={ImageUpload} /> */}
      </PageHeaderLayout>
    );
  }
}
