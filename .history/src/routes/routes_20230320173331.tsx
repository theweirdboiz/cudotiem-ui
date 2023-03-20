import { Fragment } from "react";
import { RouteType } from "../config/routes";
import PostPage from "../pages/post";

import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/home/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import ToyPage from "../pages/toy";

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <HomePage />,
    state: "home",
    layout: HomeLayout,
  },
  {
    path: "/post",
    element: <PostPage />,
    state: "post",
    layout: DefaultLayout,
    sidebarProps: {
      displayText: "Quản lý tin",
    },
  },
  {
    path: "/",
    element: <ToyPage />,
    state: "toy",
    layout: DefaultLayout,
  },
];

export { publicRoutes };
