import React, { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";
import Option from "./Option";
import Select from "./Select";

interface DropdownBoudaryProps {
  children: ReactNode;
}

interface DropdownProps extends DropdownBoudaryProps {
  Select?: typeof Select;
  Option?: typeof Option;
}

const Dropdown = ({ children }: DropdownBoudaryProps & DropdownProps) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};

Dropdown.Select = Select;

export default Dropdown;
