import { createElement, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Input, Avatar } from "antd";
import { layoutItem } from "./layout-item";
import { UserOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
import Logo from "../../assets/svg/site-logo.svg";
import { Link } from "react-router-dom";

export const AdminLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  const menu = layoutItem.map((item: any, index: number) => {
    return {
      key: index,
      icon: createElement(item.icon),
      label: <Link to={item?.path || "#"}>{<p style={{ fontWeight: '500', fontSize: "18px" }}>{item?.title}</p>}</Link>,

      children: item.children?.length
        ? item.children.map((innerItem: any) => ({
            key: innerItem.path,
            label: <Link to={innerItem.path}>{innerItem.title}</Link>,
          }))
        : undefined,
    };
  });

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding: "16px 0",
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: 24 }}>
          <img
            src={Logo}
            alt="Logo"
            style={{ width: collapsed ? 32 : 120, transition: "0.3s" }}
          />
        </div>

        {/* Menu */}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["1"]}
          items={menu}
        />
      </Sider>

      <Layout>
        <Header
          style={{
            background: "#fff",
            padding: "0 24px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: "16px",
              }}
            />
            <Input.Search placeholder="Qidiruv tizimi..." allowClear />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <Avatar icon={<UserOutlined />} />
            <span>Ruslan Mirzaev</span>
          </div>
        </Header>

        {/* Content */}
        <Content
          style={{
            padding: 24,
            minHeight: 280,
            background: "#F9F9F9",
          }}
        ></Content>
      </Layout>
    </Layout>
  );
};
