import React from 'react'
import { Form, Col, Button, Row, message, Modal, Input } from 'antd';
import { hashHistory } from 'react-router'
import styled from "styled-components";
import { WrapperForm} from "./styled"
import { observer } from 'mobx-react'
const FormItem = Form.Item;

@observer
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalStatus: false
        };
        ["handleSubmit", "checkConfirm"].forEach(m => this[m] = this[m].bind(this));
    }
    handleSubmit(e) {
        let that = this;
        e.preventDefault();
        const form = this.props.form;
        form.validateFieldsAndScroll((err, values) => {
            if (!err) {
                webOSALoadLang({
                    url: 'login.login',
                    type: "post",
                    data: {
                        "username": values.userName,
                        "password": values.password
                    },
                    callback: (json) => {
                        if(json && json.errorId == 0){
                            message.success('Welcome to the OSA');
                            this.props.nextStep(values.userName, json.data);
                        }else if(json && json.errorId == 6002){
                            message.error("Incorrect password !");
                        }else if(json && json.errorId == 6001){
                            message.error("Incorrect username !");
                        }
                    }
                });
            }
        });
    }

    checkConfirm(rule, value, callback) {
        const form = this.props.form;
        let reg = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,30}$/;
        if (value && !reg.test(value)) {
            callback("密码规范长度8~30位字符，包括大小写、特殊字符")
        }
        callback();
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            wrapperCol: {
                xs: { span: 24, offset: 0 },
                sm: { span: 24, offset: 0 }
            }
        };
        return (
            <WrapperForm>
                <Row type="flex" justify="center">
                    <Col span={18}>
                        <Form className="login-form">
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator('userName', {
                                    rules: [{
                                        required: true, message: "This field is required !"
                                    }]
                                })(
                                    <Input style={{height: 40}} placeholder="Username" name="userName" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout}>
                                {getFieldDecorator('password', {
                                    rules: [{
                                        required: true, message: "This field is required !"
                                    }]
                                })(
                                    <Input style={{height: 40}} type="password" placeholder="Password" name="pwd" />
                                )}
                            </FormItem>
                            <FormItem {...formItemLayout}>
                                <Button style={{ width: '100%', fontSize: 16 }} type="primary" onClick={this.handleSubmit.bind(this)}>Login</Button>
                            </FormItem>
                        </Form>
                    </Col>
                </Row>
            </WrapperForm>
        )
    }
}
var WrapperLoginForm = Form.create()(LoginForm);
module.exports = WrapperLoginForm;