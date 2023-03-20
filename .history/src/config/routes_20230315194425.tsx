// const routes = {
//   home: "/",
//   buy: "/",
//   post: "/dang-tin",
//   profile: "/@:nickname",
// };

import { ReactJSXElement } from "@emotion/react/types/jsx-namespace";
import { ReactNode } from "react";

export type RouteType = {
  element: ReactNode;
  state: string;
  index?: boolean;
  path?: string;
  child?: RouteType[];
  layout?: ReactJSXElement;
  sidebarProps?: {
    displayText: string;
    icon?: ReactNode;
  };
};
