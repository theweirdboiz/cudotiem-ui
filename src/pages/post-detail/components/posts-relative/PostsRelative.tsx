import React from "react";
import { Post } from "~/components";

type Props = {};

const PostsRelative = (props: Props) => {
  return (
    <div className="grid grid-cols-5">
      <Post />
      <Post />
      <Post />
      <Post />
      <Post />
    </div>
  );
};

export default PostsRelative;
