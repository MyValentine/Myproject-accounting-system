import React, { Component } from 'react';
import { Table, Input, Row, Col, Select, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { getExpenseCategory, getIncomeCategory } from '../../Utils/firebaseDatabase';

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
    },
    {
        title: "Edit",
        dataIndex: 'edit'
    }
];

class Report extends Component {
    constructor() {
        super();
        this.state = {
            data: [],
            selectedTable: 'expense',
            isSelectMonth: 'All',
            isSelectYear: '2019',
            category: [],
            selectedCategory: 'ทั้งหมด',
        }
        const url = `http://128.199.217.104:3001/api/expense/expense/`;
        axios.get(url, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ data: res.data }) })

        let dataExpense = [];
        getExpenseCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            dataExpense.push(<Option key="all" value="ทั้งหมด">ทั้งหมด</Option>)
            this.setState({ category: dataExpense })
        })
    }

    onTableChange = (value) => {
        console.log(value)
        if (value === "income") {
            const url = `http://128.199.217.104:3001/api/income/income/`;
            axios.get(url, {
                mode: 'no-cors'
            })
                .then(res => { this.setState({ data: res.data, selectedTable: value }) })

        let dataIncome = [];
        getIncomeCategory().then(res => {
            res.forEach(e => {
                console.log(e)
                dataIncome.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
            })
            this.setState({ category: dataIncome })
        })

        } else if (value === "expense") {
            const url = `http://128.199.217.104:3001/api/expense/expense/`;
            axios.get(url, {
                mode: 'no-cors'
            })
                .then(res => { this.setState({ data: res.data, selectedTable: value }) })

            let dataExpense = [];
            getExpenseCategory().then(res => {
                res.forEach(e => {
                    console.log(e)
                    dataExpense.push(<Option key={e.name} value={e.name}>{e.name}</Option>)
                })
                this.setState({ category: dataExpense })
            })
        }
    }

    render() {
        console.log(this.state.data)
        let data = this.state.data;
        let isTotal = 0;
        
        data = data.filter(e => e.isDelete === 'false');
        data.map((l, i) => {
            l.key = i;
            l.edit = 
            <Button type="primary" onClick={() => {
                console.log(l)
                // const dataObject = {
                //     id: parseInt(l.id, 16),
                //     date: l.date,
                //     selectedCategory: l.selectedCategory,
                //     description: l.description,
                //     amount: l.amount,
                //     total: l.total,
                //     selectedSource: l.selectedSource,
                //     isDelete: "true"
                // }
                console.log(this.state.selectedTable)
                if (this.state.selectedTable === "expense") {
                    // const url = `http://128.199.217.104:3001/api/expense/expenseUpdate/`;
                    // axios.post(url, dataObject, {
                    //     mode: 'no-cors'
                    // }).then(res => {
                    //     console.log(res);
                    //     this.setState({ data: [] });
                    //     this.onTableChange("expense");
                    // })
                    window.location.assign('/editExpense?id='+l.id);
                } else if (this.state.selectedTable === "income") {
                    // console.log("income delete")
                    // const url = `http://128.199.217.104:3001/api/income/incomeUpdate/`;
                    // axios.post(url, dataObject, {
                    //     mode: 'no-cors'
                    // }).then(res => {
                    //     console.log(res);
                    //     this.setState({ data: [] });
                    //     this.onTableChange("income");
                    // })
                    window.location.assign('/editIncome?id='+l.id);
                }
            }}>Edit</Button>
        })

        // filter month
        if(this.state.isSelectMonth === "January"){
            data = data.filter(e => e.date.split(" ")[1] === "Jan");
        } else if(this.state.isSelectMonth === "February") {
            data = data.filter(e => e.date.split(" ")[1] === "Feb");
        } else if(this.state.isSelectMonth === "March") {
            data = data.filter(e => e.date.split(" ")[1] === "Mar");
        } else if(this.state.isSelectMonth === "April") {
            data = data.filter(e => e.date.split(" ")[1] === "Apr");
        } else if(this.state.isSelectMonth === "May") {
            data = data.filter(e => e.date.split(" ")[1] === "May");
        } else if(this.state.isSelectMonth === "June") {
            data = data.filter(e => e.date.split(" ")[1] === "Jun");
        } else if(this.state.isSelectMonth === "July") {
            data = data.filter(e => e.date.split(" ")[1] === "Jul");
        } else if(this.state.isSelectMonth === "August") {
            data = data.filter(e => e.date.split(" ")[1] === "Aug");
        } else if(this.state.isSelectMonth === "September") {
            data = data.filter(e => e.date.split(" ")[1] === "Sep");
        } else if(this.state.isSelectMonth === "October") {
            data = data.filter(e => e.date.split(" ")[1] === "Oct");
        } else if(this.state.isSelectMonth === "November") {
            data = data.filter(e => e.date.split(" ")[1] === "Nov");
        } else if(this.state.isSelectMonth === "December") {
            data = data.filter(e => e.date.split(" ")[1] === "Dec");
        }

        // filter year
        if(this.state.isSelectYear === "2019"){
            data = data.filter(e => e.date.split(" ")[2] === "2019");
        } else if(this.state.isSelectYear === "2018"){
            data = data.filter(e => e.date.split(" ")[2] === "2018");
        }

        // filter category
        if(this.state.selectedCategory !== "ทั้งหมด"){
            data = data.filter(e => e.selectedCategory === this.state.selectedCategory);
        }

        data.map((l, i) => {
            // l.key = i;
            isTotal = isTotal + parseFloat(l.total.replace(/,/g,''), 10);
        })
        return (
            <div>
                <Row>
                    <Col span={1} style={{ textAlign: 'center' }}>
                        List
                    </Col>
                    <Col span={3}>
                        <Select style={{ width: "100%" }} onChange={(value) => this.onTableChange(value)} defaultValue="expense">
                            <Option value="expense">Expense</Option>
                            <Option value="income">Income</Option>
                        </Select>
                    </Col>
                    <Col span={2} style={{ textAlign: 'center' }}>
                        By Month
                    </Col>
                    <Col span={3}>
                        <Select style={{ width: "100%" }} onChange={(value) => this.setState({isSelectMonth: value})} defaultValue="All">
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
                    <Col span={2} style={{ textAlign: 'center' }}>
                        By Year
                    </Col>
                    <Col span={3}>
                        <Select style={{ width: "100%" }} onChange={(value) => this.setState({ isSelectYear: value })} defaultValue="2019">
                            <Option value="2019">2019</Option>
                            <Option value="2018">2018</Option>
                        </Select>
                    </Col>
                    <Col span={3}></Col>
                    <Col span={2} style={{ textAlign: 'center' }}>
                        Category
                    </Col>
                    <Col span={5}>
                        <Select style={{ width: "100%" }} onChange={(value) => {console.log(value);this.setState({ selectedCategory: value })}} defaultValue="ทั้งหมด">
                            {this.state.category}
                        </Select>
                    </Col>

                </Row>
                <Row style={{ marginTop: "2%" }}>
                    <Col span={24}>
                        <Table columns={columns} dataSource={data} />
                    </Col>
                    {/* <Col span={12}>
                        <Table columns={columns} dataSource={data} />
                    </Col> */}
                    
                </Row>
                <Row style={{ marginTop: "3%" }}>
                    <Col span={18}></Col>
                    <Col span={3}>
                        Total
                    </Col>
                    <Col span={3}>
                        <Input style={{ textAlign: 'right' }} value={(isTotal.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                    </Col>
                </Row>
                {/* <Row style={{ marginTop: "1%" }}>
                    <Col span={18}></Col>
                    <Col span={3}>
                        Grand Total
                    </Col>
                    <Col span={3}>
                        <Input style={{ textAlign: 'right' }} />
                    </Col>
                </Row> */}
            </div>
        )
    }

}

export default Report;