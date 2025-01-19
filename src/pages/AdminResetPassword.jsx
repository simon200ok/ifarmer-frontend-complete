import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Eye, EyeOff } from 'lucide-react';

import LeftPane from "../Components/LeftPane";
import "./AdminResetPassword.css";
import logo from "../assets/logo.png";

const AdminResetPassword = () => {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          password,
        }
      );

      const { responseCode, responseMessage } = response.data;

      if (responseCode === "003") {
        toast.error(responseMessage);
      } else if (responseCode === "002") {
        localStorage.setItem("token", response.data.loginInfo.token);
        localStorage.setItem("firstName", response.data.loginInfo.firstName);

        toast.success("Login successful!");

        setTimeout(() => {
          navigate("/homepage/crops");
        }, 3000);
      } else {
        toast.error(responseMessage);
      }
    } catch (error) {
      if (error.response) {
        toast.error(
          error.response?.data?.responseMessage ||
            "Something went wrong. Please try again."
        );
      } else if (error.request) {
        toast.error(
          "Network error. Please check your internet connection and try again."
        );
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <LeftPane message="Admin Reset Password Page" />
        <div className="right">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <form onSubmit={handleLogin}>
  <div className="formGroup">
    <label htmlFor="password">Password</label>
    <div className="passwordInput">
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        name="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <div onClick={togglePasswordVisibility} className="eyeIcon">
        {showPassword ? <EyeOff /> : <Eye />}
      </div>
    </div>
  </div>

  <div className="formGroup">
    <label htmlFor="confirmPassword">Confirm Password</label>
    <div className="passwordInput">
      <input
        type={showPassword ? "text" : "password"}
        id="confirmPassword"
        name="confirmPassword"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <div onClick={togglePasswordVisibility} className="eyeIcon">
        {showPassword ? <EyeOff /> : <Eye />}
      </div>
    </div>
  </div>

  <div className="formButton">
    <button type="submit" disabled={loading}>
      {loading ? "Saving..." : "Save Changes"}
    </button>
  </div>
</form>

        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AdminResetPassword;
