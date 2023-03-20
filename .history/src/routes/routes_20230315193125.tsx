import { Fragment } from "react";
import { RouteType } from "../config/routes";
import PostPage from "../pages/post";

import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

const publicRoutes: RouteType[] = [
  {
    path: "/post",
    element: <PostPage />,
    state: "post",
    sidebarProps: {
      displayText: "Quản lý tin",
      icon: <AssignmentOutlinedIcon />,
    },
  },
];

export { publicRoutes };
