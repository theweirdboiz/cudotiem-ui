import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="px-6 w-[1280px] mx-auto bg-gray-100">{children}</main>
  );
};

export default PageWrapper;
