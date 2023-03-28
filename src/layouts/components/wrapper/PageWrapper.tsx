import React, { ReactNode } from "react";

interface PageWrapperProps {
  children: ReactNode;
  [key: string]: any;
}

const PageWrapper = ({ children, ...props }: PageWrapperProps) => {
  const { bg } = props;

  return (
    <main className={`${bg || "bg-gray-100"}`}>
      <section className="px-6 w-[1280px] min-h-screen mx-auto">
        {children}
      </section>
    </main>
  );
};

export default PageWrapper;
