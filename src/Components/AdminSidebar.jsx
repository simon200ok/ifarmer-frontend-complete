import { useNavigate } from "react-router";

import logo from "../assets/logo.png";
import dashboard from "../assets/icons/dashboard.png";
import user from "../assets/icons/user.png";
import analytics from "../assets/icons/analytics.png";
import settings from "../assets/icons/settings.png";
import bell from "../assets/icons/bell.png";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";

import "../pages/Admin-Dashboard/Admin.css";

function AdminSidebar() {
  const navigate = useNavigate();
  return (
    <div className="sidebar">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="icons">
        <div className="iconGroup" onClick={() => navigate("/admin")}>
          <img src={dashboard} alt="dashboard icon" />
          <span>Dashboard</span>
        </div>
        <div className="iconGroup" onClick={() => navigate("/admin/users")}>
          <img src={user} alt="User icon" />
          <span>User Database</span>
        </div>
        <div className="iconGroup">
          <img src={analytics} alt="Analytics Icon" />
          <span>User Analytics</span>
        </div>
        <p>Settings</p>
        <div className="iconGroup" onClick={() => navigate("/admin/settings")}>
          <img src={settings} alt="Settings Icon" />
          <span>Settings</span>
        </div>
        <div className="iconGroup">
          <img src={bell} alt="Notification Icon" />
          <span>Notification</span>
        </div>
        <div className="iconGroup">
          <img src={profile} alt="Profile Icon" />
          <span>My Profile</span>
        </div>
        <div className="iconGroup">
          <img src={logout} alt="Logout Icon" />
          <span>Logout</span>
        </div>
      </div>
    </div>
  );
}

export default AdminSidebar;
