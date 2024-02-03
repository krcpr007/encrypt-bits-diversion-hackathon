import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full">
      <div className="shadow">
        <div className="max-w-[1250px] flex justify-between items-center mx-auto py-5 w-11/12">
          <p>EncrpytBits</p>
          <div className="flex gap-4 items-center">
            <Link
              href={"/signup"}
              className="px-5 py-2 rounded-md text-black hover:bg-gray-200 font-medium transition-all duration-200"
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
      <div className="min-h-[800px] flex flex-col items-center justify-center"></div>

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
