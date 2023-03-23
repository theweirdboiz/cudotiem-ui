import React, { ReactNode } from "react";

type Props = {};

const Table = ({ children }: { children: ReactNode }) => {
  return (
    <div className="bg-white overflow-x-hidden rounded-lg">
      <table>{children}</table>
    </div>
  );
};

export default Table;
