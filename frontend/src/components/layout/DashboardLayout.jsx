import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "@/components/dashboard/AdminSidebar";
import AdminNavbar from "@/components/dashboard/AdminNavbar";

const DashboardLayout = () => {
  return (
    <div className="flex">
      {/* Sidebar ثابت على الجنب */}
      <Sidebar />

      {/* المحتوى كله */}
      <div className="flex-1 flex flex-col min-h-screen bg-gray-50">
        {/* Navbar ثابت فوق */}
        <div className="sticky top-0 z-50">
          <AdminNavbar />
        </div>

        {/* محتوى الصفحة */}
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
