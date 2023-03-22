import React from "react";
import { Link } from "react-router-dom";

type SidebarProps = {
  [key: string]: any;
};

const Sidebar = (SidebarProps: SidebarProps) => {
  return (
    <aside className="w-[210px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px] font-medium scrollbar-hide bg-white rounded-lg">
      <div className="flex flex-col mb-4 px-2 py-3 rounded-lg bg-white">
        <Link
          to="/manage/add-post"
          className="flex-center py-2 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60"
        >
          <div className="mr-2 basis-8 h-8 border border-gray-200 rounded-xl overflow-hidden">
            <picture>
              <img
                src="https://salt.tikicdn.com/cache/100x100/ts/upload/08/2f/14/fd9d34a8f9c4a76902649d04ccd9bbc5.png.webp
              "
                alt="Giá tốt mỗi ngày"
                width={32}
                height={32}
              />
            </picture>
          </div>
          <span>Bán hàng cùng tôi</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
