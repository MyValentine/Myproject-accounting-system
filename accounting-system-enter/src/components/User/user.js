import React, { Component } from 'react';
import { Row, Col, Table, Drawer, Button, Input, Icon, Form, Modal } from 'antd';
import { handleSignUp } from '../../Utils/firebaseAuthen';
import { getAccount, deleteAccount } from '../../Utils/firebaseDatabase';
import 'antd/dist/antd';

const { confirm } = Modal;

const columns = [
    {
        // key="1",
        title: 'No.',
        dataIndex: "key",
        width: "10%"
    },
    ///////////////////////////////////////////////////////
    {
        title: 'User',
        dataIndex: 'email',
        width: '30%'
    },
    ////////////////////////////////////////////////////
    {
        title: "First Name",
        dataIndex: 'firstName'
    },
    ///////////////////////////////////////////////////
    {
        title: "Last Name",
        dataIndex: 'lastName'
    }
    /////////////////////////////////////////////////////
    // {
    //     title: "Delete",
    //     dataIndex: 'delete'
    // }
];


class User extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            number: 1,
            email: '',
            password: '',
            firstName: '',
            lastName: '',
            visible: '',
            userDeleteValue: []
        }
    }
    onSubmit = () => {
        this.props.form.validateFieldsAndScroll((err, value) => {
            if(!err){
                console.log('add complete')
                handleSignUp(
                    this.state.email,
                    this.state.password,
                    this.state.firstName,
                    this.state.lastName
                )
            }
        })
        // this.setState({ number: number+1 })
    }

    showDrawer = () => {
        this.setState({ visible: true })
    }

    onClose = () => {
        this.setState({ visible: false })
    }

    componentWillMount() {
        let dataUser = [];
        getAccount().then(res => {
            res.forEach(e => {
                console.log(e)
                // dataUser.push()
                dataUser.push(e)
            })
            this.setState({ data: dataUser })
        })
    }

    showConfirm = () => {
        confirm({
            title: 'Delete',
            content: "Do you want to delete this account ?",
            onOk: this.deleteAccount
        })
    }

    deleteAccount = (l) => {
        deleteAccount(l.email).then(res => {
            console.log('delete success');
        })
    }

    
    render() {
        const { getFieldDecorator } = this.props.form;
        let data = this.state.data;
        data.map((l,i) => {
            l.key = i+1;
            l.delete = <Button type="primary" onClick={() => {this.deleteAccount(l)}}>Delete</Button>
        })

        // const { getFeildDecorator } = this.props.form; 
        console.log(this.state.data)
        return (
            <div>
                <Form onSubmit={this.onSubmit}>

                </Form>
                <Row>
                    <Col span={4}>
                        <Button type="primary" onClick={this.showDrawer}>
                            <Icon type="plus" /> New account
                        </Button>
                    </Col>
                    <Drawer
                        title="Create a new account"
                        width={520}
                        onClose={this.onClose}
                        visible={this.state.visible}
                    >
                        <Row>
                            <Col span={12}>
                                Email
                            </Col>
                            <Col span={12}>
                                Password
                            </Col>
                        </Row>
                        <Row style={{marginTop: "1%"}}>
                            <Col span={12}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('email', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your email'
                                            }]
                                        })(<Input type="text" onChange={(e) => this.setState({ email: e.target.value }) } style={{width: "95%"}} placeholder="Email" prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('password', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your password'
                                            }]
                                        })(<Input type="password" onChange={(e) => this.setState({ password: e.target.value })} style={{width: "95%"}} placeholder="Password" prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} />)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                First Name
                            </Col>
                            <Col span={12}>
                                Last Name
                            </Col>
                        </Row>
                        <Row style={{marginTop: "1%"}}>
                            <Col span={12}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('firstname', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your firstname'
                                            }]
                                        })(<Input type="text" onChange={(e) => this.setState({ firstName: e.target.value }) } style={{width: "95%"}} placeholder="firstName" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('lastname', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your lastname'
                                            }]
                                        })(<Input type="text" onChange={(e) => this.setState({ lastName: e.target.value }) } style={{width: "95%"}} placeholder="lastName" />)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: 'center' }}>
                            <Button type="primary" onClick={this.onSubmit}>Save</Button>
                            <Button onClick={this.onClose} style={{ marginLeft: "1%" }}>Cancel</Button>
                        </Row>
                    </Drawer>
                </Row>
                <Row>
                    <Row style={{ marginTop: "2%" }}>
                        <Table columns={columns} dataSource={data} />
                    </Row>
                </Row>
            </div>
        )
    }
}

const WrappedUserForm = Form.create({ name: 'User' })(User);
export default WrappedUserForm;