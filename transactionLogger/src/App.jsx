import React, { useState } from "react";

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

import {
  UserOutlined,
  UserAddOutlined,
  LoginOutlined,
  CloseSquareOutlined,
  MoneyCollectOutlined,
  FileAddOutlined,
  ExclamationOutlined,
  PieChartOutlined,
  BookOutlined,
} from "@ant-design/icons";

/* Auth Components */
import Register from "./Components/Auth/Register";
import Login from "./Components/Auth/Login";
import Profile from "./Components/Auth/Profile";

/* Transactions Components */
import AddTransaction from "./Components/Transactions/AddTransaction";
import AllTransaction from "./Components/Transactions/AllTransaction";
import Charts from "./Components/Transactions/Charts";

import { getItem } from "./js/constants";


const items = [
  getItem("User", "sub0", <UserOutlined />, [
    getItem("Register", "1", <UserAddOutlined />),
    getItem("Login", "2", <LoginOutlined />),
    getItem("Profile", "3", <LoginOutlined />),
    getItem("Log out", "-1", <CloseSquareOutlined />),
  ]),
  getItem("Transactions", "sub1", <MoneyCollectOutlined />, [
    getItem("Add Transaction", "4", <FileAddOutlined />),
    getItem("All Transactions", "5", <ExclamationOutlined />),
    getItem("Charts", "6", <PieChartOutlined />),
  ]),
];

const App = () => {
  /* Ver para refactorizar luego a un customhook */
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState("-1");
  const [breadCrum, setbreadCrum] = useState({
    type: "User",
    keyName: "Register",
  });
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const onMenuClick = (e) => {
    setSelectedKey(e.key);

    switch (e.key) {
      case "1":
        setbreadCrum({ type: "User", keyName: "Register" });
        break;
      case "2":
        setbreadCrum({ type: "User", keyName: "Login" });
        break;
      case "3":
        setbreadCrum({ type: "User", keyName: "Profile" });
        break;
      case "4":
        setbreadCrum({ type: "Transaction", keyName: "Add Transaction" });
        break;
      case "5":
        setbreadCrum({ type: "Transaction", keyName: "All Transaction" });
        break;
      case "6":
        setbreadCrum({ type: "Transaction", keyName: "Charts" });
        break;
      default:
        break;
    }
  };

  const renderContent = () => {
    switch (selectedKey) {
      case "-1":
        return <div>deslogearse</div>;
      case "1":
        return <Register />;
      case "2":
        return <Login />;
      case "3":
        return <Profile />;
      case "4":
        return <AddTransaction />;
      case "5":
        return <AllTransaction />;
      case "6":
        return <Charts />;
      default:
        return <div>Selecciona una opción</div>;
    }
  };

  /* Todo esto deberia ver si puede ir en otro custom hook */

  return (
    <Layout
      style={{
        minHeight: "100vh",
      }}
    >
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          onClick={onMenuClick}
        />
      </Sider>
      <Layout>
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
            justifyContent: "center",
          }}
        >
          <article className="">
            <BookOutlined style={{ fontSize: "1.5em", color: "#61059e" }} />
            <h1 className="title">Transaction Logger</h1>
          </article>
        </Header>

        <Content
          style={{
            margin: "0 16px",
          }}
        >
          <Breadcrumb
            style={{
              margin: "16px 0",
            }}
          >
            <Breadcrumb.Item>{breadCrum?.type}</Breadcrumb.Item>
            <Breadcrumb.Item>{breadCrum?.keyName}</Breadcrumb.Item>
          </Breadcrumb>

          <div
            style={{
              padding: 24,
              minHeight: 500,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
            }}
          >
            {renderContent()}
          </div>
        </Content>
        <Footer
          style={{
            textAlign: "center",
          }}
        >
          Transaction Logger © {new Date().getFullYear()} Created by Francisco
          Perez
        </Footer>
      </Layout>
    </Layout>
  );
};
export default App;
