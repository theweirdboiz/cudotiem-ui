import React from "react";
import { Link } from "react-router-dom";

type Props = {};

const Post = (props: Props) => {
  return (
    <>
      <Link to="" className="rounded">
        <img
          src="https://salt.tikicdn.com/cache/280x280/ts/product/5e/18/24/2a6154ba08df6ce6161c13f4303fa19e.jpg.webp"
          alt=""
        />
      </Link>
    </>
  );
};

export default Post;
