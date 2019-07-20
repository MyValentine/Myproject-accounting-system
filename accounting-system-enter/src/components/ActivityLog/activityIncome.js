import React, { Component } from 'react';
import { Table, Row, Col } from 'antd';
import axios from 'axios';
import 'antd/dist/antd.css';

const columns = [
    {
        title: "No.",
        dataIndex: 'transaction_id',
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
        title: 'Income ID',
        dataIndex: 'income_id',
        align: 'center'
    }
];

class ActivityIncome extends Component {
    constructor(){
        super();
        this.state={
            data: []
        }
        const url = `http://localhost:3001/api/income/incometransaction/`;
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
        return(
            <div>
                <Row>
                    <h1>Income Activity Log</h1>
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

export default ActivityIncome;