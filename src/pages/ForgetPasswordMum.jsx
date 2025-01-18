import LeftPane from "../Components/LeftPane";
import "./Login.css";

import logo from "../assets/logo.png";

function ForgetPassword() {
    
  return (
    <div className="wrapper">
      <div className="container">
        <LeftPane message="Welcome Back" />
        <div className="right">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <form>
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input type="text" id="email" name="email" required />
            </div>
            <p>Forgot Password?</p>
            <div className="formButton">
              <button type="submit">Email Verification</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
