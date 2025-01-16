import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeftPane from "../Components/LeftPane";
import "./Login.css";

import logo from "../assets/logo.png";

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    businessName: "",
    gender: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    if (
      !formData.firstName ||
      !formData.lastName ||
      !formData.userName ||
      !formData.email ||
      !formData.password ||
      !formData.businessName ||
      !formData.gender ||
      !formData.role
    ) {
      toast.error("All fields are required.");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      toast.error("Email is not valid.");
      return false;
    }
    if (!isValidPassword(formData.password)) {
      toast.error(
        "Password must be at least 8 characters and include one special character."
      );
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    const { gender, role, ...bodyData } = formData;

    try {
      // eslint-disable-next-line no-unused-vars
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/register?gender=${gender}&role=${role}`,
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success("Registration successful!");

      // Delay navigation to allow the user to see the success message
      setTimeout(() => {
        navigate("/login");
      }, 3000); // 3-second delay
    } catch (error) {
      if (error.response) {
        const { responseCode, responseMessage } = error.response.data;
        if (
          responseCode === "400" &&
          responseMessage.includes("Email already exists")
        ) {
          toast.error("Email already exists, kindly log into your account.");
        } else {
          toast.error("An unexpected error occurred. Please try again later.");
        }
      } else {
        toast.error(
          "An unexpected error occurred. Please check your network connection and try again."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="wrapper">
      <div className="container">
        <LeftPane message="Welcome to Ifarmr" />
        <div className="right">
          <div className="logo" onClick={() => navigate("/")}>
            <img src={logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            <div className="formGroup">
              <label htmlFor="fname">First Name</label>
              <input
                type="text"
                id="firstname"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="lname">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="fname">Username</label>
              <input
                type="text"
                id="username"
                name="userName"
                value={formData.userName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="bname">Business Name</label>
              <input
                type="text"
                id="businessname"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="gender">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your gender
                </option>
                <option value="FEMALE">Female</option>
                <option value="MALE">Male</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            <div className="formGroup">
              <label htmlFor="role">Role</label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select your role
                </option>
                <option value="FARMER">Farmer</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>

            <p>Forgot Password?</p>
            <div className="formButton">
              <button type="submit" disabled={loading}>
                {loading ? "Signing In" : "Sign In"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Signup;
