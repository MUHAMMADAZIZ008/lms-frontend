import React, { createElement, useEffect, useState } from "react";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Button, Layout, Menu, Input, Avatar, Modal } from "antd";
import { layoutItem } from "./layout-item";
import { UserOutlined } from "@ant-design/icons";

const { Header, Sider, Content } = Layout;
import Logo from "../../assets/svg/site-logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { SettingsIcon } from "../../assets/components/settings-icon";
import LogoutIcon from "../../assets/components/logout-icon";
import { useAuthStore } from "../../store/use-auth-store";
import { useGlobalSearch } from "../../store/use-global-search";
import { useDebounce } from "../../common/hook/use-debounce";

export const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localValue, setLocalValue] = useState("");
  const inputValue = useDebounce(localValue, 1000);

  useEffect(() => {
    setInputValue(inputValue);
  }, [inputValue]);

  const [collapsed, setCollapsed] = useState(false);
  const { logOut, user } = useAuthStore();
  const { setInputValue } = useGlobalSearch();

  const navigate = useNavigate();
  const menu = layoutItem.map((item: any, index: number) => {
    return {
      key: index,
      icon: createElement(item.icon),
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

  // modal
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    logOut();
    navigate("/login");
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Layout style={{ minHeight: "100vh", overflow: "hidden" }}>
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
            <Modal
              title="Tizimdan chiqishni tasdiqlash"
              open={isModalOpen}
              onOk={handleOk}
              onCancel={handleCancel}
              okText="Ha"
              cancelText="Bekor qilish"
            >
              <p>Tizimdan chiqishga ishonchingiz komilmi?</p>
            </Modal>
            <Button variant="outlined" onClick={showModal}>
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
            <Input.Search
              placeholder="Qidiruv tizimi..."
              allowClear
              onChange={(e) => setLocalValue(e.target.value)}
            />
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
            height: "calc(100vh - 64px)",
            overflowY: "auto",
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
