import React from "react";
import { AppBar, Typography } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";

type Props = {};

function Topbar({}: Props) {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${size.sidebar.width})`,
        ml: size.sidebar.width,
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Typography></Typography>
    </AppBar>
  );
}

export default Topbar;
