import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import logo from "../assets/logo.png";
import sampleProfPic from "../assets/sample-profile-pic.jpeg";
import pen from "../assets/pen.png";
import eyeClose from "../assets/eye-close.png";
import eyeOpen from "../assets/eye-open.png";
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

function Modal({ onClose }) {
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    businessName: "",
    displayPhoto: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isUploading, setIsUploading] = useState(false);


  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      setError("");
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Authentication token is missing.");
          setError("You need to log in again.");
          return;
        }

        const response = await axios.get(
          "http://localhost:8080/api/v1/auth/getuserprofile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Response Data:", response.data);
        const { fullName, username, email, businessName, displayPhoto } =
          response.data;

        setFormData({
          name: fullName,
          username: username || "",
          email: email || "",
          businessName: businessName || "",
          displayPhoto: displayPhoto || "",
        });
      } catch (error) {
        console.error("Error fetching user data", error.response || error.message);
        setError(error.response?.data || "Failed to load user data. Please try again.", error.response || error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

    const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setIsUploading(true);
      const response = await axios.post("http://localhost:8080/api/v1/uploads", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setFormData((prevData) => ({ ...prevData, displayPhoto: response.data }));
      alert("Profile picture updated successfully!");
    } catch (error) {
      console.error("Error uploading file:", error);
      alert("Failed to upload profile picture. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  
  const handleInputChange = (e) => {
        const { id, value } = e.target;
    
        if (id === "name" && value.length > 30) return;
        if (id === "username" && value.length > 30) return;
        if (id === "email" && value.length > 80) return;
    
        setFormData((prevData) => ({
          ...prevData,
          [id]: value,
        }));
      };
  
    const validateEmail = (email) => {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      return emailRegex.test(email);
    };

    const handleSaveChanges = async (e) => {
      e.preventDefault();

      if (!validateEmail(formData.email)) {
        alert("Please enter a valid email address.");
        return;
      }

      if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match!");
        return;
      }

      const nameParts = formData.name.trim().split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const updatedData = {
        displayPhoto: formData.displayPhoto,
        firstName,
        lastName,
        userName: formData.username,
        email: formData.email,
        businessName: formData.businessName,
        password: formData.password,
      };

      try {
        const token = localStorage.getItem("token");
        await axios.put("http://localhost:8080/api/v1/auth/profile", updatedData, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        alert("Profile updated successfully!");
        onClose();
      } catch (error) {
        console.error("Error updating profile:", error);
        alert("Failed to update profile. Please try again.");
      }
    };
    
  return (
    <div
      className="profile-modal"
      onClick={(e) => {
        if (e.target.className === "profile-modal") {
          onClose();
        }
      }}
    >
      <div className="profile-modal-content">
        {loading ? (
          <p>Loading...</p>
        ) 
        // : error ? (
        //   <div className="error-message">
        //     <p>{error}</p>
        //   </div>
        // ) 
        : (
          <>
            <span className="profile-modal-header">Profile</span>
            <button className="profmodal-close-btn" onClick={onClose}>
              &times;
            </button>
            <div className="profile-section">
              <div className="profile-modal-picture">
                <img
                  className="profile-pic-frame"
                  src={formData.displayPhoto || sampleProfPic}
                  alt="Profile pic"
                />
               <label htmlFor="upload-photo">
                <img className="profile-edit-pic-btn" src={pen} alt="pen-icon" />
               </label>
               <input
                  id="upload-photo"
                  type="file"
                  style={{ display: "none" }}
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
              </div>
              <form id="update-profile-form" className="update-profile-form" onSubmit={handleSaveChanges}>
                <div className="user-details">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}            
                    onChange={handleInputChange}
                    maxlength={30}
                  />
                </div>
                <div className="user-details">
                  <label htmlFor="username">Username</label>
                  <input
                    type="text"
                    id="username"
                    value={formData.username}
                    // readOnly
                    onChange={handleInputChange}
                    maxLength={30}
                  />
                </div>
                <div className="user-details">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    maxLength={80}
                  />
                </div>
                <div className="user-details">
                  <label htmlFor="businessName">Business Name</label>
                  <input
                    type="text"
                    id="businessName"
                    value={formData.businessName}
                    onChange={handleInputChange}
                    maxLength={50}
                  />
                </div>
             <div className="password-group">
               <label htmlFor="password">Password</label>
               <div className="profile-password-field">
                 <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <img
                  src={passwordVisible ? eyeOpen : eyeClose}
                  alt="Show/Hide"
                  className="eye-icon"
                  onClick={() => setPasswordVisible(!passwordVisible)}
                />
              </div>
            </div>
            <div className="password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="profile-password-field">
                <input
                  type={confirmPasswordVisible ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  required
                />
                <img
                  src={confirmPasswordVisible ? eyeOpen : eyeClose}
                  alt="Show/Hide"
                  className="eye-icon"
                  onClick={() =>
                    setConfirmPasswordVisible(!confirmPasswordVisible)
                  }
                />
              </div>
            </div>
            <button type="submit" className="submit-btn">
              Save Changes
            </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

function Sidebar() {
  const navigate = useNavigate();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleProfileClick = () => {
    setIsModalVisible(true);
  };

  const handleLogout = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      console.error("No token found");
      return;
    }

    try {
      await axios.post(
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
        <div className="icon-group" onClick={() => navigate("/homepage/notifications")}>
          <img src={bell} alt="Notification Icon" />
          <span>Notification</span>
        </div>
        <div className="icon-group" onClick={handleProfileClick}>
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
      {isModalVisible && <Modal onClose={() => setIsModalVisible(false)} />}
    </div>
  );
}

export default Sidebar;
//17Jan ends