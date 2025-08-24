import React from 'react';

/**
 * Toast component displays a transient notification message.  It
 * accepts a `message` prop and an `onClose` callback to dismiss
 * the toast.  When no message is provided the toast is hidden.
 */
function Toast({ message, onClose }) {
  if (!message) return null;
  return (
    <div
      style={{
        position: 'fixed',
        bottom: '1rem',
        left: '50%',
        transform: 'translateX(-50%)',
        background: '#333',
        color: '#fff',
        padding: '0.5rem 1rem',
        borderRadius: '4px',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      {message}
    </div>
  );
}

export default Toast;