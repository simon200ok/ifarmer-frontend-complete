import logo from "../assets/logo.png";
import dashboard from "../assets/icons/dashboard.png";
import settings from "../assets/icons/settings.png";
import bell from "../assets/icons/bell.png";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";
import crop from "../assets/icons/plant.png";
import cow from "../assets/icons/cow.png";
import inventory from "../assets/icons/inventory.png";
import community from "../assets/icons/web.png";

import "./Sidebar.css";

function Sidebar() {
  return (
    <div className="sidebarWrapper">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="icons">
        <div className="iconGroup">
          <img src={dashboard} alt="dashboard icon" />
          <span>Dashboard</span>
        </div>
        <div className="iconGroup">
          <img src={crop} alt="Crop icon" />
          <span>Crop Management</span>
        </div>
        <div className="iconGroup">
          <img src={cow} alt="Livestock icon" />
          <span>Livestock Management</span>
        </div>
        <div className="iconGroup">
          <img src={inventory} alt="Inventory icon" />
          <span>Inventory</span>
        </div>

        <p>Settings</p>
        <div className="iconGroup">
          <img src={settings} alt="Settings Icon" />
          <span>Settings</span>
        </div>
        <div className="iconGroup">
          <img src={community} alt="Community Icon" />
          <span>Community</span>
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

export default Sidebar;
