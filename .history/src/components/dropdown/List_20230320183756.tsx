import React, { ReactNode } from "react";
import { useDropdown } from "./dropdown-context";

interface ListProps {
  children: ReactNode;
}

const List = ({ children }: ListProps) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-sm">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
