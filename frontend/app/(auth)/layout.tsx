import React from "react";

interface Props {
  children: React.ReactNode;
}

export default function AuthLayout({ children }: Props) {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md dark:bg-white bg-[#271d1d] rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold  dark:text-gray-900 text-white">
          Login
        </h2>
        <p className="mb-6 text-gray-400 text-sm">
          Welcome back! Please login to your account.
        </p>
        {children}
      </div>
    </div>
  );
}
