import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const SidebarHome = (props: Props) => {
  return (
    <aside className="w-[230px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px]">
      <div className="flex flex-col mb-4 px-2 py-3 rounded-lg bg-white">
        <h4 className="font-medium">Nổi bật</h4>
        <Link
          to="/"
          className="flex-center py-2 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300"
        >
          <div className="mr-2 basis-8 h-8 border border-gray-200 rounded-xl overflow-hidden">
            <picture>
              <img
                src="	https://salt.tikicdn.com/cache/100x100/ts/upload/3c/ce/96/db8c083610e45b78d8f7662f0013faa8.png.webp"
                alt="Giá tốt mỗi ngày"
                width={32}
                height={32}
              />
            </picture>
          </div>
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
