import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../layouts/components/topbar/Topbar";

type Props = {};

const DashboardLayout = () => {
  return (
    <div>
      <Topbar />
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
