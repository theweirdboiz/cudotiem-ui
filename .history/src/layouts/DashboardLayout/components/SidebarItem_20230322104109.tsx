import React, { ReactNode } from "react";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: Props) => {
  return <div className={`${props.classNames}`}>{props.children}</div>;
};

export default SidebarItem;
