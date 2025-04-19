import React, { createElement, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Input, Avatar } from "antd";
import { layoutItem } from "./layout-item";
import { UserOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
import Logo from "../../assets/svg/site-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { SettingsIcon } from "../../assets/components/settings-icon";
import LogoutIcon from "../../assets/components/logout-icon";
import { useAuthStore } from "../../store/use-auth-store";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { logOut, user } = useAuthStore();

  const navigate = useNavigate();
  const menu = layoutItem.map((item: any, index: number) => {
    return {
      key: index,
      icon:
        // <button style={{ display: "inline", margin: "0 auto", textAlign: 'center'}}>
        createElement(item.icon),
      // {/* </button> */}
      label: (
        <Link to={item?.path || "#"}>
          {<p style={{ fontWeight: "500", fontSize: "18px" }}>{item?.title}</p>}
        </Link>
      ),

      children: item.children?.length
        ? item.children.map((innerItem: any) => ({
            key: innerItem.path,
            label: <Link to={innerItem.path}>{innerItem.title}</Link>,
          }))
        : undefined,
    };
  });

  const logoutFn = () => {
    logOut();
    navigate("/login");
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: 'hidden'}}>
      {/* Sidebar */}
      <Sider
        theme="light"
        trigger={null}
        collapsible
        collapsed={collapsed}
        style={{
          padding: "16px 0",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#fff",
        }}
      >
        {/* Logo */}
        <div
          style={{
            textAlign: "center",
            marginBottom: 24,
            backgroundColor: "#fff",
          }}
        >
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
          defaultSelectedKeys={["0"]}
          items={menu}
          style={{ backgroundColor: "#fff" }}
        />

        <div style={{ marginTop: "auto", padding: "0 16px" }}>
          <div style={{ padding: "12px 0" }}>
            <Link to="/settings">
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <SettingsIcon />
                {!collapsed && <span>Sozlamalar</span>}
              </div>
            </Link>
          </div>
          <div style={{ padding: "12px 0" }}>
            <Button variant="outlined" onClick={logoutFn}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <LogoutIcon />
                {!collapsed && <span>Chiqish</span>}
              </div>
            </Button>
          </div>
        </div>
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

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Avatar icon={<UserOutlined />} />
            <div>
              <p
                className="header__name_text"
                style={{
                  lineHeight: "none",
                  fontWeight: "600",
                  fontSize: "18px",
                }}
              >
                {user?.full_name}
              </p>
              <p className="header__name_text" style={{ lineHeight: "none" }}>
                {user?.role}
              </p>
            </div>
          </div>
        </Header>

        <Content
          style={{
            height: 'calc(100vh - 64px)',
            overflowY: 'auto'
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
