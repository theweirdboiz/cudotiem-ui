import React from "react";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import { Link, Outlet } from "react-router-dom";
import { AdsTop } from "../components/ads";

const DefaultLayout = () => {
  return (
    <>
      <Topbar />
      <AdsTop />
    </>
  );
};

export default DefaultLayout;
