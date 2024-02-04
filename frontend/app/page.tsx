import PageTitle from "@/components/pageTitle";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full bg-black">
      <div>
        <div className="max-w-[1250px] flex justify-between items-start mx-auto py-5 w-11/12">
          <Image
            src={"/arcticons_eset-security.png"}
            alt="logo"
            width={150}
            height={150}
          />
          <div className="flex gap-4 items-center">
            <Link
              href={"/signup"}
              className="px-5 py-2 rounded-md hover:bg-gray-200 font-medium transition-all duration-200 text-white"
            >
              Signup
            </Link>
            <Link
              href={"/login"}
              className="px-5 py-2 rounded-md text-white font-medium bg-gray-600 hover:bg-opacity-80 transition-all duration-200"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
      <div className="min-h-[800px]">
        <div className="max-w-[1250px] mx-auto w-11/12 py-10 flex flex-col gap-y-10 ">
          <PageTitle title="encrypt bits" />
          <p className="text-white max-w-[550px]">
            Protecting Medical Images. Ensuring Security and Privacy with Deep
            Learning
          </p>
          <p className="text-white max-w-[530px] w-11/12">
            Experience cutting-edge medical image security solutions that
            safeguard patient data and enhance privacy using advanced deep
            learning algorithms.
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="py-4 flex justify-between items-center mx-auto max-w-[1250px] w-11/12">
          <div className="flex gap-5 items-center">
            <Link href={"/about"} className="opacity-80 hover:underline">
              About
            </Link>
            <p className="opacity-80">Terms and Conditions</p>
          </div>
          <div>
            <p className="opacity-80">Copyright 2023-2024</p>
          </div>
        </div>
      </div>
    </div>
  );
}
