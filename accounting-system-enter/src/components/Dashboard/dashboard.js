import React, { Component } from 'react';
import 'antd/dist/antd';
import { Row, Col, Select, Icon } from 'antd';
import Chart from 'react-chartist';
import axios from 'axios';
import './dashboard.css';

const Option = Select.Option;

// const dashboard = () => (
//     <div className="card ">
//         <div className="header">
//             <Row>
//                 <Col span={2} style={{ textAlign: 'center' }}>
//                     Year
//                 </Col>
//                 <Col span={3}>
//                     <Select style={{ width: "100%" }} defaultValue="2019">
//                         <Option value="2019">2019</Option>

//                     </Select>
//                 </Col>
//             </Row>
//             <h4 className="title">2014 Sales</h4>
//             <p className="category">All products including Taxes</p>
//         </div>
//         <div className="content">
//             <Chart data={data} options={options} responsiveOptions={responsiveOptions} type="Bar" className="ct-chart" />

//         </div>
//         <div className="footer">
//             <div className="legend">
//                 <div className="item">
//                     <i className="fa fa-circle text-info"></i> EXPENSE
//           </div>
//                 <div className="item">
//                     <i className="fa fa-circle text-danger"></i> INCOME
//           </div>
//             </div>
//             <hr />
//             <div className="stats">
//                 <i className="fa fa-check"></i> Data information certified
//             </div>
//         </div>
//     </div>
// );

function getMonthsTotal(data) {
    console.log(data)
    let total = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    data.filter(e => e.date.split(" ")[1] === "Jan").map((l, i) => {
        total[0] = total[0] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Feb").map((l, i) => {
        total[1] = total[1] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Mar").map((l, i) => {
        total[2] = total[2] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Apr").map((l, i) => {
        total[3] = total[3] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "May").map((l, i) => {
        total[4] = total[4] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Jun").map((l, i) => {
        total[5] = total[5] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Jul").map((l, i) => {
        total[6] = total[6] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Aug").map((l, i) => {
        total[7] = total[7] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Sep").map((l, i) => {
        total[8] = total[8] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Oct").map((l, i) => {
        total[9] = total[9] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Nov").map((l, i) => {
        total[10] = total[10] + parseInt(l.total.replace(/,/g,""), 10)
    });
    data.filter(e => e.date.split(" ")[1] === "Dec").map((l, i) => {
        total[11] = total[11] + parseInt(l.total.replace(/,/g,""), 10)
    });
    return total;
}

class dashboard extends Component {
    constructor() {
        super();
        this.state = {
            isSelectYear: '2019',
            dataIncome: [],
            dataExpense: [],
            
        }

        const url = `http://localhost:3001/api/expense/expense/`;
        axios.get(url, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ dataExpense: res.data }) })

        const url2 = `http://localhost:3001/api/income/income/`;
        axios.get(url2, {
            mode: 'no-cors'
        })
            .then(res => { this.setState({ dataIncome: res.data }) })

    }

    render() {
        console.log(this.state)
        let { dataIncome, dataExpense } = this.state
        let options = {
            // stroke: "blue",
            seriesBarDistance: 10,
            axisX: {
                showGrid: false
            },
            height: "245px"
        };

        let responsiveOptions = [
            ['screen and (max-width: 650px)', {
                seriesBarDistance: 5,
                axisX: {
                    labelInterpolationFnc: function (value) {
                        return value[0];
                    }
                }
            }]
        ];

        let incomeYearTotal, expenseYearTotal = [];
        dataExpense = dataExpense.filter(e => e.isDelete === 'false');
        dataIncome = dataIncome.filter(e => e.isDelete === 'false');
        if (this.state.isSelectYear === '2019') {
            expenseYearTotal = getMonthsTotal(dataExpense.filter(e => e.date.split(" ")[2] === "2019"));
            incomeYearTotal = getMonthsTotal(dataIncome.filter(e => e.date.split(" ")[2] === "2019"));
        }
        console.log(expenseYearTotal)
        console.log(incomeYearTotal)
        let filteredData = {
            labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
            series: [
                expenseYearTotal,
                incomeYearTotal
            ]
        };
        return (
            <div>
                <Row className="header">
                    <Col span={2} style={{ textAlign: 'center' }}>
                        Year
                    </Col>
                    <Col span={3}>
                        <Select style={{ width: "100%" }} defaultValue="2019">
                            <Option value="2019">2019</Option>
                            <Option value="2018">2018</Option>
                        </Select>
                    </Col>

                    {/* <h4 className="title">2014 Sales</h4>
                    <p className="category">All products including Taxes</p> */}
                </Row>
                <Row className="content">
                    <Chart data={filteredData} options={options} responsiveOptions={responsiveOptions} type="Bar" className="ct-chart"/>
                </Row>
                <Row className="footer">
                    <Row className="legend">
                        <Row className="item">
                            <Icon type="caret-right" theme="filled" style={{ color: "rgb(215,2,6,1)" }} /><span style={{ color: "rgb(215,2,6,1)" }}>EXPENSE</span>
                        </Row>
                        <Row className="item">
                            <Icon type="caret-right" theme="filled" style={{ color: "#0000ff" }} /><span style={{ color: "#0000ff" }}>INCOME</span>
                        </Row>
                    </Row>
                    <hr />
                    <Row className="stats">
                        <i className="fa fa-check"></i> Data information certified
                    </Row>
                </Row>
            </div>
        );
    }
}

export default dashboard;
