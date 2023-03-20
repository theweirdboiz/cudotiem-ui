import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";

type Props = {};

function Topbar({}: Props) {
  return (
    <AppBar
      sx={{
        boxShadow: "unset",
        backgroundColor: colorConfigs.topbar.bg,
        color: colorConfigs.topbar.color,
      }}
    >
      <Toolbar>
        <Typography variant="h6">Cu do tiem store</Typography>
      </Toolbar>
    </AppBar>
  );
}

export default Topbar;
