import React, { Component, Fragment, CustomForm } from 'react';
import { connect } from 'dva';
import { Row, Card, Calendar } from 'antd';

import styles from './Analysis.less';

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
    const { loading } = this.props;

    const eventList = [
      {
        id: 12,
        startTime: '2018-04-4',
        endTime: '2018-04-15',
        displayName: '（主）小鹿',
        userId: 1,
      },
    ];

    return (
      <Fragment>
        <Row>
          <Card
            loading={loading}
            className={styles.salesCard}
            bordered={false}
            title="看護師のスケジュール"
          >
            <Calendar
              monthStr="2018-04"
              eventList={eventList}
              eventForm={(event, closePopover) => {
                return (
                  <CustomForm
                    event={event}
                    closePopover={closePopover}
                    onChangeTime={this.onChangeTime}
                    deleteEvent={this.deleteEvent}
                  />
                );
              }}
              onChangeTime={this.onChangeTime}
              deleteEvent={this.deleteEvent}
              createNewEvent={this.createNewEvent}
            />
          </Card>
        </Row>
      </Fragment>
    );
  }
}
