import React from 'react';

const REQUIRED = ['VITE_USE_TESTNET', 'VITE_OPBNB_RPC_TESTNET', 'VITE_CONTRACT_TIMELOG'];

export default function EnvBanner() {
  const missing = REQUIRED.filter((k) => !import.meta.env[k]);
  if (missing.length === 0) return null;
  return (
    <div style={{ background: '#a00', color: '#fff', padding: '0.5rem', textAlign: 'center' }}>
      Missing env vars: {missing.join(', ')}
    </div>
  );
}
