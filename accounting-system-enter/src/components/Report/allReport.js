import React, { Component } from "react";
import { Table, Input, Row, Col, Select, Card } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { getExpenseCategory, getIncomeCategory, getSource } from '../../Utils/firebaseDatabase';

const Option = Select.Option;

const columns = [
    {
        title: 'Month',
        dataIndex: 'date'
    },
    {
        title: 'Category',
        dataIndex: 'selectedCategory',
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: "20%"
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
    },
    {
        title: 'Total',
        dataIndex: 'total'
    },
    {
        title: 'Source',
        dataIndex: 'selectedSource'
    }
];

class AllReport extends Component {
    constructor() {
        super();
        this.state = {
            dataExpense: [],
            dataIncome: [],
            // selectedTable: 'expense',
            isSelectMonth: 'All',
            isSelectYear: '2019',
            categoryExpense: [],
            categoryIncome: [],
            selectedCategory: 'ทั้งหมด',
        }

        const urlExpense = `http://localhost:3001/api/expense/expense/`;
        axios.get(urlExpense, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ dataExpense: res.data }) })

        let dataExpense = [];
        getExpenseCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            dataExpense.push(<Option key="all" value="ทั้งหมด">ทั้งหมด</Option>)
            this.setState({ categoryExpense: dataExpense })
        })

        const urlIncome = `http://localhost:3001/api/income/income/`;
        axios.get(urlIncome, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ dataIncome: res.data }) })

        let dataIncome = [];
        getIncomeCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataIncome.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            dataIncome.push(<Option key="all" value="ทั้งหมด">ทั้งหมด</Option>)
            this.setState({ categoryIncome: dataIncome })
        })
    }

    componentWillMount() {
        let dataExpense = [];
        getExpenseCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ ExpenseCategory: dataExpense })
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
    render() {
        // console.log(this.state.data)
        let dataExpense = this.state.dataExpense;
        let dataIncome = this.state.dataIncome;
        let isTotalExpense = 0;
        let isTotalIncome = 0;
        let isGrandTotal = 0;

        dataExpense = dataExpense.filter(e => e.isDelete === 'false');
        dataExpense.map((l, i) => {
            l.key = i;
            // const dataObject = {
            //         id: parseInt(l.id, 16),
            //         date: l.date,
            //         selectedCategory: l.selectedCategory,
            //         description: l.description,
            //         amount: l.amount,
            //         total: l.total,
            //         selectedSource: l.selectedSource
            //     }
            // const url = `http://localhost:3001/api/expense/expense/`;
            // axios.get(url, dataObject, {
            //     mode: 'no-cors'
            // }).then(res => {
            //     console.log(res);
            //     this.setState({ data: [] });
            // })
        })
        dataIncome = dataIncome.filter(e => e.isDelete === 'false');
        dataIncome.map((l, i) => {
            l.key = i;
            // const dataObject = {
            //         id: parseInt(l.id, 16),
            //         date: l.date,
            //         selectedCategory: l.selectedCategory,
            //         description: l.description,
            //         amount: l.amount,
            //         total: l.total,
            //         selectedSource: l.selectedSource
            //     }
            // const url = `http://localhost:3001/api/expense/expense/`;
            // axios.get(url, dataObject, {
            //     mode: 'no-cors'
            // }).then(res => {
            //     console.log(res);
            //     this.setState({ data: [] });
            // })
        })

        // filter month
        if (this.state.isSelectMonth === "January") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Jan");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Jan");
        } else if (this.state.isSelectMonth === "February") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Feb");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Feb");
        } else if (this.state.isSelectMonth === "March") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Mar");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Mar");
        } else if (this.state.isSelectMonth === "April") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Apr");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Apr");
        } else if (this.state.isSelectMonth === "May") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "May");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "May");
        } else if (this.state.isSelectMonth === "June") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Jun");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Jun");
        } else if (this.state.isSelectMonth === "July") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Jul");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Jul");
        } else if (this.state.isSelectMonth === "August") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Aug");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Aug");
        } else if (this.state.isSelectMonth === "September") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Sep");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Sep");
        } else if (this.state.isSelectMonth === "October") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Oct");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Oct");
        } else if (this.state.isSelectMonth === "November") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Nov");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Nov");
        } else if (this.state.isSelectMonth === "December") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[1] === "Dec");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[1] === "Dec");
        }

        // filter year
        if (this.state.isSelectYear === "2019") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[2] === "2019");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[2] === "2019");
        } else if (this.state.isSelectYear === "2018") {
            dataExpense = dataExpense.filter(e => e.date.split(" ")[2] === "2018");
            dataIncome = dataIncome.filter(e => e.date.split(" ")[2] === "2018");
        }

        // filter category
        if (this.state.selectedCategory !== "ทั้งหมด") {
            dataExpense = dataExpense.filter(e => e.selectedCategory === this.state.selectedCategory);

        }

        // filter category
        if (this.state.selectedCategory !== "ทั้งหมด") {
            dataIncome = dataIncome.filter(e => e.selectedCategory === this.state.selectedCategory);
        }

        dataExpense.map((l, i) => {
            // l.key = i;
            isTotalExpense = isTotalExpense + parseFloat(l.total.replace(/,/g, ''), 10);
        })
        dataIncome.map((l, i) => {
            // l.key = i;
            isTotalIncome = isTotalIncome + parseFloat(l.total.replace(/,/g, ''), 10);
        })

        isGrandTotal = isTotalIncome - isTotalExpense;
        return (
            <div>
                <Row>
                    <Row>
                        <Col xl={{ span: 2, offset: 14 }} lg={{ span: 3, offset: 12 }} md={{ span: 3, offset: 10 }} style={{ textAlign: 'center' }}>
                            By Month
                    </Col>
                        <Col xl={3} lg={3} md={4}>
                            <Select style={{ width: "100%" }} onChange={(value) => this.setState({ isSelectMonth: value })} defaultValue="All">
                                <Option value="December">December</Option>
                                <Option value="November">November</Option>
                                <Option value="October">October</Option>
                                <Option value="September">September</Option>
                                <Option value="August">August</Option>
                                <Option value="July">July</Option>
                                <Option value="June">June</Option>
                                <Option value="May">May</Option>
                                <Option value="April">April</Option>
                                <Option value="March">March</Option>
                                <Option value="February">February</Option>
                                <Option value="January">January</Option>
                                <Option value="All">All</Option>
                            </Select>
                        </Col>
                        <Col xl={2} lg={3} md={3} style={{ textAlign: 'center' }}>
                            By Year
                    </Col>
                        <Col xl={3} lg={3} md={4}>
                            <Select style={{ width: "100%" }} onChange={(value) => this.setState({ isSelectYear: value })} defaultValue="2019">
                                <Option value="2019">2019</Option>
                                <Option value="2018">2018</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "1%" }}><hr></hr></Row>
                    <Row style={{ marginTop: "2%" }}>
                        <Col xl={12} >
                            {/* <Card style={{ background: "#dedede"}}> */}
                            <Row>
                                <Col xl={4} lg={3} md={3}>EXPENSE</Col>
                                <Col xl={20} lg={20} lg={20}>
                                    <Select style={{ width: "25%" }} onChange={(value) => { console.log(value); this.setState({ selectedCategory: value }) }} defaultValue="ทั้งหมด">
                                        {this.state.categoryExpense}
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "3%" }}>
                                <Table style={{ width: "96%" }} columns={columns} dataSource={dataExpense} />
                            </Row>
                            {/* </Card> */}
                        </Col>
                        <Col xl={12}>
                            {/* <Card style={{ background: "bisque"}}> */}
                            <Row>
                                <Col xl={4} lg={3} md={3}>INCOME</Col>
                                <Col xl={20} lg={20} lg={20}>
                                    <Select style={{ width: "25%" }} onChange={(value) => { console.log(value); this.setState({ selectedCategory: value }) }} defaultValue="ทั้งหมด">
                                        {this.state.categoryIncome}
                                    </Select>
                                </Col>
                            </Row>
                            <Row style={{ marginTop: "3%" }}>
                                <Table columns={columns} dataSource={dataIncome} />
                            </Row>
                            {/* <Row style={{ marginTop: "3%" }}>
                                <Col xl={{ span: 5, offset: 14 }} lg={{ span: 5, offset: 14 }} md={{ span: 5, offset: 13 }} style={{ textAlign: 'center' }}>
                                    Total Income
                                </Col>
                                <Col xl={5} lg={5} md={6}>
                                    <Input style={{ textAlign: 'right' }} value={(isTotalIncome.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                                </Col>
                            </Row> */}
                            {/* <Row style={{ marginTop: "8%" }}>
                                <Col xl={{ span: 5, offset: 14 }} lg={{ span: 5, offset: 14 }} md={{ span: 5, offset: 13 }} style={{ textAlign: 'center' }}>
                                    <h1 style={{ fontWeight: 'bold' }}>Grand Total</h1>
                                </Col>
                                <Col xl={5} lg={5} md={6}>
                                    <Input style={{ textAlign: 'right' }} value={(isGrandTotal.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                                </Col>
                            </Row> */}
                            {/* </Card> */}
                        </Col>
                    </Row>
                </Row>
                <Row style={{ marginTop: "3%" }}>
                    <Col xl={{ span: 5, offset: 3 }} style={{ textAlign: 'center' }}>
                        Total Expense
                    </Col>
                    <Col xl={3}>
                        <Input style={{ textAlign: 'right' }} value={(isTotalExpense.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    </Col>
                    <Col xl={{ span: 5, offset: 5 }} style={{ textAlign: 'center' }}>
                        Total Income
                    </Col>
                    <Col xl={3} lg={5} md={6}>
                        <Input style={{ textAlign: 'right' }} value={(isTotalIncome.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    </Col>
                </Row>
                <Row style={{ marginTop: "3%" }}>
                    <Col xl={{ span: 5, offset: 16 }} lg={{ span: 5, offset: 14 }} md={{ span: 5, offset: 13 }} style={{ textAlign: 'center' }}>
                        <h1 style={{ fontWeight: 'bold' }}>Grand Total</h1>
                    </Col>
                    <Col xl={3} lg={5} md={6}>
                        <Input style={{ textAlign: 'right' }} value={(isGrandTotal.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    </Col>
                </Row>>
            </div>
        );
    }
}

export default AllReport;