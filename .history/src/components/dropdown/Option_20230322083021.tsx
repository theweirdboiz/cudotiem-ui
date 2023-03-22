import React from "react";
import { useDropdown } from "./dropdown-context";

type Props = {
  [key: string]: any;
};

const Option = ({ ...props }: Props) => {
  const { onClick } = props;
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-3 px-4 cursor-pointer flex-center justify-between hover:text-blue-400 transition-all text-sm font-semibold"
      onClick={handleClick}
    >
      {props.children}
    </div>
  );
};

export default Option;
