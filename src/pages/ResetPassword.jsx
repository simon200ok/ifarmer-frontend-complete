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
                  // onChange={handleInputChange}
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
              {/* <input className="token" type="hidden" name="token" value={formData.token} /> */}
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
          {/* {responseMessage && <p className="success-message">{responseMessage}</p>} */}
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;



// import React, { useState } from 'react';
// import axios from 'axios';

// const ForgotPassword = () => {
//     const [email, setEmail] = useState('');
//     const [message, setMessage] = useState('');

//     const handleForgotPassword = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/v1/auth/forgot-password', {
//                 email
//             });
//             setMessage('Password reset email sent. Please check your inbox.');
//         } catch (error) {
//             setMessage('Error sending password reset email.');
//         }
//     };

//     return (
//         <div>
//             <h2>Forgot Password</h2>
//             <input 
//                 type="email" 
//                 placeholder="Enter your email" 
//                 value={email} 
//                 onChange={(e) => setEmail(e.target.value)} 
//             />
//             <button onClick={handleForgotPassword}>Send Reset Email</button>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// const ResetPassword = () => {
//     const [token, setToken] = useState('');
//     const [newPassword, setNewPassword] = useState('');
//     const [message, setMessage] = useState('');

//     const handleResetPassword = async () => {
//         try {
//             const response = await axios.post('http://localhost:8080/api/v1/auth/reset-password', {
//                 token,
//                 newPassword
//             });
//             setMessage('Password has been reset successfully.');
//         } catch (error) {
//             setMessage('Error resetting password.');
//         }
//     };

//     return (
//         <div>
//             <h2>Reset Password</h2>
//             <input 
//                 type="text" 
//                 placeholder="Enter your reset token" 
//                 value={token} 
//                 onChange={(e) => setToken(e.target.value)} 
//             />
//             <input 
//                 type="password" 
//                 placeholder="Enter your new password" 
//                 value={newPassword} 
//                 onChange={(e) => setNewPassword(e.target.value)} 
//             />
//             <button onClick={handleResetPassword}>Reset Password</button>
//             {message && <p>{message}</p>}
//         </div>
//     );
// };

// export { ForgotPassword, ResetPassword };

////Simon wrong Below///
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "./ForgotPassword.css";

// const Modal = ({ title, message, onClose, buttonText }) => (
//   <div className="modal">
//     <div className="modal-content">
//       <button className="close-btn" onClick={onClose}>×</button>
//       <h2>{title}</h2>
//       <p>{message}</p>
//       <button onClick={onClose}>{buttonText}</button>
//     </div>
//   </div>
// );

// const ForgotPassword = () => {
//   const [email, setEmail] = useState("");
//   const [password1, setPassword1] = useState("");
//   const [password2, setPassword2] = useState("");
//   const [token, setToken] = useState("");
//   const [modal, setModal] = useState(null);

//   useEffect(() => {
//     const queryParams = new URLSearchParams(window.location.search);
//     const token = queryParams.get("token");

//     if (token) {
//       axios
//         .post("/api/v1/auth/verify-reset-token", { token: token })
//         .then(() => setToken(token))
//         .catch(() => alert("Invalid or expired token."));
//     }
//   }, []);

//   const handleEmailSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post("http://localhost:8080/api/v1/auth/forgot-password", { email })
//       .then(() => setModal({
//         title: "Email Verification",
//         message: `Your Password Link has been sent to ${email}. The link leads to your change of password screen.`,
//         buttonText: "Close",
//         onClose: () => setModal(null),
//       }))
//       .catch(() => alert("Failed to send email verification. Please try again."));
//   };
// ////////////
//   const handlePasswordSubmit = (e) => {
//     e.preventDefault();
//     if (password1 !== password2) {
//       alert("Passwords do not match. Please try again.");
//       return;
//     }

//     axios
//       .post("http://localhost:8080/api/v1/auth/reset-password", { newPassword: password1, token: token })
//       .then(() => setModal({
//         title: "Password Reset",
//         message: "Your Password has been changed successfully.",
//         buttonText: "Go to Log In",
//         onClose: () => {
//           setModal(null);
//           window.location.href = "/login";
//         },
//       }))
//       .catch((error) => {
//         console.error(error);
//         alert("Failed to reset password. Please try again.");
//       });
//   };

// //////////////////////////////////
//   return (
//     <div className="container">
//       {modal && <Modal {...modal} />}

//       <div className="form-section">
//         <h2>Forgot Password</h2>
//         <form onSubmit={handleEmailSubmit}>
//           <label>Email</label>
//           <input
//             type="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//           <button type="submit">Send Verification Link</button>
//         </form>

