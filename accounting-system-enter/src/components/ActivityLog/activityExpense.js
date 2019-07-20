import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const columns = [
    {
        title: "No.",
        dataIndex: 'transaction_id'
    },
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
        title: 'TimeStamp',
        dataIndex: 'timeStamp'
    },
    {
        title: 'Delete',
        dataIndex: 'isDelete'
    },
    {
        title: 'Expense ID',
        dataIndex: 'expense_id'
    }
];

class ActivityExpense extends Component {
    constructor(){
        super();
        this.state={
            data: []
        }
        const url = `http://localhost:3001/api/expense/expensetransaction/`;
        axios.get(url, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ data: res.data }) })
    }
    
    render(){
        let data = this.state.data;
        data.map((l,i) => {
            l.key = i;
        })

        console.log(data)
        return(
            <div>
                <Row>
                    Activity Expense
                </Row>
                <Row style={{ marginTop: "2%" }}>
                    <Col span={24}>
                        <Table columns={columns}  dataSource={data} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ActivityExpense;