import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const SidebarHome = (props: Props) => {
  return (
    <aside className="w-[230px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px]">
      <div className="">
        <h4 className="font-medium">Nổi bật</h4>
        <Link
          to="/"
          className="flex-center py-2 px-4 rounded-lg transition-all duration-300 ease-linear"
        >
          <div className="mr-2 basis-8 h-8 border border-gray-500 rounded-2xl"></div>
          <span> Giá tốt mỗi ngày</span>
        </Link>
      </div>
      <div className="">
        <h4>Danh mục</h4>
      </div>
      <div className=""></div>
    </aside>
  );
};

export default SidebarHome;
