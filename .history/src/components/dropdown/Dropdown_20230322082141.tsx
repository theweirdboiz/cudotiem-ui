import React, { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";
import Select from "./Select";

interface DropdownProps {
  children: React.ReactNode;
}

interface DropdownWithSelectAndOption extends DropdownProps {
  Select: typeof Select;
}

const Dropdown = ({ children }: { children: DropdownProps }) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};

Dropdown.Select = Select;

{
}
export default Dropdown;
