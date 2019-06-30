import React, { Component } from 'react';
import { Row, Col, Select, Input, Button, Collapse, Modal } from 'antd';
import { getExpenseCategory, addExpenseCategory, deleteExpenseCategory, getIncomeCategory, addIncomeCategory, deleteIncomeCategory, getSource, addSource, deleteSource } from '../../Utils/firebaseDatabase';
import 'antd/dist/antd';

const Option = Select.Option;
const Panel = Collapse.Panel;

class config extends Component {
    constructor() {
        super();
        this.state = {
            expenseCategory: [],
            expenseAddValue: "",
            expenseDeleteValue: [],
            incomeCategory: [],
            incomeAddValue: "",
            incomeDeleteValue: [],
            source: [],
            sourceAddValue: "",
            sourceDelete: []
        }
        this.onExpenseDeleteClick = this.onExpenseDeleteClick.bind(this);
        this.success = this.success.bind(this);
    }

    componentWillMount() {
        let dataExpense = [];
        getExpenseCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ expenseCategory: dataExpense })
        })

        let dataIncome = [];
        getIncomeCategory().then(res => {
            res.forEach(e => {
                // console.log(e)
                dataIncome.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ incomeCategory: dataIncome })
        })

        let dataSource = [];
        getSource().then(res => {
            res.forEach(e => {
                // console.log(e)
                dataSource.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ source: dataSource })
        })
    }

    success() {
        Modal.success({
            title: 'Add complete',
        });
    }

    deleteSuccess() {
        Modal.success({
            title: 'Delete complete',
        });
    }

    error(description) {
        Modal.error({
            title: 'Error!!',
            content: description,
        })
    }

    handleChange = event => {
        this.setState({ [event.target.id]: event.target.value });
    }

    refreshData = () => {
        let dataExpense = [];
        getExpenseCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ expenseCategory: dataExpense })
        })

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
    }

    /* ---------------------------- Function Expense -------------------------------*/

    onExpenseAdd = () => {
        // console.log(this.state.expenseAddValue);
        // e.preventDefault();
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         console.log(this.state.expenseAddValue)
        //         addExpenseCategory(this.state.expenseAddValue).then(res => {
        //             console.log("add complete!!")
        //             this.setState({ expenseAddValue: "" })
        //             this.refreshData();
        //             this.success();
        //         })
        //     }
        // })
        if (this.state.expenseAddValue === "" || this.state.expenseAddValue === null || this.state.expenseAddValue === undefined) {
            this.error('Please input a category name');
        } else {
            addExpenseCategory(this.state.expenseAddValue).then(res => {
                console.log("add complete!!")
                this.setState({ expenseAddValue: "" })
                this.refreshData();
                this.success();
            })
        }
    }

    onExpenseDeleteClick = () => {
        if (this.state.expenseDeleteValue.length > 0) {
            this.state.expenseDeleteValue.forEach(e => {
                deleteExpenseCategory(e).then(res => {
                    console.log("delete success");
                    this.setState({ expenseDeleteValue: [] });
                    this.refreshData();
                    this.deleteSuccess();
                })
            })
        } else {
            this.error('Please select atleast one category');
        }
    }

    /* ------------------------------- Function Income ------------------------------*/

    onIncomeAdd = () => {
        // console.log(this.state.incomeAddValue);
        // console.log(this.state.incomeCategory[0].value);
        // this.state.incomeCategory.forEach(e => {
        //     console.log(e)
        //     if (e.props.value === this.state.incomeAddValue) {
        //         console.log("duplicated");
        //         return;
        //     }
        //     console.log("test")
        // })
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         console.log(this.state.incomeAddValue)
        //         addIncomeCategory(this.state.incomeAddValue).then(res => {
        //             console.log("add complete!!")
        //             this.setState({ incomeAddValue: "" })
        //             this.refreshData();
        //             this.success();
        //         })
        //     }
        // })
        if (this.state.incomeAddValue === "" || this.state.incomeAddValue === null || this.state.incomeAddValue === undefined) {
            this.error('Please input a category name');
        } else {
            addIncomeCategory(this.state.incomeAddValue).then(res => {
                console.log("add complete!!")
                this.setState({ incomeAddValue: "" })
                this.refreshData();
                this.success();
            })
        }
    }

    onIncomeDeleteClick = () => {
        if (this.state.incomeDeleteValue.length > 0) {
            this.state.incomeDeleteValue.forEach(e => {
                deleteIncomeCategory(e).then(res => {
                    console.log("delete success");
                    this.setState({ incomeDeleteValue: [] });
                    this.refreshData();
                    this.deleteSuccess();
                })
            })
        } else {
            this.error('Please select atleast one category');
        }
    }

    /* ------------------------------------ Function Source --------------------------- */

    onSourceAdd = () => {
        // console.log(this.state.incomeAddValue);
        // console.log(this.state.incomeCategory[0].value);
        // this.state.source.forEach(e => {
        //     if (e.props.value === this.state.sourceAddValue) {
        //         console.log("duplicated");
        //         return;
        //     }
        // })
        // this.props.form.validateFieldsAndScroll((err, values) => {
        //     if (!err) {
        //         console.log(this.state.expenseAddValue)
        //         addSource(this.state.sourceAddValue).then(res => {
        //             console.log("add complete!!")
        //             this.setState({ sourceAddValue: "" })
        //             this.refreshData();
        //         })
        //     }
        // })

        if (this.state.sourceAddValue === "" || this.state.sourceAddValue === null || this.state.sourceAddValue === undefined) {
            this.error('Please input a source name');
        } else {
            addSource(this.state.sourceAddValue).then(res => {
                console.log("add complete!!")
                this.setState({ sourceAddValue: "" })
                this.refreshData();
                this.success();
            })
        }
    }

    onSourceDeleteClick = () => {
        if (this.state.sourceDeleteValue.length > 0) {
            this.state.sourceDeleteValue.forEach(e => {
                deleteSource(e).then(res => {
                    console.log("delete success");
                    this.setState({ sourceDeleteValue: [] });
                    this.refreshData();
                    this.deleteSuccess();
                })
            })
        } else {
            this.error('Please select atleast one category');
        }
    }


    render() {
        // console.log(this.state.expenseCategory)
        // const { getFieldDecorator } = this.props.form
        return (
            <div>
                {/* <Form> */}
                    <Collapse>
                        <Panel header="EXPENSE" key="1">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Add">
                                    <Row>
                                        <Col span={5}>
                                            <Input id="expenseAddValue" type="text" value={this.state.expenseAddValue} onChange={(e) => this.setState({ expenseAddValue: e.target.value })} style={{ width: "100%" }}></Input>
                                        </Col>
                                        <Col span={10}>
                                            <Button onClick={() => this.onExpenseAdd()} type="primary" style={{ marginLeft: "5%" }}>Save</Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey="2" style={{ marginTop: "1%" }}>
                                <Panel header="Delete">
                                    <Row>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            // defaultValue={['a10', 'c12']}
                                            value={this.state.expenseDeleteValue}
                                            onChange={(value) => this.setState({ expenseDeleteValue: value })}
                                        >
                                            {this.state.expenseCategory}
                                        </Select>
                                    </Row>
                                    <Row style={{ textAlign: 'center', marginTop: '1%' }}>
                                        <Button onClick={() => this.onExpenseDeleteClick()} type="primary">Delete</Button>
                                    </Row>
                                </Panel>
                            </Collapse>
                        </Panel>
                        {/* ----------------------------------------- Income ---------------------------------------------------------------------------- */}
                        <Panel header="INCOME" key="2">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Add" >
                                    <Row>
                                        <Col span={5}>
                                            {/* <Form.Item> */}
                                                <Input id="incomeAddValue" type="text" value={this.state.incomeAddValue} onChange={(e) => this.setState({ incomeAddValue: e.target.value })} style={{ width: "100%" }}></Input>
                                                {/* {
                                                    getFieldDecorator('addIncome', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your category!'
                                                        }]
                                                    })(<Input id="incomeAddValue" type="text" onChange={(e) => this.setState({ incomeAddValue: e.target.value })} style={{ width: "100%" }}></Input>)
                                                } */}
                                            {/* </Form.Item> */}
                                        </Col>
                                        <Col span={10}>
                                            <Button onClick={() => this.onIncomeAdd()} type="primary" style={{ marginLeft: "5%" }}>Save</Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey="2" style={{ marginTop: "1%" }}>
                                <Panel header="Delete">
                                    <Row>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            // defaultValue={['a10', 'c12']}
                                            value={this.state.incomeDeleteValue}
                                            onChange={(value) => this.setState({ incomeDeleteValue: value })}
                                        >
                                            {this.state.incomeCategory}
                                        </Select>
                                    </Row>
                                    <Row style={{ textAlign: 'center', marginTop: '1%' }}>
                                        <Button onClick={() => this.onIncomeDeleteClick()} type="primary">Delete</Button>
                                    </Row>
                                </Panel>
                            </Collapse>
                        </Panel>
                        {/* ----------------------------------------- Source ---------------------------------------------------------------------------- */}
                        <Panel header="SOURCE" key="3">
                            <Collapse defaultActiveKey="1">
                                <Panel header="Add">
                                    <Row>
                                        {/* <Input id="sourceAddValue" type="text" value={this.state.sourceAddValue} onChange={this.handleChange} style={{ width: "30%" }}></Input>
                                        <Button onClick={() => this.onSourceAdd()} type="primary" style={{ marginLeft: "5%" }}>Save</Button> */}
                                        <Col span={5}>
                                            <Input id="sourceAddValue" type="text" value={this.state.sourceAddValue} onChange={(e) => this.setState({ sourceAddValue: e.target.value })} style={{ width: "100%" }}></Input>
                                            {/* <Form.Item> */}
                                                {/* {
                                                    getFieldDecorator('addSource', {
                                                        rules: [{
                                                            required: true,
                                                            message: 'Please input your category!'
                                                        }]
                                                    })(<Input id="sourceAddValue" type="text" onChange={(e) => this.setState({ sourceAddValue: e.target.value })} style={{ width: "100%" }}></Input>)
                                                } */}
                                            {/* </Form.Item> */}
                                        </Col>
                                        <Col span={10}>
                                            <Button onClick={() => this.onSourceAdd()} type="primary" style={{ marginLeft: "5%" }}>Save</Button>
                                        </Col>
                                    </Row>
                                </Panel>
                            </Collapse>
                            <Collapse defaultActiveKey="2" style={{ marginTop: "1%" }}>
                                <Panel header="Delete">
                                    <Row>
                                        <Select
                                            mode="multiple"
                                            style={{ width: '100%' }}
                                            placeholder="Please select"
                                            value={this.state.sourceDeleteValue}
                                            onChange={(value) => this.setState({ sourceDeleteValue: value })}
                                        >
                                            {this.state.source}
                                        </Select>
                                    </Row>
                                    <Row style={{ textAlign: 'center', marginTop: '1%' }}>
                                        <Button onClick={() => this.onSourceDeleteClick()} type="primary">Delete</Button>
                                    </Row>
                                </Panel>
                            </Collapse>
                        </Panel>
                    </Collapse>
                {/* </Form> */}
            </div >
        )
    }
}

// const WrappedConfigForm = Form.create({ name: 'config' })(config)
export default config;