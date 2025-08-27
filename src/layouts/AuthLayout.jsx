import React from "react";
import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 text-white">
      <div className="w-full max-w-md p-6 rounded-lg bg-gray-800 shadow-lg">
        <Outlet />
      </div>
    </div>
  );
}
