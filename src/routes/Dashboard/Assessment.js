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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
                {getFieldDecorator('title', {
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
            <FooterToolbar {...submitFormLayout} style={{ marginTop: 32 }}>
              <Button type="primary" htmlType="submit" loading={submitting}>
                提交
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
