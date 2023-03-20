import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";
import { Link } from "react-router-dom";

type Props = {};

function Topbar({}: Props) {
  return (
    <header className="py-2">
      <div className="lg:max-w-[1440px] px-6 mx-auto">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center">
              <Link to="/" className="block w-14 h-10">
                <img
                  src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
                  alt="logo"
                />
              </Link>
            </div>
          </div>
          <div className="flex items-center"></div>
        </div>
        <div className=""></div>
      </div>
    </header>
  );
}

export default Topbar;
