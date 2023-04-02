import React, { ReactNode } from "react";
import PageWrapper from "~/layouts/components/wrapper/PageWrapper";
import Topbar from "./components/topbar/Topbar";
type Props = {
  children?: ReactNode;
};
const DefaultLayout = (props: Props) => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className="flex justify-between pt-4 gap-x-5">
          <div className="flex-1">{props.children}</div>
        </div>
      </PageWrapper>
    </>
  );
};

export default DefaultLayout;
