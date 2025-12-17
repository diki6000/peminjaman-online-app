import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../components/SideBar/SideBar";
import "./AdminLayout.css"; // Create this CSS file

function AdminLayout() {
  return (
    <div className="admin-layout">
      <AdminSidebar />
      <main className="admin-content">
        <Outlet />{" "}
      </main>
    </div>
  );
}

export default AdminLayout;
