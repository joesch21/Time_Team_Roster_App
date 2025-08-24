import React from 'react';

/**
 * SwapRequestModal is a placeholder component for proposing a shift
 * swap.  It displays a simple modal overlay with a message when the
 * `open` prop is true.  Extend this component to include a form
 * for selecting a replacement shift and sending the request to
 * another worker or manager.
 */
function SwapRequestModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
    >
      <div
        style={{
          background: '#fff',
          padding: '1rem',
          borderRadius: '4px',
          width: '90%',
          maxWidth: '400px'
        }}
      >
        <h3>Propose Shift Swap</h3>
        <p>This is a placeholder for the swap request form.</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default SwapRequestModal;