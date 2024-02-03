"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Routes() {

  const dashboardRoutes = [
    {
      name: "Download",
      link: "/dashboard/download",
    },
    {
      name: "Upload",
      link: "/dashboard/upload",
    },
  ];

  return (
    <div>
      <ul className="menu p-4 w-60 min-h-full text-black dark:text-base-content flex-grow">
        {dashboardRoutes.map((props, index) => (
          <li key={index}>
            <Link
              href={props.link}
              className={`text-black dark:text-white font-bold`}
            >
              {props.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
