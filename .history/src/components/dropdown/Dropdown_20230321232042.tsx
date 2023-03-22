import { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";

interface DropdownType {
  [key: string]: any;
}

const Dropdown = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};
export default Dropdown;
