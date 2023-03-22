import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: { children: ReactNode }) => {
  return <div className="w-full relative">{children}</div>;
};
export default Dropdown;
