import React, { ReactNode } from "react";

const DashboardHeading = ({ children }: { children: ReactNode }) => {
  return <h1 className="mb-5 text-3xl font-bold">{children}</h1>;
};

export default DashboardHeading;
