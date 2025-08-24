import React from 'react';
import { useToast } from '../lib/toastStore.js';

/**
 * Toast component displays a transient notification message.  It
 * accepts a `message` prop and an `onClose` callback to dismiss
 * the toast.  When no message is provided the toast is hidden.
 */
function Toast({ message, onClose }) {
  const store = useToast();
  const msg = message ?? store.message;
  const handleClose = onClose ?? store.clear;
  if (!msg) return null;
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
      onClick={handleClose}
    >
      {msg}
    </div>
  );
}

export default Toast;