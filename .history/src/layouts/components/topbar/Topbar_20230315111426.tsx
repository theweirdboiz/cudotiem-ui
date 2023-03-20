import React from "react";
import { AppBar, Typography, Toolbar } from "@mui/material";
import size from "../../../config/sizes";
import colorConfigs from "../../../config/colors";
import { Link } from "react-router-dom";

type Props = {};

function Topbar({}: Props) {
  return (
    <header className="py-2 text-[14px]">
      <div className="w-[1280px] px-6 mx-auto">
        <div className="flex-center">
          {/* left */}
          <div className="flex-center">
            <div className="flex-center justify-center  mr-12">
              <Link to="/" className="block w-14 h-10">
                <img
                  src="https://salt.tikicdn.com/ts/upload/e4/49/6c/270be9859abd5f5ec5071da65fab0a94.png"
                  alt="logo"
                />
              </Link>
            </div>
            <div>
              <div className="flex-center border border-gray-200 rounded-lg">
                <img
                  src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
                  alt="icon-search"
                  className="w-5 h-5 ml-4"
                />
                <input
                  type="text"
                  placeholder="Bạn tìm gì hôm nay"
                  className="px-2 outline-none border-none"
                />
                <button
                  className="flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg
                "
                >
                  Tìm kiếm
                </button>
                {/* <div className=""></div> */}
              </div>
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
                src="https://salt.tikicdn.com/ts/upload/b4/90/74/6baaecfa664314469ab50758e5ee46ca.png"
                alt=""
                className="w-6 h-6 mr-1"
              />
              <Link to="/">Tài khoản</Link>
            </div>
            <div className="flex-center px-4 py-2 cursor-pointer">
              <Link to="/checkout/cart">
                <div className="box-center ml-6">
                  <div className="box-center w-10 h-10 relative">
                    <img
                      src="https://salt.tikicdn.com/ts/upload/51/e2/92/8ca7e2cc5ede8c09e34d1beb50267f4f.png"
                      alt="header cart"
                      className="w-6 h-6"
                    />
                    <span className="absolute bg-red-500 rounded-lg inline-block right-0 top-0 px-1 py-[0.5px]">
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
