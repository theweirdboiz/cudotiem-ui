import React from "react";
import { Outlet } from "react-router-dom";
import { Post } from "../../components";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <section className="p-3 rounded-md bg-white mb-5">
        <h3 className="text-base font-bold mb-5">Tin nổi bật</h3>
        <div className="grid grid-cols-6 gap-x-5">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
        <div className="box-center mt-2">
          <button className="px-10 py-1 rounded-lg border border-current text-blue-500">
            Xem thêm
          </button>
        </div>
      </section>
      <section className="p-3 rounded-md bg-white mb-5">
        <h3 className="text-base font-bold mb-5">Tin nổi bật</h3>
        <div className="grid grid-cols-6 gap-x-5">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
      <section className="p-3 rounded-md bg-white mb-5">
        <h3 className="text-base font-bold mb-5">Tin nổi bật</h3>
        <div className="grid grid-cols-6 gap-x-5">
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </>
  );
};

export default HomePage;
