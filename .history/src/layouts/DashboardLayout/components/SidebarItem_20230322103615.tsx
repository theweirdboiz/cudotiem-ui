import React, { ReactNode } from "react";

type Props = {};

const SidebarItem = ({ children }: { children: ReactNode }) => {
  console.log(children);

  return <div>{children}</div>;
};

export default SidebarItem;
