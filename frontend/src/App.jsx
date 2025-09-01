import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roster from './pages/Roster.jsx';
import Timesheet from './pages/Timesheet.jsx';
import Swaps from './pages/Swaps.jsx';
import RosterAdmin from './pages/RosterAdmin.jsx';
import { useAuth } from './lib/auth.jsx';
import Toast from './components/Toast.jsx';

/**
 * Main application component.  It controls whether the user is
 * authenticated (via the useAuth hook) and displays the login page
 * or the protected routes accordingly.  React Router is used to
 * define the pages for dashboard, roster, timesheet and swaps.
 */
function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container">Loading…</div>;
  }

  if (!user && location.pathname === '/admin/roster') {
    return <RosterAdmin />;
  }

  // If no user is signed in, always show the login page.  Once the
  // user is authenticated the rest of the app becomes available.
  if (!user) {
    return <Login />;
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/swaps" element={<Swaps />} />
        <Route path="/admin/roster" element={<RosterAdmin />} />
        {/* Unknown routes redirect to the dashboard */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
