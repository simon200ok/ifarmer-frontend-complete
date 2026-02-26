import React from "react";
//Review later - Proptype import
import PropTypes from "prop-types";
import "./EmailForgotPassModal.css";

function ResetPassSuccessModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Password Reset</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={() => window.location.href = 'http://localhost:5173/login'}>
            Go to Log in
          </button>
        </div>
      </div>
    </div>
  );
}
//Review later - Proptype definition
ResetPassSuccessModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  message: PropTypes.string.isRequired,
};

export default ResetPassSuccessModal;
