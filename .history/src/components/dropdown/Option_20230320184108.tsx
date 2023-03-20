import React, { ReactNode } from "react";
import { useDropdown } from "./dropdown-context";

interface OptionProps {
  children: ReactNode;
  onClick?: () => void;
}

const Option = ({ children, onClick }: OptionProps) => {
  const { setShow } = useDropdown();
  const handleClick = () => {
    onClick && onClick();
    setShow(false);
  };
  return (
    <div
      className="py-4 px-5 cursor-pointer flex items-center justify-between hover:text-primary transition-all text-sm"
      onClick={handleClick}
    >
      {children}
    </div>
  );
};

export default Option;
