import React, { ReactNode } from "react";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: Props) => {
  return <div>{props.children}</div>;
};

export default SidebarItem;
