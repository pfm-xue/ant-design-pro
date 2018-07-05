import React, { PureComponent } from 'react';
import { Card, Button, Form, Icon, Col, Row, Input, Mention,
         Select, Divider, Popover, Slider } from 'antd';
import { connect } from 'dva';
import FooterToolbar from 'components/FooterToolbar';
import PageHeaderLayout from '../../layouts/PageHeaderLayout';
import TableForm from './TableForm';
import styles from './PlanAdd.less';
import { Link } from 'dva/router';
const { toString, toContentState } = Mention;
const { Option } = Select;
const tableData = [];

const disorderList = {
  0: '正常',
  1: 'J1',
  2: 'J2',
  3: 'A1',
  4: 'A2',
  5: 'B1',
  6: 'B2',
  7: 'C1',
  8: 'C2',
};
const dementiaList = {
  0: '正常',
  1: 'Ⅰ',
  2: 'Ⅱa',
  3: 'Ⅱb',
  4: 'Ⅲa',
  5: 'Ⅲb',
  6: 'ⅣM',
};

@connect(({ plan, loading }) => ({
  plan,
  submitting: loading.effects['form/submitAdvancedForm'],  
}))
@Form.create()
export default class PlanAdd extends PureComponent {
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
            type: 'plan/add',
            payload: {
              planData: values,
            },            
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
    
    // function onChange(contentState) {
    //   const srting111 = contentState;
    //   console.log(toString(contentState));
    // }
    
