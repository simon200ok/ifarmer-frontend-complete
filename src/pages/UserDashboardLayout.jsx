import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

function UserDashboardLayout() {
  return (
    <div className="layout">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default UserDashboardLayout;
