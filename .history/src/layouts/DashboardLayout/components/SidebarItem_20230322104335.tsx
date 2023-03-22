import React, { ReactNode } from "react";
import { Link } from "react-router-dom";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: Props) => {
  return (
    <div className={`${props.classNames} transition-all duration-100`}>
      <Link> {props.children}</Link>
    </div>
  );
};

export default SidebarItem;
