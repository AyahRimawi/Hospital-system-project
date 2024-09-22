import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./components/Sidebar";

const DoctorLayout = () => {
  return (
    <div className="flex h-screen  bg-white">
      <Sidebar />
      <div className="flex-1 overflow-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default DoctorLayout;
