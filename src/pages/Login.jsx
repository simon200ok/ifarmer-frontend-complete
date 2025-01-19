import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LeftPane from "../Components/LeftPane";
import "./Login.css";
import logo from "../assets/logo.png";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v2/admin/login",
        {
          email,
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
          navigate("/admin");
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
        <LeftPane message="Welcome Back" />
        <div className="right">
          <div className="logo" onClick={() => navigate("/homepage/livestock")}>
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
            <p>Forgot Password?</p>
            <div className="formButton">
              <button type="submit" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
