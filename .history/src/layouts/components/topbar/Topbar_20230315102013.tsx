import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";

function Topbar() {
  return (
    <header className="py-2">
      <div
        className={`
        mx-auto w-["${size.topbar.width.lg}"]
    `}
      >
        header
      </div>
    </header>
  );
}

export default Topbar;
