import React, { useEffect, useState } from 'react';
import RosterTable from '../components/RosterTable.jsx';
import { fetchRoster } from '../lib/api.js';

/**
 * Roster page.  This page displays the user's shifts for a given
 * period.  It fetches shifts from the backend via fetchRoster() and
 * passes them to the RosterTable component.  Errors and loading
 * states are handled locally.
 */
function Roster() {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchRoster();
        setShifts(data);
      } catch (err) {
        setError(err.message || 'Failed to load roster');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2>Roster</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && <RosterTable shifts={shifts} />}
    </div>
  );
}

export default Roster;