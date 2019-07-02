import React, { Component } from 'react';
import { Table, Input, Row, Col, Select, Button } from 'antd';
import 'antd/dist/antd.css';
import axios from 'axios';
import { getExpenseCategory, getSource } from '../../Utils/firebaseDatabase';

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

class ReportExpense extends Component{
    constructor() {
        super();
        this.state = {
            data: [],
            // selectedTable: 'expense',
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

    componentWillMount = () => {
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

    render(){
        console.log(this.state.data)
        let data = this.state.data;
        let isTotal = 0;
        data = data.filter(e => e.isDelete === 'false');
        data.map((l,i) => {
            l.key = i;
            l.edit = <Button type="primary" onClick={() => window.location.assign('/editExpense?id='+l.id)}>Edit</Button>
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
        return(
            <div>
                <Row>
                    <Row>
                        <Col xl={2} lg={2} md={3}>
                            Category
                        </Col>
                        <Col xl={5} lg={5} md={5}>
                            <Select style={{ width: "100%" }} onChange={(value) => { console.log(value); this.setState({ selectedCategory: value }) }} defaultValue="ทั้งหมด">
                                {this.state.category}
                            </Select>
                        </Col>
                        <Col xl={{span: 2, offset: 7 }} lg={{span: 2, offset: 7}} md={{span: 3, offset: 2}} style={{ textAlign: 'center' }}>
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
                        <Col xl={2} lg={2} md={3} style={{ textAlign: 'center' }}>
                            By Year
                        </Col>
                        <Col xl={3} lg={3} md={4}>
                            <Select style={{ width: "100%" }} onChange={(value) => this.setState({ isSelectYear: value })} defaultValue="2019">
                                <Option value="2019">2019</Option>
                                <Option value="2018">2018</Option>
                            </Select>
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "2%" }}>
                        <Col span={24}>
                            <Table columns={columns}  dataSource={data} />
                        </Col>
                    </Row>
                    <Row style={{ marginTop: "3%" }}>
                        <Col xl={{ span: 3, offset: 18}} lg={{ span:3, offset: 18}} md={{ span: 3, offset: 16 }}>
                            Total
                        </Col>
                        <Col xl={3} lg={3} md={5}>
                            <Input style={{ textAlign: 'right' }} value={(isTotal.toFixed(2)).replace(/\B(?=(\d{3})+(?!\d))/g, ",")} />
                        </Col>
                    </Row>
                </Row>
            </div>
        );
    }
}

export default ReportExpense;