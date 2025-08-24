import React, { useEffect, useState } from 'react';
import { fetchTimesheet } from '../lib/api.js';

/**
 * Timesheet page.  Shows the clock in/out events for the current
 * month.  Fetches data from the stub API and renders a simple list.
 * An export button is provided to demonstrate where CSV export
 * functionality would live.
 */
function Timesheet() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchTimesheet();
        setEntries(data);
      } catch (err) {
        setError(err.message || 'Failed to load timesheet');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const exportCsv = () => {
    // Generate a CSV string from the entries.  In a real app this
    // would be replaced by a call to the backend or a utility.
    const header = ['Date', 'Type', 'Time', 'Site'];
    const rows = entries.map((e) => [e.date, e.type, e.time, e.site]);
    const csv = [header, ...rows].map((row) => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'timesheet.csv';
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="container">
      <h2>Timesheet</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && (
        <>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {entries.map((e, idx) => (
              <li key={idx} className="card" style={{ marginBottom: '0.5rem' }}>
                {e.date} – {e.type} at {e.time} ({e.site})
              </li>
            ))}
          </ul>
          <button onClick={exportCsv}>Export CSV</button>
        </>
      )}
    </div>
  );
}

export default Timesheet;