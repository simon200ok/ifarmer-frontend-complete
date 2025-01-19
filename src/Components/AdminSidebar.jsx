import { useNavigate } from "react-router";
import axios from "axios";

import logo from "../assets/logo.png";
import dashboard from "../assets/icons/dashboard.png";
import user from "../assets/icons/user.png";
import analytics from "../assets/icons/analytics.png";
import settings from "../assets/icons/settings.png";
import profile from "../assets/icons/profile.png";
import logout from "../assets/icons/logout.png";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "../pages/Admin-Dashboard/Admin.css";

function AdminSidebar() {
  const navigate = useNavigate();


  const handleLogout = async () => {
    const token = localStorage.getItem("token");
  
    if (!token) {
      toast.error("No token found. You are not logged in.");
      return;
    }
  
    try {
      await axios.post(
        "http://localhost:8080/api/v2/admin/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
  
      localStorage.removeItem("token");
      localStorage.removeItem("firstName");
      sessionStorage.removeItem("token");
  

      toast.success("Logout successful!");
  
      setTimeout(() => {
        navigate("/admin/login");
      }, 2000);
    } catch (error) {
      console.error("Error during logout:", error);
      toast.error(
        error.response?.data?.responseMessage ||
          "Logout failed. Please try again."
      );
    }
  };
  
  
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
        <div className="iconGroup" onClick={() => navigate("/admin/analytics")}>
          <img src={analytics} alt="Analytics Icon" />
          <span>User Analytics</span>
        </div>
        <p>Settings</p>
        <div className="iconGroup" onClick={() => navigate("/admin/settings")}>
          <img src={settings} alt="Settings Icon" />
          <span>Settings</span>
        </div>
        <div className="iconGroup">
          <img src={profile} alt="Profile Icon" />
          <span>My Profile</span>
        </div>
        <div className="iconGroup" onClick={handleLogout}>
          <img src={logout} alt="Logout Icon" />
          <span>Logout</span>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default AdminSidebar;
