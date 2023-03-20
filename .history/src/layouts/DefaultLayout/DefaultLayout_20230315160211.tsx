import React from "react";
import { Box, Toolbar } from "@mui/material";
import size from "../../config/sizes";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import colorConfigs from "../../config/colors";
import { Link, Outlet } from "react-router-dom";
import AdsTop from "../components/ads";

const DefaultLayout = () => {
  return (
    <>
      <Topbar />
      <AdsTop />
    </>
  );
};

export default DefaultLayout;
