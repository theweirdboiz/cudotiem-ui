import React from "react";
import { Outlet } from "react-router-dom";
import { Post } from "../../components";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Post />
      <Post />
      <Post />
      <Post />
    </>
  );
};

export default HomePage;
