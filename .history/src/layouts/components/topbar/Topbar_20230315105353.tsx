import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";
import { Link } from "react-router-dom";

type Props = {};

function Topbar({}: Props) {
  return (
    <header className="py-2">
      <div className="w-[1280px] px-6 mx-auto">
        <div className="flex items-center">
          <div className="flex items-center">
            <div className="flex items-center justify-center  mr-12">
              <Link to="/" className="block w-14 h-10">
                <img
                  src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <div className="flex items-center border border-gray-200 rounded-lg">
                <img
                  src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                  alt="icon-search"
                  className="w-5 h-5 ml-4"
                />
                <input
                  type="text"
                  placeholder="Bạn tìm gì hôm nay"
                  className="px-2 outline-none border-none placeholder:text-[14px]"
                />
                <button
                  className="flex items-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1 text-[14px] relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-lg
                "
                >
                  Tìm kiếm
                </button>
                {/* <div className=""></div> */}
              </div>
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
