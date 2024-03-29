import React from "react";
import { DashboardSearchProps } from "./type";

const DashboardSearch = (props: DashboardSearchProps) => {
  const { handleSearch } = props;
  return (
    <div className="flex-center border border-gray-200 w-full max-w-xl rounded-lg relative">
      <img
        src="https://salt.tikicdn.com/ts/upload/33/d0/37/6fef2e788f00a16dc7d5a1dfc5d0e97a.png"
        alt="icon-search"
        className="w-5 h-5 ml-4"
      />
      <input
        type="text"
        placeholder="Bạn tìm gì hôm nay"
        className="px-2 outline-none border-none flex-1"
        onChange={handleSearch}
      />
      <button className="flex-center justify-center w-24 h-9 bg-transparent text-blue-600 p-1  relative after:content-['']  after:absolute after:border-l after:border-l-gray-200 after:left-0 after:top-2 after:h-5 hover:bg-blue-100 rounded-r-lg">
        Tìm kiếm
      </button>
    </div>
  );
};

export default DashboardSearch;
