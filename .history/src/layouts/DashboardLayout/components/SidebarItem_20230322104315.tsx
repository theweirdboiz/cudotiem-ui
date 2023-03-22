import React, { ReactNode } from "react";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: Props) => {
  return (
    <div className={`${props.classNames} transition-all duration-100`}>
      {props.children}
    </div>
  );
};

export default SidebarItem;
