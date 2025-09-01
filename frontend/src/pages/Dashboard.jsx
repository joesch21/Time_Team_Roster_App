import React from 'react';
import { Link } from 'react-router-dom';
import CheckInCard from '../components/CheckInCard.jsx';
import { useAuth } from '../lib/auth.jsx';
import { ConnectButton } from '@rainbow-me/rainbowkit';

/**
 * Dashboard page.  The main landing page after login that shows a
 * greeting, the check‑in card and navigation links to the other
 * sections of the app (roster, timesheet, swaps).  Users can also
 * sign out via a button.
 */
function Dashboard() {
  const { user, signOut, web3 } = useAuth();

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
          {web3?.type === 'image' ? (
            <span>Image Wallet: {web3.address.slice(0, 10)}…</span>
          ) : (
            <ConnectButton />
          )}
        </div>
      )}
      <h2>Dashboard</h2>
      <CheckInCard />
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
