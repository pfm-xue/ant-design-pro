import React, { PureComponent } from 'react';
import { connect } from 'dva';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Slider,
  Row,
  Col,
} from 'antd';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import styles from './style.less';

import FooterToolbar from 'components/FooterToolbar';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

import { Link } from 'dva/router';

@connect(({ loading }) => ({
  submitting: loading.effects['form/submitRegularForm'],
}))
@Form.create()
export default class BasicForms extends PureComponent {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.props.dispatch({
          type: 'form/submitRegularForm',
          payload: values,
        });
      }
    });
  };
  render() {
    const { submitting } = this.props;
    const { getFieldDecorator, getFieldValue } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
        md: { span: 10 },
      },
    };

    const submitFormLayout = {
      wrapperCol: {
        xs: { span: 24, offset: 0 },
        sm: { span: 10, offset: 7 },
      },
    };

    return (
      <PageHeaderLayout title="アセスメント" content="">
        <Form onSubmit={this.handleSubmit} hideRequiredMark style={{ marginTop: 8 }}>
          <Card style={{ marginBottom: 24 }}
                title="関節可動域"
                bordered={false}
              >
              <FormItem {...formItemLayout} label="上肢">
                {getFieldDecorator('joint_arm', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="下肢">
                {getFieldDecorator('joint_legs', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="体幹">
                {getFieldDecorator('joint_runk', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }}
                title="筋力"
                bordered={false}
              >
              <FormItem {...formItemLayout} label="上肢">
                {getFieldDecorator('tendon_arm', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="下肢">
                {getFieldDecorator('tendon_legs', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="体幹">
                {getFieldDecorator('tendon_runk', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">著名な制限なし</Radio>
                  <Radio value="2">軽度</Radio>
                  <Radio value="3">中等度</Radio>
                  <Radio value="4">重度</Radio>
                </Radio.Group>
              )}
              </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }}
                title="麻痺"
                bordered={false}
              >
              <FormItem {...formItemLayout} label="上肢">
                {getFieldDecorator('paralysis_arm', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">実用</Radio>
                  <Radio value="2">補助</Radio>
                  <Radio value="3">廃用</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="下肢">
                {getFieldDecorator('paralysis_legs', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">かなり動かせる</Radio>
                  <Radio value="2">半分程度</Radio>
                  <Radio value="3">僅かに動かせる</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="手指">
                {getFieldDecorator('paralysis_finger', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">かなり動かせる</Radio>
                  <Radio value="2">半分程度</Radio>
                  <Radio value="3">僅かに動かせる</Radio>
                </Radio.Group>
              )}
              </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }}
                title="ADL Barthel Index"
                bordered={false}
              >
          <FormItem {...formItemLayout} label="食事">
                {getFieldDecorator('meal', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="車椅子〜ベッドへの移乗">
                {getFieldDecorator('move', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">15点</Radio>
                  <Radio value="2">10点</Radio>
                  <Radio value="3">5点</Radio>
                  <Radio value="4">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="整容">
                {getFieldDecorator('aesthetic', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">5点</Radio>
                  <Radio value="2">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="トイレ動作">
                {getFieldDecorator('toilet', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="入浴">
                {getFieldDecorator('bath', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">5点</Radio>
                  <Radio value="2">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="歩行">
                {getFieldDecorator('title', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">15点</Radio>
                  <Radio value="2">10点</Radio>
                  <Radio value="3">5点</Radio>
                  <Radio value="4">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="階段昇降">
                {getFieldDecorator('stairs', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="着替え">
                {getFieldDecorator('change', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="排便コントロール">
                {getFieldDecorator('defecation', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">10点</Radio>
                  <Radio value="2">5点</Radio>
                  <Radio value="3">0点</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="合計点">
                {getFieldDecorator('total', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                  <Slider defaultValue={0}/>
              )}
              </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }}
                title="家庭でのIADL"
                bordered={false}
              >
              <FormItem {...formItemLayout} label="買い物">
                {getFieldDecorator('shopping', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="調理">
                {getFieldDecorator('cook', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="掃除">
                {getFieldDecorator('cleaning', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
              </FormItem>
              <FormItem {...formItemLayout} label="洗濯">
                {getFieldDecorator('washing', {
                  rules: [
                    {
                      required: true,
                      message: '選択入力してください',
                    },
                  ],
                })(
                <Radio.Group>
                  <Radio value="1">できる</Radio>
                  <Radio value="2">介助でできる</Radio>
                  <Radio value="3">できない</Radio>
                </Radio.Group>
              )}
              </FormItem>
          </Card>
          <Card style={{ marginBottom: 24 }}
                title="Short Physical Performance Battery"
                bordered={false}
              >                
          </Card>          
            <FooterToolbar {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                <Link to="/dashboard/workplace">
                  提交
                </Link>
              </Button>
              <Link to="/profile/basic">
                <Button style={{ marginLeft: 8 }}>キャンセル</Button>
              </Link>
            </FooterToolbar>
        </Form>
      </PageHeaderLayout>
    );
  }
}
