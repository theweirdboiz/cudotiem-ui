import React, { ReactNode } from "react";
import Topbar from "../components/topbar";
import { Link, Outlet } from "react-router-dom";
import { useSearch } from "../../contexts/SearchContext";

type Props = {
  children?: ReactNode;
};

const DefaultLayout = (props: Props) => {
  const { isOpen } = useSearch();
  return (
    <>
      <Topbar />
      <section className="box-center bg-orange-200 py-2 text-[14px]">
        <Link to="/khuyen-mai" className="flex-center">
          <picture>
            <img
              src="https://salt.tikicdn.com/ts/upload/5e/ec/fb/150f3c633781ed1da9921e45db90c62d.png"
              alt="icon"
              width={81}
              height={12}
            />
          </picture>
          <p className="pl-1">
            <strong>mọi đơn từ 149k. </strong>
          </p>
          <picture>
            <img
              src="https://salt.tikicdn.com/ts/upload/51/20/3f/1bb77cdb828972a5284a06dac79c0afc.png"
              alt="icon"
              width={7}
              height={11}
              className="ml-1"
            />
          </picture>
        </Link>
      </section>
      <div
        className={`${
          isOpen ? "" : "hidden"
        } overlay absolute inset-0 z-20 bg-black bg-opacity-50`}
      ></div>
      <main>
        <div className="">{props.children}</div>
      </main>
    </>
  );
};

export default DefaultLayout;
