import React, { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return <section className="px-6 w-[1280px] mx-auto">{children}</section>;
};

export default PageWrapper;
