import { Outlet } from "react-router";
import AdminSidebar from "../../Components/AdminSidebar";

import "./Admin.css";

function AdminLayout() {
  return (
    <div className="layout">
      <AdminSidebar />
      <Outlet />
    </div>
  );
}

export default AdminLayout;
