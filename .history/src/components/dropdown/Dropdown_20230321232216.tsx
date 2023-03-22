import { ReactNode } from "react";
import { DropdownProvider } from "./dropdown-context";

interface DropdownType {
  children: ReactNode;
  [key: string]: any;
}

const Dropdown = ({ children, ...props }: DropdownType) => {
  console.log(props);

  return (
    <DropdownProvider {...props}>
      <div className="w-full relative">{children}</div>
    </DropdownProvider>
  );
};
export default Dropdown;
