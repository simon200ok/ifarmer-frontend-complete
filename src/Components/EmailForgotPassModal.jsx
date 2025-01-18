import React from "react";
import "./EmailForgotPassModal.css";

function EmailForgotPassModal({ isOpen, onClose, message }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-header">
          <h3>Email Verification</h3>
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="modal-button" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default EmailForgotPassModal;
