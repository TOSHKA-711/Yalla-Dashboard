import React from "react";
import "./Layout.css";
import NavBar from "../navbar/NavBar";
import SideBar from "../sidebar/SideBar";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="layout flex-row">
      <div className="flex-row flex-1 side-layout">
        <SideBar />
      </div>
      <div className="main-content flex-col ">
        <NavBar />
        <Outlet />
      </div>
    </div>
  );
}
