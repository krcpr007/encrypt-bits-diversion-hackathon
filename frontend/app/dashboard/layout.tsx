import Link from "next/link";
import React from "react";
import { CiMenuBurger } from "react-icons/ci";
import { BsThreeDotsVertical } from "react-icons/bs";
import Routes from "@/components/Routes";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="drawer lg:drawer-open min-h-screen">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content grid grid-rows-[70px_1fr]">
        {/* Page content here */}
        <div className="flex h-full justify-between items-center p-5 bg-gray-700">
          <label htmlFor="my-drawer-2" className="drawer-button lg:hidden">
            <CiMenuBurger className="text-xl" />
          </label>
          <Link href={"/dashboard"} className="uppercase font-bold text-white">
            Dashboard
          </Link>
          <div className="dropdown dropdown-end">
            <BsThreeDotsVertical tabIndex={0} role="button" className="m-1" />
            <ul
              tabIndex={0}
              className="dropdown-content z-[1] menu p-2 shadow-md bg-gray-800 rounded-md w-32"
            >
              <li>
                <button className="text-white">Logout</button>
              </li>
            </ul>
          </div>
        </div>
        {children}
      </div>
      <div className="drawer-side h-full overflow-hidden">
        <label
          htmlFor="my-drawer-2"
          aria-label="close sidebar"
          className="drawer-overlay"
        ></label>
        <div className="flex flex-col bg-gray-800 h-full">
          <p className="font-extrabold md:text-xl text-base my-5 mx-8 uppercase text-white">
            Pages
          </p>
          <Routes />
        </div>
      </div>
    </div>
  );
}
