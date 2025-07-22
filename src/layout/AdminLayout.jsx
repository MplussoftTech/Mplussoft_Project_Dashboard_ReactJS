import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";
import AdminFooter from "../components/AdminFooter";
import { useState } from "react";

export default function AdminLayout() {
  const [collapsed, setCollapsed] = useState(false);
  const toggleSidebar = () => setCollapsed(!collapsed);

  const location = useLocation();

  return (
    <div className="admin-layout d-flex">
      <AdminSidebar collapsed={collapsed} />
      <div className="main-content d-flex flex-column flex-grow-1 min-vh-100">
        <AdminNavbar onToggleSidebar={toggleSidebar} />
        <main
          className={`flex-grow-1 bg-light ${
            location.pathname.startsWith("/admin/projects/edit") ? "" : "p-4"
          } `}
        >
          <Outlet />
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}
