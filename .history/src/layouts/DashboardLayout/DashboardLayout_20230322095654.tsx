import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../layouts/components/topbar/Topbar";
import Sidebar from "./components/Sidebar";

type Props = {};

const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className="flex-center">
          <Sidebar />
          <Outlet />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardLayout;
