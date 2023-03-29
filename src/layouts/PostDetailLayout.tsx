import React, { ReactNode } from "react";
import { Link, Outlet } from "react-router-dom";
import { useSearch } from "~/contexts/searchContext";
import PageWrapper from "~/layouts/components/wrapper/PageWrapper";
import Topbar from "./components/topbar/Topbar";
type Props = {
  children?: ReactNode;
};
const PostDetailLayout = (props: Props) => {
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

export default PostDetailLayout;
