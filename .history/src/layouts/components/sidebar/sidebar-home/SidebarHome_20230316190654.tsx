import React from "react";

type Props = {};

const SidebarHome = (props: Props) => {
  return (
    <aside className="w-[230px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px]">
      <div className="">
        <h4>Nổi bật</h4>
      </div>
      <div className="">
        <h4>Danh mục</h4>
      </div>
      <div className=""></div>
    </aside>
  );
};

export default SidebarHome;
