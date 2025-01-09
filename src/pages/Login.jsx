import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

import LeftPane from "../Components/LeftPane";
import "./Login.css";

import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        {
          email,
          password,
        }
      );

      const { responseCode, responseMessage } = response.data;

      if (responseCode === "003") {
        setError(responseMessage);
      } else if (responseCode === "002") {
        localStorage.setItem("token", response.data.loginInfo.token);

        navigate("/homepage");

        alert("Login successful!");
      } else {
        setError(responseMessage);

        setTimeout(() => {
          setError("");
        }, 5000);
      }
    } catch (error) {
      if (error.response) {
        setError(
          error.response?.data?.responseMessage ||
            "Something went wrong. Please try again."
        );
        setTimeout(() => {
          setError("");
        }, 5000);
      } else if (error.request) {
        setError(
          "Network error. Please check your internet connection and try again."
        );
        setTimeout(() => {
          setError("");
        }, 5000);
      } else {
        setError("An unexpected error occurred. Please try again.");
        setTimeout(() => {
          setError("");
        }, 5000);
      }
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
          <form onSubmit={handleLogin}>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="formGroup">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && (
              <h1 style={{ color: "red", fontSize: "14px" }}>{error}</h1>
            )}
            <p>Forgot Password?</p>
            <div className="formButton">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
