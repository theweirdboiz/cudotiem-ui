// const routes = {
//   home: "/",
//   buy: "/",
//   post: "/dang-tin",
//   profile: "/@:nickname",
// };

import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode;
  state: string;
  index?: boolean;
  path?: string;
  child?: RouteType[];
  layout?: string;
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
};
