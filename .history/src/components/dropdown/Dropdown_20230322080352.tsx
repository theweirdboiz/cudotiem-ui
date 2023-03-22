import React, { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";
import Select from "./Select";

interface DropdownType {
  children: React.ReactNode;
}
interface DropdownWithSelectAndOption extends DropdownType {
  Select: typeof Select;
}

const Dropdown: React.FC<DropdownType> & DropdownWithSelectAndOption = ({
  children,
}) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};
export default Dropdown;
