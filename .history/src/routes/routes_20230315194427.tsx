import { Fragment } from "react";
import { RouteType } from "../config/routes";
import PostPage from "../pages/post";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import DefaultLayout from "../layouts/DefaultLayout";

const publicRoutes: RouteType[] = [
  {
    path: "/post",
    element: <PostPage />,
    state: "post",
    layout: DefaultLayout,
    sidebarProps: {
      displayText: "Quản lý tin",
      icon: <AssignmentOutlinedIcon />,
    },
  },
];

export { publicRoutes };
