import React from 'react';
import '../styles/modal.css';

function Modal({ show, onClose, title, children }) {
  if (!show) {
    return null;
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal-btn" onClick={onClose} aria-label="Close modal">X</button>
        <h2>{title}</h2>
        <div>{children}</div>
      </div>
    </div>
  );
}

export default Modal;
