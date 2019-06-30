import React, { Component } from "react";
import { Row, Form, Input, Button } from 'antd';
import { forgotPassword } from './../Utils/firebaseAuthen';
import "./forgotPassword.css";
import "antd/dist/antd.css";

class ForgotPassword extends Component {
    constructor(){
        super();
        this.state = {
            email: '',
            isLoading: false
        }
    }

    onSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, values) => {
            if(!err) {
                forgotPassword(this.state.email);
                this.setState({isLoading: true});
                // window.location.assign("/");
            }
        })
    }

    render(){
        console.log()
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form className="box" onSubmit={this.handleSubmit}>
                    <Row style={{ marginBottom: "5%"}}><h1>Reset your password</h1></Row>
                    <Form.Item>
                        {
                            getFieldDecorator('email', {
                                rules: [{
                                    type: 'email',
                                    message: 'Please input a valid E-mail!'
                                },
                                {
                                    required: true,
                                    message: 'Please input your Email!'
                                },],
                            })(<Input style={{ marginTop: '0px' }} type="text" placeholder="Email" onChange={(e) => this.setState({ email: e.target.value })}/>)
                        }
                    </Form.Item>
                    <Row>
                        <Button loading={this.state.isLoading} htmlType="submit" type="ghost" value="Login" onClick={this.onSubmit} style={{ width: "30%"}}><span style={{color: 'white'}}>Reset</span></Button>
                    </Row>
                    <Row style={{ marginTop: '3%' }}>
                        <a onClick={() => window.location.assign('/')}>Back</a>
                    </Row>
                </Form>
            </div>
        );
    }

}
const WrappedForgotPasswordForm = Form.create({ name: "CreateForgotPassword" })(ForgotPassword);
export default WrappedForgotPasswordForm;
