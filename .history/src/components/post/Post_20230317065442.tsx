import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Post = (props: Props) => {
  return (
    <>
      <Link
        to=""
        className="rounded-md border border-gray-100 bg-white hover:shadow-lg"
      >
        <div className="w-40 h-40 mt-3">
          <img
            src="https://salt.tikicdn.com/cache/280x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp"
            alt=""
            className=""
          />
        </div>
        <div className="py-2 px-3 bg-white text-gray-800">
          <h3 className="text-xs  mb-2">Cay cam ngot cua toi</h3>
          <h4 className=" font-semibold mb-1">
            495.000 <span className="underline">đ</span>
          </h4>
          <div className="flex items-center gap-x-2 text-[10px] text-gray-600">
            <img
              src="https://source.unsplash.com/random"
              alt=""
              className="rounded-full w-4 h-4"
            />
            <h5>2 phut truoc</h5>
            <h5>Tp.HCM</h5>
          </div>
        </div>
      </Link>
    </>
  );
};

export default Post;
