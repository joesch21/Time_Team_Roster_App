import React, { useState } from 'react';
import { generateYear, toCSV, storeRoster, loadRoster } from '../utils/generate-year';
import RecentEvents from '../components/RecentEvents.jsx';

export default function RosterAdmin() {
  const [year, setYear] = useState(2025);
  const [anchor, setAnchor] = useState('2025-09-08'); // Monday
  const [data, setData] = useState(null);
  const [msg, setMsg] = useState('');
  const [csvRows, setCsvRows] = useState(null);

  const onGenerate = () => {
    const d = generateYear({ year: Number(year), anchorMondayISO: anchor });
    setData(d);
    setMsg(`Generated FT:${d.fullTime.length} PT:${d.partTime.length}`);
  };

  const onSave = () => {
    if (!data) return;
    storeRoster(data);
    setMsg('Saved locally');
  };

  const dl = (text, name) => {
    const a = document.createElement('a');
    a.href = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    a.download = name;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const onExportFT = () => data && dl(toCSV(data.fullTime), `fulltime-${data.year}.csv`);
  const onExportPT = () => data && dl(toCSV(data.partTime), `parttime-${data.year}.csv`);
  const onExportJSON = () => data && dl(JSON.stringify(data, null, 2), `roster-${data.year}.json`);
  const onLoad = () => setData(loadRoster(Number(year)));
  const onImport = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    const lines = text.trim().split(/\r?\n/).slice(1); // skip header
    const rows = lines.map((line) => {
      const [date, day, start, end] = line.split(',');
      return { date, day, start, end };
    });
    setData({ year: Number(year), fullTime: rows, partTime: [] });
    setCsvRows(rows);
    setMsg('CSV loaded');
    e.target.value = '';
  };

  return (
    <div style={{maxWidth: 720, margin: '2rem auto'}}>
      <h2>Roster Admin (Local)</h2>
      <label>
        Year:&nbsp;
        <input type="number" value={year} onChange={e => setYear(e.target.value)} />
      </label>
      &nbsp;&nbsp;
      <label>
        Anchor Monday:&nbsp;
        <input type="date" value={anchor} onChange={e => setAnchor(e.target.value)} />
      </label>

      <div style={{marginTop: 12}}>
        <button onClick={onGenerate}>Generate</button>
        <button onClick={onSave} disabled={!data}>Save (local)</button>
        <button onClick={onExportFT} disabled={!data}>Export CSV (FT)</button>
        <button onClick={onExportPT} disabled={!data}>Export CSV (PT)</button>
        <button onClick={onExportJSON} disabled={!data}>Download JSON</button>
        <button onClick={onLoad}>Load saved</button>
        <input type="file" accept=".csv" onChange={onImport} />
      </div>

      <p style={{color:'#0a7'}}>{msg}</p>

      {data && (
        <>
          <h3>Preview (first 14 rows FT / PT)</h3>
          <pre style={{background:'#111', color:'#ddd', padding:8, borderRadius:6, overflow:'auto'}}>
{JSON.stringify({FT: data.fullTime.slice(0,14), PT: data.partTime.slice(0,14)}, null, 2)}
          </pre>
        </>
      )}
      <RecentEvents />
    </div>
  );
}

