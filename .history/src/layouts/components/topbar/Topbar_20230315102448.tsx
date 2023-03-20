import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";

function Topbar() {
  return (
    <AppBar
      sx={{
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar
        sx={{
          width: size.topbar.width.lg,
          mx: "auto",
        }}
      >
        <h1>123</h1>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
