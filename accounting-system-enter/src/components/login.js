import React, { Component } from 'react';
import { Row, Form, Input, Button } from 'antd';
import { toggleSignIn, retrieveID } from "../Utils/firebaseAuthen" ;
import "./login.css";
import 'antd/dist/antd.css';

class Login extends Component {
    constructor(){
        super();
        this.state = {
            isLoading: false,
        }
    }
    handleSubmit = (event) => {
        console.log("handleSubmit")
        event.preventDefault();
        this.setState(prevState => ({
            isLoading: true,
        }));
        this.props.form.validateFieldsAndScroll((err, values) => {
            console.log(values)
            if (!err) {
                console.log('Received values of form: ', values);
                toggleSignIn(values.email, values.password)
                    .then(() => {
                        console.log(true)
                        if (true) {
                            retrieveID();
                        }
                        this.setState(prevState => ({
                            isLoading: false,
                        }));
                        // window.location.assign('/')
                    }).catch((reject_id) => {
                        if (reject_id === 2) {
                            // window.location = '../register';
                        }
                        this.setState(prevState => ({
                            isLoading: false
                        }));
                    })
            }
        });

    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Form className="box" onSubmit={this.handleSubmit}>
                    <Row style={{ marginBottom: "5%"}}><h1>Login</h1></Row>
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
                            })(<Input style={{ marginTop: '0px' }} type="text" name="" placeholder="Username" />)
                        }
                    </Form.Item>
                    <Form.Item>
                        {
                            getFieldDecorator('password', {
                                rules: [
                                {
                                    required: true,
                                    message: 'Please input your password!'
                                },],
                            })(<Input style={{ marginTop: '0px' }} type="password" name="" placeholder="Password" />)
                        }
                    </Form.Item>
                    <Row>
                        <Button htmlType="submit" type="ghost" name="" value="Login" style={{ width: "30%"}}><span style={{color: 'white' }}>Login</span></Button>
                    </Row>
                    <Row style={{ marginTop: '5%' }}>
                        <a onClick={() => window.location.assign('/forgotpassword')}>Forget Password</a>
                    </Row>
                </Form>
            </div>
        )
    }
}

const WrappedLoginForm = Form.create({ name: "CreateLogin" })(Login);
export default WrappedLoginForm;