import React from "react";
import { Box, Toolbar } from "@mui/material";
import size from "../../config/sizes";
import Sidebar from "../components/sidebar";
import Topbar from "../components/topbar";
import colorConfigs from "../../config/colors";
import { Outlet } from "react-router-dom";

const DefaultLayout = () => {
  return (
    <Box>
      <Topbar />

      <Box sx={{ display: "flex" }}>
        <Box component="nav" sx={{ width: size.sidebar.width, flexShrink: 0 }}>
          <Sidebar />
        </Box>
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: `calc(100% - ${size.sidebar.width})`,
            minHeight: "100vh",
            bgcolor: colorConfigs.mainBg,
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultLayout;
