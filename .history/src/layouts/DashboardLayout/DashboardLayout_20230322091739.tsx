import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const DashboardLayout = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default DashboardLayout;