    function onSelect(suggestion) {
      console.log('onSelect', suggestion);
    }      
    const { getFieldValue } = this.props.form;

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
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="計画作成者：" >
                  {form.getFieldDecorator('planAuthor', {
                    rules: [{ required: true, message: '計画作成者入力してください' }],
                  })(
                  // <Input placeholder="请输入"/>
                  <Mention
                    style={{ width: '100%' }}
                    // onChange={onChange}
                    suggestions={['afc163', 'benjycui', 'yiminghe', 'RaoHai', '中文', 'にほんご']}
                    onSelect={onSelect}
                  />                  
                  )}
                </Form.Item>                
              </Col>
            </Row>
            {/* <Row gutter={16}>
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
                    rules: [{ required: true, message: '性別入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="生年月日：">
                  {form.getFieldDecorator('birth', {
                    rules: [{ required: true, message: '生年月日入力してください' }],
                  })(<Input type="Date" placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row> */}
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護認定：">
                  {form.getFieldDecorator('certification', {
                    rules: [{ required: true, message: '介護認定入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="管理者：">
                  {form.getFieldDecorator('admin', {
                    rules: [{ required: true, message: '管理者入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="看護：">
                  {form.getFieldDecorator('nursing', {
                    rules: [{ required: true, message: '看護入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="介護：">
                  {form.getFieldDecorator('nursingCare', {
                    rules: [{ required: true, message: '介護入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="機能訓練：">
                  {form.getFieldDecorator('functionalTraining', {
                    rules: [{ required: true, message: '機能訓練入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="相談員：">
                  {form.getFieldDecorator('counselor', {
                    rules: [{ required: true, message: '相談員入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                {/* <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="氏名：">
                  {form.getFieldDecorator('name', {
                    rules: [{ required: true, message: '氏名入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item> */}
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="本人の希望：">
                  {form.getFieldDecorator('oneselfDesire', {
                    rules: [{ required: true, message: '本人の希望入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="家族の希望：">
                  {form.getFieldDecorator('familyDesire', {
                    rules: [{ required: true, message: '家族の希望入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="障害老人の日常生活自立度：">
                  {getFieldDecorator('disorder', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Slider marks={disorderList} max={8} step={null} defaultValue={0} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="認知症老人の日常生活自立度：">
                  {getFieldDecorator('dementia', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Slider marks={dementiaList} max={6} step={null} defaultValue={0} />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="病名、合併症(心疾患、吸器疾患等)：" >
                  {form.getFieldDecorator('diseaseName', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>                     
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="運動時のリスク(血圧、不整脈、呼吸等)：" >
                  {form.getFieldDecorator('exerciseRisk', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="生活課題：" >
                  {form.getFieldDecorator('lifeIssues', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>                    
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item wrapperCol={{ span: 20 }} label="在宅環境(生活課題に関連する在宅環境課題)：" >
                  {form.getFieldDecorator('homeEnvironment', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>
              </Col>
            </Row>
        </Card>
        <Card title="個別機能訓練加算Ⅰ" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                  {form.getFieldDecorator('additionalTraining.longTermGoals', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input type="Date" placeholder="長期目標" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                {/* <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item> */}
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('additionalTraining.longTermGoalsDegree', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="逹成">逹成</Option>
                      <Option value="一部">一部</Option>
                      <Option value="未逹">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                  {form.getFieldDecorator('additionalTraining.shortTermGoals', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input type="Date" placeholder="短期目標" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                {/* <Form.Item>
                  {getFieldDecorator('url2', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item> */}
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('additionalTraining.shortTermGoalsDegree', {
                    rules: [{ required: true, message: 'ふりがな入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="逹成">逹成</Option>
                      <Option value="一部">一部</Option>
                      <Option value="未逹">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Card title="プログラム" bordered={false}>
                  {getFieldDecorator('members', {
                    initialValue: tableData,
                  })(<TableForm />)}
              </Card>
            </Row> 
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                {/* <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('additionalTraining.enum', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item> */}
              </Col>
            </Row> 
        </Card>
        <Card title="個別機能訓練計画書Ⅱ" className={styles.card} bordered={false}>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="長期目標：">
                  {form.getFieldDecorator('planTow.longTermGoals', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input type="Date" placeholder="長期目標" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                {/* <Form.Item>
                  {form.getFieldDecorator('url2', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item> */}
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('planTow.longTermGoalsDegree', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="逹成">逹成</Option>
                      <Option value="一部">一部</Option>
                      <Option value="未逹">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="短期目標：">
                  {form.getFieldDecorator('planTow.shortTermGoals', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input type="Date" placeholder="短期目標" />)}
                </Form.Item>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
                {/* <Form.Item>
                  {form.getFieldDecorator('url2', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input />)}
                </Form.Item> */}
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                <Form.Item labelCol={{ span: 5 }} wrapperCol={{ span: 15 }} label="目標逹成度：">
                  {form.getFieldDecorator('planTow.shortTermGoalsDegree', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(
                    <Select placeholder="逹成度">
                      <Option value="逹成">逹成</Option>
                      <Option value="一部">一部</Option>
                      <Option value="未逹">未逹</Option>
                    </Select>
                  )}
                </Form.Item>
              </Col>
            </Row>
            <Row gutter={16}>
              <Card title="プログラム" bordered={false}>
                  {getFieldDecorator('members', {
                    initialValue: tableData,
                  })(<TableForm />)}
              </Card>
            </Row> 
            <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              </Col>
              <Col xl={{ span: 8, offset: 2 }} lg={{ span: 10 }} md={{ span: 24 }} sm={24}>
                {/* <Form.Item labelCol={{ span: 6 }} wrapperCol={{ span: 15 }} label="プログラム立案者：">
                  {form.getFieldDecorator('planTow.enum', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item> */}
              </Col>
            </Row>             
          </Card>
          <Card title="" className={styles.card} bordered={false}>
          <Row gutter={16}>
              <Col lg={6} md={12} sm={24}>
              <Form.Item wrapperCol={{ span: 20 }} label="特記事項" >
                  {form.getFieldDecorator('specialNotes', {
                    rules: [{ required: true, message: '入力してください' }],
                  })(<Input placeholder="请输入" />)}
                </Form.Item>                 
              </Col>
              <Col xl={{ span: 6, offset: 2 }} lg={{ span: 8 }} md={{ span: 12 }} sm={24}>
              </Col>
            </Row> 
          </Card>           
        </Form>
        <FooterToolbar style={{ width: this.state.width }}>
          {getErrorInfo()}
          <Button type="primary" onClick={validate} loading={submitting}>
            保存
          </Button>
          <Divider type="vertical" />
          <Link to="/patient/list-patient">
            <Button>キャンセル</Button>
          </Link>
        </FooterToolbar>
      </PageHeaderLayout>
    );
  }
}
