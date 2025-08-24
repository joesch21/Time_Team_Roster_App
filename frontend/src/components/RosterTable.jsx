import React from 'react';

/**
 * RosterTable renders a table of shifts.  Each shift should contain
 * a date, site, start and end time.  The table is simple and
 * responsive; customise it further with your own styling or
 * libraries as required.
 */
function RosterTable({ shifts }) {
  if (!shifts || shifts.length === 0) {
    return <p>No shifts scheduled.</p>;
  }
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Date</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Site</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>Start</th>
          <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc' }}>End</th>
        </tr>
      </thead>
      <tbody>
        {shifts.map((shift, idx) => (
          <tr key={idx}>
            <td style={{ padding: '0.5rem 0' }}>{shift.date}</td>
            <td>{shift.site}</td>
            <td>{shift.start}</td>
            <td>{shift.end}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default RosterTable;