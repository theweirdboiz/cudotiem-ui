import React, { ReactNode } from "react";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: { children: ReactNode }) => {
  console.log(children);

  return <div>{children}</div>;
};

export default SidebarItem;
