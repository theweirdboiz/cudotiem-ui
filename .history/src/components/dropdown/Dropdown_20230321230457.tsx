import { ReactNode } from "react";

interface DropdownProps {
  children: ReactNode;
}

const Dropdown = ({ children }: { children: ReactNode }) => {
  return <>{children}</>;
};
export default Dropdown;
