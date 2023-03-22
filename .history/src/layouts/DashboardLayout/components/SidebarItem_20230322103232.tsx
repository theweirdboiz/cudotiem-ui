import React, { ReactNode } from "react";

type Props = {};

const SidebarItem = ({ children }: { children: ReactNode }) => {
  return <div>{children}</div>;
};

export default SidebarItem;
