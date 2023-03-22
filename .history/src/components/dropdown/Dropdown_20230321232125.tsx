import { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";

interface DropdownType {
  children: ReactNode;
  [key: string]: any;
}

const Dropdown = ({ children, ...props }: { children: ReactNode }) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};
export default Dropdown;
