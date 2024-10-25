import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./SideBar.css";
import logo from "../../../assets/imgs/yalla logo.png";
import { Link } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import { RiShieldUserLine } from "react-icons/ri";
import { CiShop } from "react-icons/ci";
import { TiClipboard } from "react-icons/ti";
import { RiCoupon2Line } from "react-icons/ri";
import { TfiWorld } from "react-icons/tfi";
import { FaRegEnvelope } from "react-icons/fa";
import { FaRegImages } from "react-icons/fa";
import { MdOutlinePaid } from "react-icons/md";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { FaArrowsLeftRight } from "react-icons/fa6";
import { LuTimerReset } from "react-icons/lu";
import { MdOutlinePayment } from "react-icons/md";
import { MdPayments } from "react-icons/md";
// ----- ant --------

import { Breadcrumb, Layout, Menu, theme } from "antd";
const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(true);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const location = useLocation();
  const pathname = location.pathname.split("/").pop();

  // handle toggle sidebar
  const handleToggleSideBar = () => {
    setCollapsed(!collapsed);
  };

  const items = [
    getItem(
      "Dashboard",
      "dashboard",
      <Link to="/dashboard">
        <RiHome5Line />{" "}
      </Link>
    ),
    getItem(
      "Users",
      "users",
      <Link to="/users">
        <FaUsers />
      </Link>
    ),
    getItem(
      "Vendors",
      "vendors",
      <Link to="/vendors">
        <RiShieldUserLine />{" "}
      </Link>
    ),
    getItem(
      "Ads",
      "Ads",
      <Link to="/ads">
         <CiShop className="icon" />{" "}
      </Link>
    ),
    getItem(
      "Bookings",
      "Bookings",
      <Link to="/allBookings">
         <LuTimerReset className="icon" />{" "}
      </Link>
    ),
    getItem(
      "Payment",
      "Payment",
      <Link to="/payment">
        <MdOutlinePayment />{" "}
      </Link>
    ),
    getItem(
      "Withdraws",
      "Withdraws",
      <Link to="/withdraws">
        <MdPayments />{" "}
      </Link>
    ),
    getItem(
      "Add Banner",
      "banner",
      <Link to="/banner">
        <FaRegImages />{" "}
      </Link>
    ),
    getItem("Logout", "logout", <IoIosLogOut className="logout" />),
  ];

  return (
    <>
      <div className="sidebar flex-row">
        <div className="container flex-col">
          <div className="top flex-col">
            <div className="logo">
              <img src={logo} />
            </div>
            <div className="links flex-col">
              <Link
                to="/dashboard"
                className={`flex-row link transition ${
                  pathname === "dashboard" && "active"
                }`}
              >
                <RiHome5Line className="icon" />
                <span>Dashboard</span>
              </Link>
              <Link
                to="/users"
                className={`flex-row link transition ${
                  pathname === "users" && "active"
                }`}
              >
                <FaUsers className="icon" />
                <span>Users</span>
              </Link>
              <Link
                to="/vendors"
                className={`flex-row link transition ${
                  pathname === "vendors" && "active"
                }`}
              >
                <RiShieldUserLine className="icon" />
                <span>Vendors</span>
              </Link>
              <Link
                to="/ads"
                className={`flex-row link transition ${
                  pathname === "ads" && "active"
                }`}
              >
                <CiShop className="icon" />
                <span>Ads</span>
              </Link>
              <Link
                to="/allBookings"
                className={`flex-row link transition ${
                  pathname === "allBookings" && "active"
                }`}
              >
                <LuTimerReset className="icon" />
                <span>Bookings</span>
              </Link>

              <Link
                to="/payment"
                className={`flex-row link transition ${
                  pathname === "payment" && "active"
                }`}
              >
                <MdOutlinePayment className="icon" />
                <span>Payment</span>
              </Link>
              <Link
                to="/withdraws"
                className={`flex-row link transition ${
                  pathname === "withdraws" && "active"
                }`}
              >
                <MdPayments className="icon" />
                <span>WithDraws</span>
              </Link>
            </div>
          </div>
          <div className="down flex-col">
            <div className="links flex-col">
              <Link
                to="/banner"
                className={`flex-row link transition ${
                  pathname === "banner" && "active"
                }`}
              >
                <FaRegImages className="icon" />
                <span>Add Banner</span>
              </Link>

              <Link className="flex-row link transition logout">
                <IoIosLogOut className="icon" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        style={{
          backgroundColor: "#272D35",
          borderRadius: "10px",
          padding: " 20px 0",
        }}
        className="small-sider"
      >
        <div className="demo-logo-vertical" />

        <Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={items}
          style={{ backgroundColor: "#272D35" }}
        />
      </Sider>
    </>
  );
}
