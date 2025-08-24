import React, { useState, useMemo } from 'react';
import { useGeo } from '../hooks/useGeo.js';
import { calculateDistance } from '../lib/geo.js';
import { submitClockEvent } from '../lib/api.js';
import { useToast } from '../lib/toastStore.js';

/**
 * CheckInCard displays the user's current proximity to the job site and
 * provides buttons to clock in or out.  It uses the useGeo hook to
 * obtain the user's latitude/longitude and calculate the distance
 * against a hard‑coded site location.  Calls to submitClockEvent
 * send the event to the backend stub.  In a real app, the site
 * information would come from the roster and the current check‑in
 * status from the timesheet.
 */
function CheckInCard() {
  const { position, error: geoError } = useGeo();
  const [checkedIn, setCheckedIn] = useState(false);
  const toast = useToast();
  const site = { name: 'Site A', lat: -33.865143, lng: 151.209900 }; // Sydney CBD as example

  // Compute distance to site when position changes.  Returns metres.
  const distance = useMemo(() => {
    if (!position) return null;
    return calculateDistance(position.lat, position.lng, site.lat, site.lng);
  }, [position, site.lat, site.lng]);

  const handleClock = async (type) => {
    if (!position) return;
    if (distance != null && distance > 150) {
      alert('You are too far from the site to clock in/out.');
      return;
    }
    try {
      const res = await submitClockEvent({
        type,
        ts: new Date().toISOString(),
        siteId: site.name,
        lat: position.lat,
        lng: position.lng
      });
      setCheckedIn(type === 'clockIn');
      if (res?.txHash) {
        toast.show(`Checked in ✅ — tx: ${res.txHash.slice(0, 10)}…`);
      }
    } catch (err) {
      toast.show('Check-in failed');
    }
  };

  return (
    <div className="card" style={{ marginTop: '1rem' }}>
      <h3>Check‑In</h3>
      {geoError && <p style={{ color: 'red' }}>{geoError}</p>}
      {distance != null && (
        <p>
          Distance to {site.name}: {distance.toFixed(0)} m
        </p>
      )}
      {!position && !geoError && <p>Locating…</p>}
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={() => handleClock('clockIn')} disabled={checkedIn || distance > 150 || !position}>
          Clock In
        </button>
        <button onClick={() => handleClock('clockOut')} disabled={!checkedIn || distance > 150 || !position}>
          Clock Out
        </button>
      </div>
    </div>
  );
}

export default CheckInCard;