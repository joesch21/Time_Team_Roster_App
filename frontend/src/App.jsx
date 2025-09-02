import React from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Login from './pages/Login.jsx';
import Dashboard from './pages/Dashboard.jsx';
import Roster from './pages/Roster.jsx';
import Timesheet from './pages/Timesheet.jsx';
import Swaps from './pages/Swaps.jsx';
import RosterAdmin from './pages/RosterAdmin.jsx';
import Signup from './pages/Signup.jsx';
import { useAuth } from './lib/auth.jsx';
import Toast from './components/Toast.jsx';
import EnvBanner from './components/EnvBanner.jsx';

function App() {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container">Loading…</div>;
  }

  if (!user && location.pathname === '/admin/roster') {
    return (
      <>
        <EnvBanner />
        <RosterAdmin />
        <Toast />
      </>
    );
  }

  if (!user) {
    return (
      <>
        <EnvBanner />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<Login />} />
        </Routes>
        <Toast />
      </>
    );
  }

  return (
    <>
      <EnvBanner />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/roster" element={<Roster />} />
        <Route path="/timesheet" element={<Timesheet />} />
        <Route path="/swaps" element={<Swaps />} />
        <Route path="/admin/roster" element={<RosterAdmin />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Toast />
    </>
  );
}

export default App;
