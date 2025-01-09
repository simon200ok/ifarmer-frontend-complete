import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

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

  const [formError, setFormError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    // Clear errors on input change
    setFormError("");
  };

  // Password validation
  const isValidPassword = (password) => {
    const passwordRegex = /^(?=.*[!@#$%^&*])[A-Za-z0-9!@#$%^&*]{8,}$/;
    return passwordRegex.test(password);
  };

  const validateForm = () => {
    let formIsValid = true;
    let newErrors = {};

    if (!formData.firstName) {
      newErrors.firstName = "First name is required";
      formIsValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = "Last name is required";
      formIsValid = false;
    }

    if (!formData.userName) {
      newErrors.userName = "Username is required";
      formIsValid = false;
    }

    if (!formData.email) {
      newErrors.email = "Email is required";
      formIsValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is not valid";
      formIsValid = false;
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
      formIsValid = false;
    } else if (!isValidPassword(formData.password)) {
      newErrors.password =
        "Password must be at least 8 characters and include one special character";
      formIsValid = false;
    }

    if (!formData.businessName) {
      newErrors.businessName = "Business name is required";
      formIsValid = false;
    }

    if (!formData.gender) {
      newErrors.gender = "Gender is required";
      formIsValid = false;
    }

    if (!formData.role) {
      newErrors.role = "Role is required";
      formIsValid = false;
    }

    return formIsValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }

    const { gender, role, ...bodyData } = formData;

    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post(
        `http://localhost:8080/api/v1/auth/register?gender=${gender}&role=${role}`,
        bodyData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/login");
      console.log("Registration successful!", response.data);
    } catch (error) {
      if (error.response) {
        const { responseCode, responseMessage } = error.response.data;
        console.error(`Error response data: ${responseMessage}`);

        if (
          responseCode === "400" &&
          responseMessage.includes("Email already exists")
        ) {
          setFormError("Email already exists, kindly log into your account.");
        } else {
          setFormError("An unexpected error occurred. Please try again later.");
        }
      } else {
        console.error("Registration failed.", error.message);
        setFormError(
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
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <form onSubmit={handleSubmit}>
            {formError && <p className="error form-error">{formError}</p>}
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
    </div>
  );
}

export default Signup;
