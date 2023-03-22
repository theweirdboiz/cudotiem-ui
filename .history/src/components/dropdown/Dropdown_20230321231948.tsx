import { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";

const Dropdown = ({ children }: { children: ReactNode }) => {
  return (
    <DropdownProvider>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};
export default Dropdown;
