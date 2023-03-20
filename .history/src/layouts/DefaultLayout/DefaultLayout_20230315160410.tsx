import React from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Link, Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Topbar />
    </>
  );
};

export default DefaultLayout;
