import React, { ReactNode } from "react";

interface PageWrapperProps {
  classNames?: string;
  children: ReactNode;
  [key: string]: any;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const { classNames } = props;

  return (
    <main className="bg-gray-100">
      <section className="px-6 w-[1280px] mx-auto">{children}</section>
    </main>
  );
};

export default PageWrapper;
