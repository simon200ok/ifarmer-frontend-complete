import React, { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import LeftPane from "../Components/LeftPane";
import ResetPassSuccessModal from "../Components/ResetPassSuccessModal";
import "./Login.css";

import logo from "../assets/logo.png";
import eyeClose from "../assets/eye-close.png";
import eyeOpen from "../assets/eye-open.png";

function ResetPassword() {
  const [searchParams] = useSearchParams(); 
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  useEffect(() => {
    const token = searchParams.get("token"); 
    if (token) {
      setFormData((prev) => ({ ...prev, token })); 
      navigate("/reset-password", { replace: true }); 
    } 
    if (!formData.token == token) {
      setErrorMessage("Invalid or missing token. Redirecting...");
      setTimeout(() => navigate("/forgot-password"), 3000);
    }
  }, [searchParams, navigate]);
  
  const validatePassword = (password) => {
    const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\[\]{}:;<>,.?/~_+\-=|\\])[A-Za-z\d!@#$%^&*()\[\]{}:;<>,.?/~_+\-=|\\]{8,}$/;
    return strongPasswordRegex.test(password);
  };

  const handleCancel = () => {
    console.log("Canceled");
  };

  const handleApply = (date) => {
    console.log("Selected Date and Time:", date);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrorMessage("");

    console.log("Password being tested:", password); 
    console.log("Validation result:", validatePassword(password));

    if (!validatePassword(formData.password)) {
      alert("Password must be at least 8 characters long and include uppercase, lowercase, a number, and a special character.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    
    console.log("Token being sent to backend:", formData.token); 

    if (!formData.token) {
      alert("Token is missing. Please try again.");
      return;
    }
    setLoading(true);

    const requestData = {
      token: formData.token,
      newPassword: formData.password.trim(),
    };

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/reset-password", requestData);
      setResponseMessage(response.data.responseMessage || "Password changed successfully.");
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error response:", error.response?.data || error.message);
      setErrorMessage(
        error.response?.data?.responseMessage || "Failed to change password. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <LeftPane message="Welcome Back" />
        <div className="right">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
          <div className="password-group">
               <label htmlFor="password">Password</label>
               <div className="profile-password-field">
                 <input
                  type={passwordVisible ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
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
            <div>
              <input className="token" type="text" name="token" value={formData.token} readOnly/> 
            </div>
            <div className="reset-password-button">
              <button type="submit" disabled={loading}>
              {loading ? "Submitting..." : "Reset Password"}
              </button>
            </div>
          </form>
          <ResetPassSuccessModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message={responseMessage}
          />
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;