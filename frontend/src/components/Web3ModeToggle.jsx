import React from 'react';

export default function Web3ModeToggle({ mode, setMode }) {
  return (
    <div style={{ marginBottom: '1rem' }}>
      <label style={{ marginRight: '1rem' }}>
        <input
          type="radio"
          value="direct"
          checked={mode === 'direct'}
          onChange={() => setMode('direct')}
        />
        Direct
      </label>
      <label>
        <input
          type="radio"
          value="relayer"
          checked={mode === 'relayer'}
          onChange={() => setMode('relayer')}
        />
        Relayer
      </label>
    </div>
  );
}
