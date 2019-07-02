import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
// import SiderDemo from './components/Main/SiderDemo';
import firebase from 'firebase';
// import 
import { BrowserRouter as Router, Route, Link, Redirect } from "react-router-dom";
import { Layout, Menu, Icon, Breadcrumb, Avatar,Row } from 'antd';
import 'antd/dist/antd.css';

import Dashboard from './components/Dashboard/dashboard';
import Expense from './components/Expense/expense';
import Income from './components/Income/income';
import User from './components/User/user';
import Config from './components/Configs/config';
import Report from './components/Report/report';
import Login from './components/login';
import EditExpense from './components/Report/editExpense';
import EditIncome from './components/Report/editIncome';
// import Register from './components/register';
import AllReport from './components/Report/allReport';
import ReportExpense from './components/Report/reportExpense';
import ReportIncome from './components/Report/reportIncome';
import ForgotPassword from './components/forgotPassword';


const { Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;
// const nonLoggedinPath = ['/Register', '/ForgotPassword']

class App extends Component {
  constructor() {
    super();
    this.state = {
      collapsed: false,
      isSiderOn: false,
      isLoggedin: false
    }
    firebase.auth().onAuthStateChanged((user) => {
      //   if (user) {
      //     console.log(user)
      //     if (nonLoggedinPath.indexOf(window.location.pathname) !== -1) {
      //       if (user.emailVerified) {
      //         this.setState({ isSiderOn: true, isLoggedin: true })
      //         // window.location.assign('/');
      //       }
      //     }
      //   } else {
      //     // console.log(nonLoggedinPath.indexOf(window.location.pathname))
      //     if (nonLoggedinPath.indexOf(window.location.pathname) === -1) {
      //       // console.log("toLogin")
      //       // window.location.assign('/login');
      //       this.setState({ isSiderOn: false, isLoggedin: false })
      //     }
      //   }
      // })
      if (user) {
        console.log(user)
        if (user.emailVerified) {
          this.setState({ isSiderOn: true, isLoggedin: true })
        }
      }
      // if(window.location.pathname === '/Register')
    })
  }

  onCollapse = collapsed => {
    // console.log(collapsed);
    this.setState({ collapsed });
  };

  render() {
    console.log(this.state.isLoggedin);
    let contentStyle = { padding: 24, background: '#fff', minHeight: 360, borderRadius: "20px" };
    let sider = <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
      <div className="logo" />
      <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
        <Row style={{textAlign: 'center'}}>
          <Avatar shape="square" size={64}  src="enter4.png" />
          {/* <img src="enter4.png" width="42" height="42"></img> */}
        </Row>
        {/* <Row style={{textAlign: 'center', marginTop: "2%"}}>
          Adisorn
        </Row> */}
          
        
        <Menu.Item key="1">
          <Link onClick={() => this.setState({ isSiderOn: true })} to="/"><Icon type="dashboard" />
            {/* <span>Dashboard</span> */}
            <span>Dashboard</span></Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link onClick={() => this.setState({ isSiderOn: true })} to="/expense"><Icon type="euro" />
            {/* <span>Expense</span> */}
            <span>Expense</span></Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link onClick={() => this.setState({ isSiderOn: true })} to="/income"><Icon type="fund" />
            {/* <span>Income</span> */}
            <span>Income</span></Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link onClick={() => this.setState({ isSiderOn: true })} to="/config"><Icon type="setting" />
            {/* <span>Config</span> */}
            <span>Config</span></Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link onClick={() => this.setState({ isSiderOn: true })} to="/user"><Icon type="user" />
            {/* <span>User</span> */}
            <span>User</span></Link>
        </Menu.Item>
        <SubMenu key="6" title={<span><Icon type="book" /><span>Report</span></span>}>
          {/* <Menu.Item>
            <Link onClick={() => this.setState({ isSiderOn: true })} to="/report">
              <span>Report</span></Link>
          </Menu.Item> */}
          <Menu.Item>
            <Link onClick={() => this.setState({ isSiderOn: true })} to="/reportExpense">
              <span>Expense Report</span></Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={() => this.setState({ isSiderOn: true })} to="/reportIncome">
              <span>Income Report</span></Link>
          </Menu.Item>
          <Menu.Item>
            <Link onClick={() => this.setState({ isSiderOn: true })} to="/allReport">
              <span>Full Report</span></Link>
          </Menu.Item>
        </SubMenu>
        <Menu.Item key="7">
          <Link onClick={() => {
            firebase.auth().signOut();
            this.setState({ isSiderOn: false, isLoggedin: false });
          }} to="/"><Icon type="logout" />
            {/* <span>Log out</span> */}
            <span>Log out</span></Link>
        </Menu.Item>
      </Menu>
    </Sider>
    if (!this.state.isSiderOn) {
      sider = null;
      contentStyle = {};
    }
    return (
      <div>
        <Router>
          <Layout style={{ minHeight: '100vh' }}>
            {sider}
            <Layout>
              {/* <Header style={{ background: '#fff', padding: 0 }} /> */}
              <Content style={{ margin: '0 16px' }}>
                <Breadcrumb style={{ margin: '16px 0' }}>
                  {/* <Breadcrumb.Item>User</Breadcrumb.Item>
                  <Breadcrumb.Item>Bill</Breadcrumb.Item> */}
                </Breadcrumb>
                <div style={contentStyle}>
                  {/* <Switch> */}
                  {/* <div><SiderDemo /> </div> */}
                  <Route path="/dashboard" component={Dashboard} />
                  <Route path="/expense" component={Expense} />
                  <Route path="/user" component={User} />
                  <Route path="/income" component={Income} />
                  <Route path="/config" component={Config} />
                  <Route path="/report" component={Report} />
                  <Route path="/" exact render={() => (
                    this.state.isLoggedin ? (
                      <Redirect to='/dashboard' />
                    ) : (
                        <Login />
                      )
                  )} />
                  <Route path="/editExpense" component={EditExpense} />
                  <Route path="/editIncome" component={EditIncome} />
                  {/* <Route path="/register" component={Register} /> */}
                  <Route path="/allReport" component={AllReport} />
                  <Route path="/reportExpense" component={ReportExpense} />
                  <Route path="/reportIncome" component={ReportIncome} />
                  <Route path="/forgotpassword" component={ForgotPassword} />
                  {/* <Route path="/login" component={Login} /> */}
                  {/* </Switch> */}
                </div>
              </Content>
              <Footer style={{ textAlign: 'center' }}></Footer>
            </Layout>
          </Layout>
        </Router>
      </div>
    );
  }
}

export default App;