//         <form onSubmit={handlePasswordSubmit}>
//           <label>New Password</label>
//           <input
//             type="password"
//             value={password1}
//             onChange={(e) => setPassword1(e.target.value)}
//             required
//           />
//           <label>Confirm Password</label>
//           <input
//             type="password"
//             value={password2}
//             onChange={(e) => setPassword2(e.target.value)}
//             required
//           />
//           {/* <button type="submit" disabled={!token}> */}
//           <button type="submit">
//             Reset Password
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ForgotPassword;

///Simon wrong just ended///

// // import React, { useState } from 'react';
// // import axios from 'axios';
// // import './ProfileNPassword.css';

// // const WelcomeSection = () => {
// //   return (
// //     <div className="welcome-section">
// //       <h2 className="welcome-back">Welcome Back</h2>
// //       <img className="farmer-pic" src="farmer.png" alt="Farmer" />
// //     </div>
// //   );
// // };

// // const Logo = () => {
// //   return (
// //     <div className="logo">
// //       <img src="small Farmer logo.png" alt="IFarmr Logo" />
// //       <h2>IFarmr</h2>
// //     </div>
// //   );
// // };

// // const EmailForm = () => {
// //   const [email, setEmail] = useState('');

// //   const handleEmailSubmit = async (e) => {
// //     e.preventDefault();

// //     try {
// //       const response = await axios.post('/api/v1/auth/updateprofile', { email });
// //       console.log('Email submitted successfully:', response.data);
// //       alert('Email verification sent successfully!');
// //     } catch (error) {
// //       console.error('Error submitting email:', error);
// //       alert('Failed to send email verification. Please try again.');
// //     }
// //   };

// //   return (
// //     <form id="email-form" onSubmit={handleEmailSubmit}>
// //       <div className="forgot-password-email">
// //         <label htmlFor="email">Email</label>
// //         <input
// //           className="forgot-password-inputClass"
// //           type="email"
// //           id="email"
// //           name="email"
// //           placeholder="address@email.com"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           autoComplete="off"
// //           required
// //         />
// //       </div>
// //       <button type="submit">Email Verification</button>
// //     </form>
// //   );
// // };

// // const PasswordForm = () => {
// //   const [password1, setPassword1] = useState('');
// //   const [password2, setPassword2] = useState('');
// //   const [showPassword1, setShowPassword1] = useState(false);
// //   const [showPassword2, setShowPassword2] = useState(false);

// //   const handlePasswordSubmit = async (e) => {
// //     e.preventDefault();

// //     if (password1 !== password2) {
// //       alert('Passwords do not match. Please try again.');
// //       return;
// //     }

// //     try {
// //       const response = await axios.post('/api/v1/auth/updateprofile', {
// //         newPassword: password1,
// //       });
// //       console.log('Password updated successfully:', response.data);
// //       alert('Password updated successfully!');
// //     } catch (error) {
// //       console.error('Error updating password:', error);
// //       alert('Failed to update password. Please try again.');
// //     }
// //   };

// //   return (
// //     <form id="password-form" onSubmit={handlePasswordSubmit}>
// //       <div className="forgot-password-newpassword">
// //         <div className="password-group">
// //           <label htmlFor="new-password">Password</label>
// //           <div className="password-field">
// //             <input
// //               type={showPassword1 ? 'text' : 'password'}
// //               id="password1"
// //               name="new-password"
// //               value={password1}
// //               onChange={(e) => setPassword1(e.target.value)}
// //               required
// //             />
// //             <img
// //               src={showPassword1 ? 'eye-open.png' : 'eye-close.png'}
// //               alt="Toggle visibility"
// //               className="eye-icon"
// //               onClick={() => setShowPassword1(!showPassword1)}
// //             />
// //           </div>
// //         </div>

// //         <div className="password-group">
// //           <label htmlFor="confirm-password">Confirm Password</label>
// //           <div className="password-field">
// //             <input
// //               type={showPassword2 ? 'text' : 'password'}
// //               id="password2"
// //               name="confirm-password"
// //               value={password2}
// //               onChange={(e) => setPassword2(e.target.value)}
// //               required
// //             />
// //             <img
// //               src={showPassword2 ? 'eye-open.png' : 'eye-close.png'}
// //               alt="Toggle visibility"
// //               className="eye-icon"
// //               onClick={() => setShowPassword2(!showPassword2)}
// //             />
// //           </div>
// //         </div>
// //       </div>
// //       <button type="submit" className="submit-btn">Save Changes</button>
// //     </form>
// //   );
// // };

// // const ForgotPassword = () => {
// //   return (
// //     <div className="container">
// //       <WelcomeSection />
// //       <div className="form-section">
// //         <Logo />
// //         <EmailForm />
// //         <PasswordForm />
// //       </div>
// //     </div>
// //   );
// // };

// // export default ForgotPassword;
