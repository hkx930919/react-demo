import React, { Component } from "react";
import Logo from "@components/logo";
import { Form, Icon, Input, Button, Checkbox, Row, Col } from "antd";
import "@style/login/login.css";
const FormItem = Form.Item;

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            if (!err) {
                console.log("Received values of form: ", values);
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div className="login">
                <div className="login_top">
                    <Logo />
                </div>
                <div className="login_bottom">
                    <Row gutter={20}>
                        <Col span={8} />
                        <Col span={8}  >
                            <Form
                                onSubmit={this.handleSubmit}
                                className="login-form"
                            >
                                <FormItem>
                                    {getFieldDecorator("userName", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your username!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="user"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            placeholder="Username"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator("password", {
                                        rules: [
                                            {
                                                required: true,
                                                message:
                                                    "Please input your Password!"
                                            }
                                        ]
                                    })(
                                        <Input
                                            prefix={
                                                <Icon
                                                    type="lock"
                                                    style={{
                                                        color: "rgba(0,0,0,.25)"
                                                    }}
                                                />
                                            }
                                            type="password"
                                            placeholder="Password"
                                        />
                                    )}
                                </FormItem>
                                <FormItem>
                                    {getFieldDecorator("remember", {
                                        valuePropName: "checked",
                                        initialValue: true
                                    })(<Checkbox>Remember me</Checkbox>)}
                                    <a className="login-form-forgot" href="">
                                        Forgot password
                                    </a>
                                    <Button
                                        type="primary"
                                        htmlType="submit"
                                        className="login-form-button"
                                    >
                                        Log in
                                    </Button>
                                    Or <a href="">register now!</a>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span={8} />
                    </Row>
                </div>
            </div>
        );
    }
}

const WrappedLogin = Form.create()(Login);

export default WrappedLogin;
