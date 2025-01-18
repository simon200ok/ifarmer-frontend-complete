import React, { useState } from "react";
import axios from "axios";
import LeftPane from "../Components/LeftPane";
import EmailForgotPassModal from "../Components/EmailForgotPassModal";
import "./Login.css";

import logo from "../assets/logo.png";

function ForgotPassword() {

  const [email, setEmail] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const validateEmail = (email) => {
    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMessage("");
    setErrorMessage("");
    if (!validateEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:8080/api/v1/auth/forgot-password", {
        email,
      });
      setResponseMessage("Your Password Link has been sent to " + email + ". This link leads to your change of password screen.");
      setIsModalOpen(true);
    } catch (error) {
      setErrorMessage(
        error.response?.data?.responseMessage || "Failed to send verification email. Please try again."
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
            <div className="formGroup">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="address@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                maxLength={50}
                required
              />
            </div>
            <p></p>
            <div className="formButton">
              <button type="submit" disabled={loading}>
              {loading ? "Sending..." : "Email Verification"}
              </button>
            </div>
          </form>
          <EmailForgotPassModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            message={responseMessage}
          />
          {/* {responseMessage && <p className="success-message">{responseMessage}</p>} */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;



//Muminat's code begins
// import LeftPane from "../Components/LeftPane";
// import "./Login.css";

// import logo from "../assets/logo.png";

// function ForgetPassword() {
    
//   return (
//     <div className="wrapper">
//       <div className="container">
//         <LeftPane message="Welcome Back" />
//         <div className="right">
//           <div className="logo">
//             <img src={logo} alt="logo" />
//           </div>
//           <form>
//             <div className="formGroup">
//               <label htmlFor="email">Email</label>
//               <input type="text" id="email" name="email" required />
//             </div>
//             <p>Forgot Password?</p>
//             <div className="formButton">
//               <button type="submit">Email Verification</button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default ForgetPassword;
//Muminat's code