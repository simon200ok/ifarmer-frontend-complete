import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

import "../Components/Sidebar.css";

function UserDashboardLayout() {
  return (
    <div className="user-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default UserDashboardLayout;
