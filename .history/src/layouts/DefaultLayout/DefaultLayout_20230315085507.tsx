import React from "react";
import { Box } from "@mui/material";
import size from "../../config/sizes";
import Sidebar from "../components/sidebar";

const DefaultLayout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <Box component="nav" sx={{ width: size.sidebar.width, flexShrink: 0 }}>
        <Sidebar />
      </Box>
    </Box>
  );
};

export default DefaultLayout;
