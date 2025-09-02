import React, { useEffect, useState } from 'react';
import { createPublicClient, http, parseAbiItem } from 'viem';
import { chain } from '../web3/write.js';

const eventAbi = parseAbiItem(
  'event Clocked(address worker, uint256 timestamp, bool isIn, string shiftId, bytes32 attHash)'
);

export default function RecentEvents() {
  const [events, setEvents] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const client = createPublicClient({ chain, transport: http(chain.rpcUrls.default.http[0]) });
        const latest = await client.getBlockNumber();
        const logs = await client.getLogs({
          address: import.meta.env.VITE_CONTRACT_TIMELOG,
          event: eventAbi,
          fromBlock: latest - 2000n,
          toBlock: latest,
        });
        const evs = logs
          .reverse()
          .slice(0, 10)
          .map((l) => ({
            worker: l.args.worker,
            isIn: l.args.isIn,
            shiftId: l.args.shiftId,
            ts: Number(l.args.timestamp),
          }));
        setEvents(evs);
      } catch (err) {
        setError('Failed to load events');
      }
    }
    load();
  }, []);

  return (
    <div style={{ marginTop: '2rem' }}>
      <h3>Recent On-chain Events</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && events.length === 0 && <p>No events</p>}
      {events.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Worker</th>
              <th>Type</th>
              <th>Shift</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {events.map((e, idx) => (
              <tr key={idx}>
                <td>{e.worker}</td>
                <td>{e.isIn ? 'IN' : 'OUT'}</td>
                <td>{e.shiftId}</td>
                <td>{new Date(e.ts * 1000).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
