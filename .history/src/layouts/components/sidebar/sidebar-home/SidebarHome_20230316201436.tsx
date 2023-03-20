import React from "react";
import { Link } from "react-router-dom";

type Props = {};

type ISidebarItem = {
  id: number;
  path?: string;
  imgUrl?: string;
  name: string;
};

const featuredSidebarItems: ISidebarItem[] = [
  {
    id: 1,
    path: "/do-choi",
    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp",
    name: "Giá tốt mỗi ngày",
  },
  {
    id: 2,
    path: "/do-choi",

    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png.webp",
    name: "Mã giảm giá",
  },
  {
    id: 3,
    path: "/do-choi",

    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
    name: "Ưu đãi Affiliate",
  },
];
const categorySidebarItems: ISidebarItem[] = [
  {
    id: 1,
    path: "/do-choi",

    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/00/5d/97/384ca1a678c4ee93a0886a204f47645d.png.webp",
    name: "Giá tốt mỗi ngày",
  },
  {
    id: 2,
    path: "/do-choi",

    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/55/5b/80/48cbaafe144c25d5065786ecace86d38.png.webp",
    name: "Mã giảm giá",
  },
  {
    id: 3,
    path: "/do-choi",

    imgUrl:
      "https://salt.tikicdn.com/cache/100x100/ts/category/13/64/43/226301adcc7660ffcf44a61bb6df99b7.png.webp",
    name: "Ưu đãi Affiliate",
  },
];

const SidebarHome: React.FC = (props: Props): JSX.Element => {
  return (
    <aside className="w-[230px] max-h-screen sticky overflow-y-scroll top-4 bg-transparent flex flex-col text-gray-800 text-[14px] scrollbar-hide">
      <div className="flex flex-col mb-4 px-2 py-3 rounded-lg bg-white">
        <h4 className="font-medium">Nổi bật</h4>
        {featuredSidebarItems.map((item) => {
          return (
            <Link
              key={item.id}
              to="/"
              className="flex-center py-2 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60"
            >
              <div className="mr-2 basis-8 h-8 border border-gray-200 rounded-xl overflow-hidden">
                <picture>
                  <img
                    src={item.imgUrl}
                    alt="Giá tốt mỗi ngày"
                    width={32}
                    height={32}
                  />
                </picture>
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col mb-4 px-2 py-3 rounded-lg bg-white">
        <h4>Danh mục</h4>
        {categorySidebarItems.map((item) => {
          return (
            <Link
              key={item.id}
              to={item.path || "/"}
              className="flex-center py-2 px-4 rounded-lg transition-all duration-300 ease-linear hover:bg-gray-300 hover:bg-opacity-60"
            >
              <div className="mr-2 basis-8 h-8 border border-gray-200 rounded-xl overflow-hidden">
                <picture>
                  <img
                    src={item.imgUrl}
                    alt="Giá tốt mỗi ngày"
                    width={32}
                    height={32}
                  />
                </picture>
              </div>
              <span>{item.name}</span>
            </Link>
          );
        })}
      </div>
      <div className="flex flex-col mb-4 px-2 py-3 rounded-lg bg-white">
        <Link
          to="/"
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

export default SidebarHome;
