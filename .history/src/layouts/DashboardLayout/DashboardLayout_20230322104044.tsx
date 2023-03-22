import PageWrapper from "../../layouts/components/wrapper/PageWrapper";
import React, { ReactNode } from "react";
import { Outlet } from "react-router-dom";
import Topbar from "../../layouts/components/topbar/Topbar";
import Sidebar from "./components/Sidebar";

type Props = {};
const category = [
  {
    id: 1,
    name: "category 1",
    status: 2,
    slug: "frontedn-a",
  },
  {
    id: 2,
    name: "category 2",
    status: 2,
    slug: "frontedn-22",
  },
  {
    id: 3,
    name: "category 3",
    status: 3,
    slug: "frontedn-a",
  },
];
const DashboardLayout = () => {
  return (
    <>
      <Topbar />
      <PageWrapper>
        <div className="flex pt-4 gap-x-5">
          <Sidebar width="w-[300px]">
            <Sidebar.SidebarList>
              {category.map((item) => (
                <Sidebar.SidebarItem
                  key={item.id}
                  classNames="hover:bg-blue-100"
                >
                  {item.name}
                </Sidebar.SidebarItem>
              ))}
            </Sidebar.SidebarList>
          </Sidebar>
          <Outlet />
        </div>
      </PageWrapper>
    </>
  );
};

export default DashboardLayout;
