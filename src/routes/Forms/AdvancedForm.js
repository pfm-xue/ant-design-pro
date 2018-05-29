import React, { PureComponent } from 'react';
import {
  Card,
  Button,
  Form,
  Icon,
  Col,
  Row,
  DatePicker,
  TimePicker,
  Input,
  Select,
  Divider,
  Popover,
  Mention
} from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './style.less';
import { Link } from 'dva/router';
const { TextArea } = Input;

const { Option } = Select;
const { RangePicker } = DatePicker;
const { toString, toContentState } = Mention;

const fieldLabels = {
  name: '仓库名',
  url: '仓库域名',
  owner: '仓库管理员',
  approver: '审批人',
  dateRange: '生效日期',
  type: '仓库类型',
  name2: '任务名',
  url2: '任务描述',
  owner2: '执行人',
  approver2: '责任人',
  dateRange2: '生效日期',
  type2: '任务类型',
};

const tableData = [
  {
    key: '1',
    workId: '00001',
    name: 'John Brown',
    department: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    workId: '00002',
    name: 'Jim Green',
    department: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    workId: '00003',
    name: 'Joe Black',
    department: 'Sidney No. 1 Lake Park',
  },
];

class AdvancedForm extends PureComponent {
  state = {
    width: '100%',
  };
  componentDidMount() {
    window.addEventListener('resize', this.resizeFooterToolbar);
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeFooterToolbar);
  }
  resizeFooterToolbar = () => {
    const sider = document.querySelectorAll('.ant-layout-sider')[0];
    const width = `calc(100% - ${sider.style.width})`;
    if (this.state.width !== width) {
      this.setState({ width });
    }
  };
  render() {
    const { form, dispatch, submitting } = this.props;
    const { getFieldDecorator, validateFieldsAndScroll, getFieldsError } = form;
    const validate = () => {
      validateFieldsAndScroll((error, values) => {
        if (!error) {
          // submit the values
          dispatch({
            type: 'form/submitAdvancedForm',
            payload: values,
          });
        }
      });
    };
    const errors = getFieldsError();
    const getErrorInfo = () => {
      const errorCount = Object.keys(errors).filter(key => errors[key]).length;
      if (!errors || errorCount === 0) {
        return null;
      }
      const scrollToField = fieldKey => {
        const labelNode = document.querySelector(`label[for="${fieldKey}"]`);
        if (labelNode) {
          labelNode.scrollIntoView(true);
        }
      };
      const errorList = Object.keys(errors).map(key => {
        if (!errors[key]) {
          return null;
        }
        return (
          <li key={key} className={styles.errorListItem} onClick={() => scrollToField(key)}>
            <Icon type="cross-circle-o" className={styles.errorIcon} />
            <div className={styles.errorMessage}>{errors[key][0]}</div>
            <div className={styles.errorField}>{fieldLabels[key]}</div>
          </li>
        );
      });
      return (
        <span className={styles.errorIcon}>
          <Popover
            title="表单校验信息"
            content={errorList}
            overlayClassName={styles.errorPopover}
            trigger="click"
            getPopupContainer={trigger => trigger.parentNode}
          >
            <Icon type="exclamation-circle" />
          </Popover>
          {errorCount}
        </span>
      );
    };

    return (
      <PageHeaderLayout
        title="【個別機能訓練計画書】"
        content=""
        wrapperClassName={styles.advancedForm}
      >
        <Form layout="vertical" hideRequiredMark>
          <Card title="" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="作成日：">
                  {form.getFieldDecorator('createDate', {
                    rules: [{ required: true, message: '作成日入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="前回作成日：">
                  {form.getFieldDecorator('createLastTime', {
                    rules: [{ required: true, message: '前回作成日入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="計画作成者：">
                  {form.getFieldDecorator('planAuthor', {
                    rules: [{ required: true, message: '計画作成者入力してください' }],
                  })(
                  <Input placeholder="请输入" />
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="ふりがな：">
                  {form.getFieldDecorator('phonetic', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="性別：">
                  {form.getFieldDecorator('sex', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日：">
                  {form.getFieldDecorator('birth', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護認定：">
                  {form.getFieldDecorator('certification', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者：">
                  {form.getFieldDecorator('admin', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="看護：">
                  {form.getFieldDecorator('nursing', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護：">
                  {form.getFieldDecorator('nursingCare', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="機能訓練：">
                  {form.getFieldDecorator('functionalTraining', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="相談員：">
                  {form.getFieldDecorator('counselor', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="氏名：">
                  {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="本人の希望：">
                  {form.getFieldDecorator('oneselfDesire', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族の希望：">
                  {form.getFieldDecorator('familyDesire', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="障害老人の日常生活自立度：">
                  {getFieldDecorator('disorder', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="認知症老人の日常生活自立度：">
                  {getFieldDecorator('dementia', {
                    rules: [{ required: true, message: '请输入' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="病名、合併症(心疾患、吸器疾患等)：">
                  {form.getFieldDecorator('diseaseName', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="運動時のリスク(血圧、不整脈、呼吸等)：">
                  {form.getFieldDecorator('exerciseRisk', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="生活課題：">
                  {form.getFieldDecorator('lifeIssues', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item
                  wrapperCol={{ span: 20 }}
                  label="在宅環境(生活課題に関連する在宅環境課題)："
                >
                  {form.getFieldDecorator('homeEnvironment', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<TextArea style={{ minHeight: 32 }} placeholder="请输入" rows={4} />)}
                </Form.Item>
              </Col>
            </Row>
        </Card>
        <Card title="個別機能訓練加算Ⅰ" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                  {form.getFieldDecorator('longTermGoals', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('longTermGoalsDegree', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="xiao">逹成</Option>
                      <Option value="mao">一部</Option>
                      <Option value="mao">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                  {form.getFieldDecorator('shortTermGoals', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('shortTermGoalsDegree', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="xiao">逹成</Option>
                      <Option value="mao">一部</Option>
                      <Option value="mao">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={4} md={24} sm={24}>
                <Form.Item
                  labelCol={{ span: 20 }}
                  wrapperCol={{ span: 40 }}
                  label="①プログラム内容："
                >
                  {form.getFieldDecorator('programContent', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="留意点：">
                  {form.getFieldDecorator('attention', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="頻度：">
                  {form.getFieldDecorator('frequency', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="時間：">
                  {form.getFieldDecorator('time', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 40 }} label="主な実施者：">
                  {form.getFieldDecorator('personLiable', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
        </Card>
        <Card title="個別機能訓練計画書Ⅱ" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                  {form.getFieldDecorator('longTermGoals', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('longTermGoalsDegree', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="xiao">逹成</Option>
                      <Option value="mao">一部</Option>
                      <Option value="mao">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                  {form.getFieldDecorator('shortTermGoals', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '请选择' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('shortTermGoalsDegree', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="xiao">逹成</Option>
                      <Option value="mao">一部</Option>
                      <Option value="mao">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={4} md={24} sm={24}>
                <Form.Item
                  labelCol={{ span: 20 }}
                  wrapperCol={{ span: 40 }}
                  label="①プログラム内容："
                >
                  {form.getFieldDecorator('programContent', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="留意点：">
                  {form.getFieldDecorator('attention', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="頻度：">
                  {form.getFieldDecorator('frequency', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 40 }} label="時間：">
                  {form.getFieldDecorator('time', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 4 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 8 }} wrapperCol={{ span: 40 }} label="主な実施者：">
                  {form.getFieldDecorator('personLiable', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
          </Card>
        </Form>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            提交
          </Button>
          <Divider type="vertical" />
          <Link to="/profile/basic">
            <Button>キャンセル</Button>
          </Link>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}

export default connect(({ global, loading }) => ({
  collapsed: global.collapsed,
  submitting: loading.effects['form/submitAdvancedForm'],
}))(Form.create()(AdvancedForm));
