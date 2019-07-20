import React, { Component } from 'react';
import { Row, Col, DatePicker, Select, Input, Button, Modal, Form } from 'antd';
import 'antd/dist/antd';
import TextArea from 'antd/lib/input/TextArea';
import { getIncomeCategory, getSource } from '../../Utils/firebaseDatabase';
import Axios from 'axios';
import moment from 'moment';

const Option = Select.Option;
const { confirm } = Modal;

class EditIncome extends Component {
    constructor() {
        super();
        this.state = {
            index: null,
            selectedCategory: "รายได้",
            selectedSource: "Credit",
            date: "",
            incomeCategory: [],
            description: "",
            amount: "",
            total: "",
            source: [],
            isDelete: "false",
            isLoading: false
        }
    }

    onSubmit = (e) => {
        // e.preventDefault();
        this.props.form.validateFieldsAndScroll((err, value) => {
            if (!err) {
                const url = 'http://localhost:3001/api/income/incomeUpdate';
                const data = {
                    id: this.state.index,
                    date: this.state.date,
                    selectedCategory: this.state.selectedCategory,
                    description: this.state.description,
                    amount: this.state.amount,
                    total: this.state.total,
                    selectedSource: this.state.selectedSource,
                    isDelete: this.state.isDelete
                }
                console.log(data);
                Axios.post(url, data, {
                    mode: "no-cors"
                })
                    .then(({ data }) => console.log(data))
                this.success();
            }
        })
        this.setState({ isLoading: true });
    }

    componentWillMount() {
        const urlString = window.location.href;
        const page_url = new URL(urlString);
        const id = page_url.searchParams.get("id");
        console.log(id)
        let dataIncome = [];
        getIncomeCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataIncome.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ incomeCategory: dataIncome })
        })

        let dataSource = [];
        getSource().then(res => {
            res.forEach(e => {
                console.log(e)
                dataSource.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ source: dataSource })
        })

        const form = this.props.form;
        const url = `http://localhost:3001/api/income/income/`+id;
        Axios.get(url, {
            mode: "no-cors"
        }).then(res => {
            console.log(res)
            this.setState({
                index: id,
                date: res.data.date,
                selectedCategory: res.data.selectedCategory,
                description: res.data.description,
                amount: res.data.amount,
                total: res.data.total,
                selectedSource: res.data.selectedSource
            });
            form.setFieldsValue({
                date: moment(res.data.date),
                selectedCategory: res.data.selectedCategory,
                description: res.data.description,
                amount: res.data.amount,
                total: res.data.total,
                selectedSource: res.data.selectedSource
            })
        })
    }

    onDate = (value, dateString) => {
        console.log(dateString);
        this.setState({
            date: dateString
        })
    }

    onDelete = () => {
        const url = `http://localhost:3001/api/income/incomeUpdate/`;
        const data = {
            id: this.state.index,
            date: this.state.date,
            selectedCategory: this.state.selectedCategory,
            description: this.state.description,
            amount: this.state.amount,
            total: this.state.total,
            selectedSource: this.state.selectedSource,
            isDelete: "true"
        }
        Axios.post(url, data, {
            mode: 'no-cors'
        }).then(({ data }) => console.log(data))
        window.location.assign('/report')
        
    }

    showConfirm = () => {
        confirm({
            title: 'Delete',
            content: "Do you want to delete ?",
            onOk: this.onDelete
        })
    }

    success = () => {
        Modal.success({
            title: 'Success',
            content: 'update already!',
            onOk: this.change
        });
    }

    change = () => {
        window.location.assign('/reportIncome');
    }


    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div>
                <Row style={{ textAlign: 'center'}}>
                    <h1>Edit Income</h1>
                </Row>
                <Row>
                    <Col xl={{ span: 15, offset: 4 }} lg={{ span: 16, offset: 4 }} md={{ span: 20, offset: 2 }} sm={24}><hr></hr></Col>
                </Row>
                <Form onSubmit={this.onSubmit}>
                    <Row style={{ marginTop: "2%"}}>
                        <Row>
                            <Col xl={{ span: 2, offset: 4 }} lg={{ span: 3, offset: 4 }} md={{ span: 3, offset: 2}} sm={5}>
                                Month
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('date', {
                                            rules: [{
                                                required: true,
                                                message: 'Please select date'
                                            }]
                                        })(<DatePicker onChange={this.onDate} style={{ width: "100%" }} format="DD MMM YYYY" />)
                                    }
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 2, offset: 3 }} lg={{ span: 3, offset: 2 }} md={{ span: 3, offset: 4}} sm={{ span: 5, offset: 2}}>
                                Amount
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('amount', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your amount'
                                            }]
                                        })(<Input type="text" onChange={(e) => this.setState({ amount: e.target.value })}></Input>)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={{ span: 2, offset: 4 }} lg={{ span: 3, offset: 4 }} md={{ span:3, offset: 2 }} sm={5}>
                                Category
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Select style={{ width: "100%" }} onChange={(value) => { console.log(value); this.setState({ selectedCategory: value }) }} defaultValue="รายได้">
                                    {this.state.incomeCategory}
                                </Select>
                            </Col>
                            <Col xl={{ span: 2, offset: 3 }} lg={{ span: 3, offset: 2 }} md={{ span: 3, offset: 4 }} sm={{ span: 5, offset: 2 }}>
                                Total
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('total', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your total'
                                            }]
                                        })(<Input type="text" onChange={(e) => this.setState({ total: e.target.value })}></Input>)
                                    }
                                </Form.Item>
                            </Col>
                        </Row>
                        <Row>
                            <Col xl={{ span: 2, offset: 4 }} lg={{ span: 3, offset: 4 }}  md={{ span:3, offset: 2 }} sm={5}>
                                Description
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Form.Item>
                                    {
                                        getFieldDecorator('description', {
                                            rules: [{
                                                required: true,
                                                message: 'Please input your description'
                                            }]
                                        })(<TextArea col={3} onChange={(e) => this.setState({ description: e.target.value })}></TextArea>)
                                    }
                                </Form.Item>
                            </Col>
                            <Col xl={{ span: 2, offset: 3 }} lg={{ span: 3, offset: 2 }} md={{ span: 3, offset: 4 }} sm={{ span: 5, offset: 2 }}>
                                Source
                            </Col>
                            <Col xl={4} lg={4} md={5} sm={6}>
                                <Select style={{ width: "100%" }} onChange={(value) => { console.log(value); this.setState({ selectedSource: value }) }} defaultValue="credit">
                                    {this.state.source}
                                </Select>
                            </Col>
                        </Row>
                        <Row style={{ textAlign: "center", marginTop: "3%" }}>
                            <Button type="primary" loading={this.state.isLoading} onClick={() => this.onSubmit()}>Save</Button>
                            <Button type="danger" style={{ marginLeft: "1%" }} onClick={() => this.showConfirm()}>Delete</Button>
                            <a style={{ margin: "1%"}} onClick={() => window.location.assign('/reportIncome')}>Back</a>
                        </Row>
                    </Row>
                </Form>
            </div>
        )
    }
}

const WrappedEditIncomeForm = Form.create({ name: 'EditIncome' })(EditIncome);
export default WrappedEditIncomeForm;
