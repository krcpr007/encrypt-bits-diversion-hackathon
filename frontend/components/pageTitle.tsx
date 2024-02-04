import React from "react";

export default function PageTitle({ title }: { title: string }) {
  return (
    <h2 className="tracking-[10px] font-extrabold uppercase text-lg md:text-3xl text-primaryYellow">
      {title}
    </h2>
  );
}
