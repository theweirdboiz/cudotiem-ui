import { Fragment } from "react";
import { RouteType } from "../config/routes";
const publicRoutes: RouteType[] = [
  {
    index: true,
    element: <Fragment />,
    state: "home",
  },
];

export { publicRoutes };
