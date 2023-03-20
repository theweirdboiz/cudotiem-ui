import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";

type Props = {};

function Topbar({}: Props) {
  return (
    <header className="py-2">
      <div className="container px-6">
        <div className="flex items-center">
          <div className="flex items-center"></div>
          <div className="flex items-center"></div>
        </div>
        <div className=""></div>
      </div>
    </header>
  );
}

export default Topbar;
