import React from "react";
import { useDropdown } from "./dropdown-context";

type Props = {};

const List = ({ children }: { children: React.ReactNode }) => {
  const { show } = useDropdown();
  return (
    <>
      {show && (
        <div className="absolute top-full left-0 w-full bg-white shadow-md">
          {children}
        </div>
      )}
    </>
  );
};

export default List;
