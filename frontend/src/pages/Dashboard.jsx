import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CheckInCard from '../components/CheckInCard.jsx';
import Web3ModeToggle from '../components/Web3ModeToggle.jsx';
import WalletBadge from '../components/WalletBadge.jsx';
import { useAuth } from '../lib/auth.jsx';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import { useToast } from '../lib/toastStore.js';

/**
 * Dashboard page.  The main landing page after login that shows a
 * greeting, the check‑in card and navigation links to the other
 * sections of the app (roster, timesheet, swaps).  Users can also
 * sign out via a button.
 */
function Dashboard() {
  const { user, signOut, web3, setWeb3 } = useAuth();
  const [mode, setMode] = useState('relayer');
  const toast = useToast();

  const wipeSession = () => {
    setWeb3(null);
    toast.show('Session key wiped.');
  };

  return (
    <div className="container">
      {user && (
        <div
          style={{
            background: '#eee',
            padding: '10px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <span>Hello, {user.email}!</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <WalletBadge />
            {web3?.type === 'image' ? (
              <button onClick={wipeSession}>Wipe Session Key</button>
            ) : (
              <ConnectButton />
            )}
          </div>
        </div>
      )}
      <h2>Dashboard</h2>
      <Web3ModeToggle mode={mode} setMode={setMode} />
      <CheckInCard mode={mode} />
      <nav style={{ marginTop: '1rem', display: 'flex', gap: '1rem' }}>
        <Link to="/roster">Roster</Link>
        <Link to="/timesheet">Timesheet</Link>
        <Link to="/swaps">Swaps</Link>
        <button onClick={signOut}>Sign Out</button>
      </nav>
    </div>
  );
}

export default Dashboard;
