import React from "react";
import { Box, Toolbar } from "@mui/material";
import size from "../../config/sizes";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import colorConfigs from "../../config/colors";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <>
      <Topbar />
    </>
  );
};

export default DefaultLayout;
