import React, { useEffect, useState } from 'react';
import { fetchSwaps } from '../lib/api.js';

/**
 * Swaps page.  This page lists swap requests and would allow users
 * to propose or respond to shift swaps.  The current implementation
 * simply fetches an array of swap objects and displays a message
 * when there are none.  Extend this component to support creating
 * new swap requests and approving/declining them.
 */
function Swaps() {
  const [swaps, setSwaps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await fetchSwaps();
        setSwaps(data);
      } catch (err) {
        setError(err.message || 'Failed to load swaps');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="container">
      <h2>Shift Swaps</h2>
      {loading && <p>Loading…</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!loading && !error && swaps.length === 0 && <p>No swap requests.</p>}
      {!loading && swaps.length > 0 && (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {swaps.map((swap, idx) => (
            <li key={idx} className="card" style={{ marginBottom: '0.5rem' }}>
              Swap {swap.id}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Swaps;