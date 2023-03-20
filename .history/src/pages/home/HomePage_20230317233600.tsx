import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Post } from "../../components";
import ModalAdvanced from "../../components/modal/ModalAdvanced";

type Props = {};

const HomePage = (props: Props) => {
  const [open, setIsOpen] = useState(true);

  const handleSignInModal = () => {
    setIsOpen(false);
    document.body.removeChild(
      document.querySelector("#portal-wrapper") as Node
    );
  };

  return (
    <>
      <section className="rounded-md mb-5">
        <div className="bg-white rounded-md">
          <h3 className="text-base font-bold p-3">Gợi ý hôm nay</h3>
          <div className="grid grid-cols-6 mb-2 ">
            <div className="box-center flex-col text-blue-500 border-b border-b-blue-500 hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Dành cho bạn</span>
            </div>
            <div className="box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Áo nam</span>
            </div>
            <div className="box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Áo nữ</span>
            </div>
            <div className="box-center flex-col text-blue-500 border-b border-b-blue-500 hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Dành cho bạn</span>
            </div>
            <div className="box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Áo nam</span>
            </div>
            <div className="box-center flex-col text-gray-500 border-b border-b-transparent hover:bg-gray-200 cursor-pointer py-2 px-1">
              <img
                src="https://salt.tikicdn.com/cache/w100/ts/personalish/f9/27/b5/3a8e2286a1c8fb91b67acc5ee35f82f0.png.webp"
                alt=""
                width={40}
                height={40}
                className="transition-all duration-300 ease-linear"
              />
              <span className="mt-1 text-xs">Áo nữ</span>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-5 gap-2">
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

      <ModalAdvanced
        heading="Sign in"
        visible={open}
        handleClose={handleSignInModal}
      >
        <div className="bg-white p-3 rounded-md w-[320px]">this is text</div>
      </ModalAdvanced>
    </>
  );
};

export default HomePage;
