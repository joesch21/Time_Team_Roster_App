import React from 'react';
import { Link } from 'react-router-dom';
import CheckInCard from '../components/CheckInCard.jsx';
import { useAuth } from '../lib/auth.js';

/**
 * Dashboard page.  The main landing page after login that shows a
 * greeting, the check‑in card and navigation links to the other
 * sections of the app (roster, timesheet, swaps).  Users can also
 * sign out via a button.
 */
function Dashboard() {
  const { user, signOut } = useAuth();

  return (
    <div className="container">
      <h2>Dashboard</h2>
      <p>Welcome {user?.email}</p>
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