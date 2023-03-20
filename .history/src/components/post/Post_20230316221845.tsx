import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Post = (props: Props) => {
  return (
    <>
      <Link to="" className="rounded bg-white">
        <div className="w-40 h-40 relative">
          <img
            src="https://salt.tikicdn.com/cache/280x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp"
            alt=""
            className="absolute top-0 left-0 z-10"
          />
          <div className="relative w-full pb-[100%]"></div>
        </div>
      </Link>
    </>
  );
};

export default Post;
