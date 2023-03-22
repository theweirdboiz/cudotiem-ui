import React, { ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";

type Props = {
  [key: string]: any;
};

const SidebarItem = ({ ...props }: Props) => {
  return (
    <div className={`${props.classNames} transition-all duration-100`}>
      <NavLink to="/"> {props.children}</NavLink>
    </div>
  );
};

export default SidebarItem;
