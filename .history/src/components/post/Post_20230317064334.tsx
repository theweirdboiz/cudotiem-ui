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
        <div className="py-2 px-3 bg-white">
          <h3 className="text-xs">Cay cam ngot cua toi</h3>
          <div className="flex-center">4.95 ty</div>
          <h5>2 phut truoc</h5>
          <h5>Tp.HCM</h5>
        </div>
      </Link>
    </>
  );
};

export default Post;
