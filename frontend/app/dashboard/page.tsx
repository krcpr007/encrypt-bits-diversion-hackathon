import Link from "next/link";
import React from "react";
import { IoCloudUploadSharp, IoCloudDownload } from "react-icons/io5";

export default function page() {
  return (
    <div className="flex justify-center w-full h-full items-center flex-wrap gap-5">
      <Link
        href={"/dashboard/upload"}
        className="w-60 aspect-square rounded-box hover:-translate-y-2 bg-base-100 hover:shadow flex flex-col items-center justify-center transition-all duration-200 hover:bg-base-200"
      >
        <IoCloudUploadSharp className="text-2xl md:text-3xl lg:text-4xl text-gray-500" />
        <span className="text-sm mt-5">Upload</span>
      </Link>
      <Link
        href={"/dashboard/download"}
        className="w-60 aspect-square rounded-box hover:-translate-y-2 bg-base-100 hover:shadow flex flex-col items-center justify-center transition-all duration-200 hover:bg-base-200"
      >
        <IoCloudDownload className="text-2xl md:text-3xl lg:text-4xl text-gray-500"/>
        <span className="text-sm mt-5">Download</span>
      </Link>
    </div>
  );
}
