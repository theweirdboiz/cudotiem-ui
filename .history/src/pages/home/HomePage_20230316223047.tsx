import React from "react";
import { Outlet } from "react-router-dom";
import { Post } from "../../components";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <section>
      <h3>Tin nổi bật</h3>
      <div className="grid grid-cols-6 gap-x-5">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
    </section>
  );
};

export default HomePage;
