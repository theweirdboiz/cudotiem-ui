import { Fragment } from "react";
import { RouteType } from "../config/routes";
import PostPage from "../pages/post";

import DefaultLayout from "../layouts/DefaultLayout";
import HomePage from "../pages/home/HomePage";
import HomeLayout from "../layouts/HomeLayout";
import ToyPage from "../pages/toy";
import { PostAddNewPage } from "../module";

const publicRoutes: RouteType[] = [
  {
    path: "/",
    element: <HomePage />,
    layout: HomeLayout,
  },
  {
    path: "/post",
    element: <PostPage />,
    layout: DefaultLayout,
    sidebarProps: {
      displayText: "Quản lý tin",
    },
  },
  {
    path: "/",
    element: <ToyPage />,
    layout: DefaultLayout,
    child: [
      {
        path: "/manage",
        element: <PostAddNewPage />,
        layout: HomeLayout,
      },
    ],
  },
];

export { publicRoutes };
