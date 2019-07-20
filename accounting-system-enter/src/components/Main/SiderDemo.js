// import React, { Component } from 'react';
// import { Layout, Menu, Breadcrumb, Icon, Avatar } from 'antd';
// import 'antd/dist/antd.css';

// import Dashboard from '../Dashboard/dashboard';
// import Expense from '../Expense/expense';
// import Income from '../Income/income';
// import Config from '../Configs/config';
// import User from '../User/user';
// import Report from '../Report/report';

// const { Header, Content, Footer, Sider } = Layout;
// // const { SubMenu } = Menu;

// class SiderDemo extends React.Component {
//   state = {
//     collapsed: false,
//     dashboard: false,
//     expense: false,
//     config: false,
//     user: false,
//     report: false
//     //loading: false
//   };

//   // showSkeleton = () => {
//   //   this.setState({ loading: true });
//   //   setTimeout(() => {
//   //     this.setState({ loading: false });
//   //   }, 3000);
//   // };

//   onCollapse = collapsed => {
//     console.log(collapsed);
//     this.setState({ collapsed });
//   };

//   dashboardOpen = () => {
//     this.setState({
//       dashboard: true,
//       expense: false,
//       income: false,
//       config: false,
//       user: false,
//       report: false
//     })
//   }

//   expenseOpen = () => {
//     this.setState({
//       dashboard: false,
//       expense: true,
//       income: false,
//       config: false,
//       user: false,
//       report: false
//     })
//   }

//   incomeOpen = () => {
//     this.setState({
//       dashboard: false,
//       expense: false,
//       income: true,
//       config: false,
//       user: false,
//       report: false
//     })
//   }

//   configOpen = () => {
//     this.setState({
//       dashboard: false,
//       expense: false,
//       income: false,
//       config: true,
//       user: false,
//       report: false
//     })
//   }

//   userOpen = () => {
//     this.setState({
//       dashboard: false,
//       expense: false,
//       income: false,
//       config: false,
//       user: true,
//       report: false
//     })
//   }

//   reportOpen = () => {
//     this.setState({
//       dashboard: false,
//       expense: false,
//       income: false,
//       config: false,
//       user: false,
//       report: true
//     })
//   }

//   render() {
//     let renderComponent = <Dashboard/>
//     if(this.state.expense){
//       renderComponent = <Expense/>
//     }
//     if(this.state.income){
//       renderComponent = <Income/>
//     }
//     if(this.state.config){
//       renderComponent = <Config/>
//     }
//     if(this.state.user){
//       renderComponent = <User/>
//     }
//     if(this.state.report){
//       renderComponent = <Report/>
//     }
    
//     return (
//       <Layout style={{ minHeight: '100vh' }}>
//         <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
//           <div className="logo" />
//           <Avatar size={64} icon="user" />
//           <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
//             <Menu.Item key="1" onClick={() => this.dashboardOpen()}>
//               <Icon type="dashboard" />
//               <span>Dashboard</span>
//             </Menu.Item>
//             <Menu.Item key="2" onClick={() => this.expenseOpen()}>
//               <Icon type="euro"/>
//               <span>Expense</span>
//             </Menu.Item>
//             <Menu.Item key="3" onClick={() => this.incomeOpen()}>
//               <Icon type="fund" />
//               <span>Income</span>
//             </Menu.Item>
//             <Menu.Item key="4" onClick={() => this.configOpen()}>
//               <Icon type="setting" />
//               <span>Config</span>
//             </Menu.Item>
//             <Menu.Item key="5" onClick={() => this.userOpen()}>
//               <Icon type="user" />
//               <span>User</span>
//             </Menu.Item>
//             <Menu.Item key="6" onClick={() => this.reportOpen()}>
//               <Icon type="book" />
//               <span>Report</span>
//             </Menu.Item>
//             <Menu.Item key="7">
//               <Icon type="logout" />
//               <span>Log out</span>
//             </Menu.Item>
//             {/* <SubMenu
//               key="sub1"
//               title={
//                 <span>
//                   <Icon type="user" />
//                   <span>User</span>
//                 </span>
//               }
//             >
//               <Menu.Item key="3">Tom</Menu.Item>
//               <Menu.Item key="4">Bill</Menu.Item>
//               <Menu.Item key="5">Alex</Menu.Item>
//             </SubMenu>
//             <SubMenu
//               key="sub2"
//               title={
//                 <span>
//                   <Icon type="team" />
//                   <span>Team</span>
//                 </span>
//               }
//             >
//               <Menu.Item key="6">Team 1</Menu.Item>
//               <Menu.Item key="8">Team 2</Menu.Item>
//             </SubMenu>
//             <Menu.Item key="9">
//               <Icon type="file" />
//               <span>File</span>
//             </Menu.Item> */}
//           </Menu>
//         </Sider>
//         {/* <Layout>
//           <Header style={{ background: '#fff', padding: 0 , fontWeight: 'bold'}}>
//             <h1 style={{marginLeft: "3%"}}>Accounting System</h1>
//           </Header>
//           <Content style={{ margin: '0 16px' ,marginTop: "4%" }}>
//             <Breadcrumb style={{ margin: '16px 0' }}>
//               <Breadcrumb.Item>User</Breadcrumb.Item>
//               <Breadcrumb.Item>Bill</Breadcrumb.Item>
//             </Breadcrumb>
//             <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
//               {renderComponent}
//             </div>
//           </Content>
//           <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
//         </Layout> */}
//       </Layout>
//     );
//   }
// }
// export default SiderDemo;