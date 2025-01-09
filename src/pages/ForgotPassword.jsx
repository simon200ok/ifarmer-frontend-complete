import React, { useState } from 'react';
import axios from 'axios';
import './ProfileNPassword.css';

const WelcomeSection = () => {
  return (
    <div className="welcome-section">
      <h2 className="welcome-back">Welcome Back</h2>
      <img className="farmer-pic" src="farmer.png" alt="Farmer" />
    </div>
  );
};

const Logo = () => {
  return (
    <div className="logo">
      <img src="small Farmer logo.png" alt="IFarmr Logo" />
      <h2>IFarmr</h2>
    </div>
  );
};

const EmailForm = () => {
  const [email, setEmail] = useState('');

  const handleEmailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('/api/v1/auth/updateprofile', { email });
      console.log('Email submitted successfully:', response.data);
      alert('Email verification sent successfully!');
    } catch (error) {
      console.error('Error submitting email:', error);
      alert('Failed to send email verification. Please try again.');
    }
  };

  return (
    <form id="email-form" onSubmit={handleEmailSubmit}>
      <div className="forgot-password-email">
        <label htmlFor="email">Email</label>
        <input
          className="forgot-password-inputClass"
          type="email"
          id="email"
          name="email"
          placeholder="address@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          required
        />
      </div>
      <button type="submit">Email Verification</button>
    </form>
  );
};

const PasswordForm = () => {
  const [password1, setPassword1] = useState('');
  const [password2, setPassword2] = useState('');
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();

    if (password1 !== password2) {
      alert('Passwords do not match. Please try again.');
      return;
    }

    try {
      const response = await axios.post('/api/v1/auth/updateprofile', {
        newPassword: password1,
      });
      console.log('Password updated successfully:', response.data);
      alert('Password updated successfully!');
    } catch (error) {
      console.error('Error updating password:', error);
      alert('Failed to update password. Please try again.');
    }
  };

  return (
    <form id="password-form" onSubmit={handlePasswordSubmit}>
      <div className="forgot-password-newpassword">
        <div className="password-group">
          <label htmlFor="new-password">Password</label>
          <div className="password-field">
            <input
              type={showPassword1 ? 'text' : 'password'}
              id="password1"
              name="new-password"
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              required
            />
            <img
              src={showPassword1 ? 'eye-open.png' : 'eye-close.png'}
              alt="Toggle visibility"
              className="eye-icon"
              onClick={() => setShowPassword1(!showPassword1)}
            />
          </div>
        </div>

        <div className="password-group">
          <label htmlFor="confirm-password">Confirm Password</label>
          <div className="password-field">
            <input
              type={showPassword2 ? 'text' : 'password'}
              id="password2"
              name="confirm-password"
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              required
            />
            <img
              src={showPassword2 ? 'eye-open.png' : 'eye-close.png'}
              alt="Toggle visibility"
              className="eye-icon"
              onClick={() => setShowPassword2(!showPassword2)}
            />
          </div>
        </div>
      </div>
      <button type="submit" className="submit-btn">Save Changes</button>
    </form>
  );
};

const ForgotPassword = () => {
  return (
    <div className="container">
      <WelcomeSection />
      <div className="form-section">
        <Logo />
        <EmailForm />
        <PasswordForm />
      </div>
    </div>
  );
};

export default ForgotPassword;
