import React, { ReactNode } from "react";

interface PageWrapperProps {
  classNames?: string;
}

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <main className="bg-gray-100">
      <section className="px-6 w-[1280px] mx-auto">{children}</section>
    </main>
  );
};

export default PageWrapper;
