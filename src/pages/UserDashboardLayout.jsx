import { Outlet } from "react-router";
import Sidebar from "../Components/Sidebar";

import "../Components/Sidebar.css";
import UpcomingTask from "./UpcomingTask";

function UserDashboardLayout() {
  return (
    <div className="user-layout">
      <Sidebar />
      <Outlet />
      <UpcomingTask />
    </div>
  );
}

export default UserDashboardLayout;
