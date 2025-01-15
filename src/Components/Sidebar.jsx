import axios from "axios";
import { useNavigate } from "react-router";

import logo from "../assets/logo.png";
import dashboard from "../assets/icons/dashboard.png";
import settings from "../assets/icons/settings.png";
import bell from "../assets/icons/bell.png";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";
import crop from "../assets/icons/Plant.png";
import cow from "../assets/icons/cow.png";
import inventory from "../assets/icons/inventory.png";
import community from "../assets/icons/web.png";

import "./Sidebar.css";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      localStorage.removeItem("token");

      navigate("/");
    } catch (error) {
      console.error("Error during logout:", error);
      alert("Logout failed. Please try again.");
    }
  };

  return (
    <div className="user-sidebar">
      <div className="user-logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="user-icons">
        <div className="icon-group">
          <img src={dashboard} alt="dashboard icon" />
          <span>Dashboard</span>
        </div>
        <div className="icon-group" onClick={() => navigate("/homepage/crops")}>
          <img src={crop} alt="Crop icon" />
          <span>Crop Management</span>
        </div>
        <div className="icon-group">
          <img src={cow} alt="Livestock icon" />
          <span>Livestock Management</span>
        </div>
        <div className="icon-group">
          <img src={inventory} alt="Inventory icon" />
          <span>Inventory</span>
        </div>

        <p>Settings</p>
        <div className="iconGroup" onClick={() => navigate("/homepage/settings")}>
          <img src={settings} alt="Settings Icon" />
          <span>Settings</span>
        </div>
        <div className="icon-group">
          <img src={community} alt="Community Icon" />
          <span>Community</span>
        </div>
        <div className="icon-group">
          <img src={bell} alt="Notification Icon" />
          <span>Notification</span>
        </div>
        <div className="icon-group">
          <img src={profile} alt="Profile Icon" />
          <span>My Profile</span>
        </div>
        <div className="icon-group" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" />
          <span>Logout</span>
        </div>
      </div>
      <div className="card">
        <div className="icon">
          <span>+</span>
        </div>
        <h2 className="title">Share Your Experience</h2>
        <p className="description">
          Connect with Others, Ask Questions, and Share Your Success Stories.
        </p>
        <button className="cta-button">Create New Post</button>
      </div>
    </div>
  );
}

export default Sidebar;
