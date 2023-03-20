import React from "react";
import { Outlet } from "react-router-dom";
import Post from "../post";

type Props = {};

const HomePage = (props: Props) => {
  return (
    <>
      <Post />
    </>
  );
};

export default HomePage;
