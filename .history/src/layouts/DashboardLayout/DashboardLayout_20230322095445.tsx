import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../layouts/components/topbar/Topbar";
import Sidebar from "./components/Sidebar";

type Props = {};

const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <div className="w-[1280px] px-6 mx-auto gap-x-5">
        <div className="flex-center">
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
