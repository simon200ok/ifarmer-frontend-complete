import React, { useState } from "react";
import axios from "axios"; 
import "./ProfileNPassword.css";

const ProfileModal = () => {
  const [formData, setFormData] = useState({
    name: "Ayomide Fasan",
    username: "Ayomide Fasan",
    email: "ayomide2395@gmail.com",
    bio: "farm.ocm",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordVisible1, setPasswordVisible1] = useState(false);
  const [passwordVisible2, setPasswordVisible2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const togglePassword1 = () => {
    setPasswordVisible1((prev) => !prev);
  };

  const togglePassword2 = () => {
    setPasswordVisible2((prev) => !prev);
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    if (formData.newPassword !== formData.confirmPassword) {
      setLoading(false);
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axios.put("/api/v1/auth/profile", {
        name: formData.name,
        username: formData.username,
        email: formData.email,
        bio: formData.bio,
        password: formData.newPassword,
      });

      if (response.status === 200) {
        setSuccessMessage("Profile updated successfully.");
      } else {
        setError("Failed to update profile. Please try again.");
      }
    } catch (err) {
      setError(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="profile-header">Profile</span>
        <button className="close-btn">&times;</button>
        <div className="profile-section">
          <div className="profile-picture">
            <img
              className="sample-pic"
              src="sample-profile-pic.jpeg"
              alt="Profile pic"
            />
            <img
              className="edit-pic-btn"
              src="pen.png"
              alt="Edit profile icon"
            />
          </div>
          <form id="update-profile-form" className="update-profile-form" onSubmit={handleSubmit}>
            <div className="user-details">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-details">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-details">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="user-details">
              <label htmlFor="bio">Bio</label>
              <input
                type="text"
                id="bio"
                value={formData.bio}
                onChange={handleChange}
                required
              />
            </div>
            <div className="password-group">
              <label htmlFor="newPassword">Password</label>
              <div className="profile-password-field">
                <input
                  type={passwordVisible1 ? "text" : "password"}
                  id="newPassword"
                  value={formData.newPassword}
                  onChange={handleChange}
                  required
                />
                <img
                  src={passwordVisible1 ? "eye-open.png" : "eye-close.png"}
                  className="eye-icon"
                  alt="Toggle visibility"
                  onClick={togglePassword1}
                />
              </div>
            </div>
            <div className="password-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <div className="profile-password-field">
                <input
                  type={passwordVisible2 ? "text" : "password"}
                  id="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                <img
                  src={passwordVisible2 ? "eye-open.png" : "eye-close.png"}
                  className="eye-icon"
                  alt="Toggle visibility"
                  onClick={togglePassword2}
                />
              </div>
            </div>
            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
