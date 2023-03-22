import React, { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";
import Select from "./Select";

interface DropdownProps {
  children: React.ReactNode;
}

interface DropdownWithSelectAndOption extends DropdownProps {
  Select: typeof Select;
}

const Dropdown: React.FC<DropdownProps> & DropdownWithSelectAndOption = (
  children
) => {
  return <div>{children}</div>;
};

Dropdown.Select = Select;

{
  /* <DropdownProvider>
  <div className="w-full relative">{children}</div>
</DropdownProvider>; */
}
export default Dropdown;
