import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const columns = [
    {
        key: 'id',
        title: "No.",
        dataIndex: "key",
        align: 'center'
    },
    {
        title: 'Month',
        dataIndex: 'date'
    },
    {
        title: 'Category',
        dataIndex: 'selectedCategory',
        align: 'center'
    },
    {
        title: 'Description',
        dataIndex: 'description',
        width: "20%"
    },
    {
        title: 'Amount',
        dataIndex: 'amount',
        align: 'center'
    },
    {
        title: 'Total',
        dataIndex: 'total',
        align: 'right'

    },
    {
        title: 'Source',
        dataIndex: 'selectedSource',
        align: 'center'
    },
    {
        title: 'TimeStamp',
        dataIndex: 'timeStamp'
    },
    {
        title: 'Delete',
        dataIndex: 'isDelete',
        align: 'center'
    },
    {
        title: 'Expense ID',
        dataIndex: 'expense_id',
        align: 'center'
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
            l.key = i+1;
        })

        console.log(data)
        return(
            <div>
                <Row>
                    <h1>Expense Activity Log</h1>
                </Row>
                <Row><hr></hr></Row>
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