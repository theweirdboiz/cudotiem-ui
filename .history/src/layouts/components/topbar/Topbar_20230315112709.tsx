import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";
import { Link } from "react-router-dom";

import Search from "./components/search";

type Props = {};

function Topbar({}: Props) {
  return (
    <header className="py-2 text-[14px]">
      <div className="w-[1280px] px-6 mx-auto">
        <div className="flex-center">
          {/* left */}
          <div className="flex-center flex-1">
            <div className="flex-center justify-center  mr-12">
              <Link to="/" className="block w-14 h-10">
                <img
                  src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
                  alt="logo"
                />
              </Link>
            </div>
            {/* search */}
            <div className="flex-1">
              <Search />
            </div>
          </div>
          {/* right */}
          <div className="flex-center ml-12 text-gray-500 font-normal">
            <div className="flex-center px-4 py-2 cursor-pointer">
              <img
                src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                alt=""
                className="w-6 h-6 mr-1"
              />
              <Link to="/">Trang chủ</Link>
            </div>
            <div className="flex-center px-4 py-2 cursor-pointer">
              <img
                src="https://salt.tikicdn.com/ts/upload/07/d5/94/d7b6a3bd7d57d37ef6e437aa0de4821b.png"
                alt=""
                className="w-6 h-6 mr-1"
              />
              <Link to="/">Tài khoản</Link>
            </div>
            <div className="flex-center px-4 py-2 cursor-pointer">
              <Link to="/checkout/cart">
                <div className="box-center ml-6 relative after:absolute after:content-[''] after:h-5 after:-left-3 after:border after:border-gray-200">
                  <div className="box-center w-10 h-10 relative">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                      alt="header cart"
                      className="w-6 h-6"
                    />
                    <span className="absolute bg-red-500 rounded-lg inline-block right-0 -top-1 px-[3.5px] py-[0.5px] text-[10px] text-white">
                      0
                    </span>
                  </div>
                </div>
              </Link>
            </div>
          </div>
        </div>
        <div className=""></div>
      </div>
    </header>
  );
}

export default Topbar;
