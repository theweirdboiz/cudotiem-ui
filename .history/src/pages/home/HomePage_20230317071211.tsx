import React from "react";
import { Outlet } from "react-router-dom";
import { Post } from "../../components";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <section className="p-3 rounded-md bg-white mb-5">
        <h3 className="text-base font-bold mb-5">Gợi ý hôm nay</h3>
        <div className="grid grid-cols-6 mb-2">
          <div className="flex flex-col">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              width={40}
              height={40}
              className="transition-all duration-300 ease-linear"
            />
            <span className="mt-1">Dành cho bạn</span>
          </div>
        </div>
        <div className="grid grid-cols-6 gap-x-5">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="box-center mt-5">
          <button className="px-16 py-1.5 rounded-md border border-current text-blue-500 hover:bg-blue-100 font-medium">
            Xem thêm
          </button>
        </div>
      </section>
    </>
  );
};

export default HomePage;
