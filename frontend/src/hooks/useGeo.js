import { useState, useEffect } from 'react';

/**
 * useGeo is a simple hook that retrieves the user's current
 * geographic location using the browser's Geolocation API.  It
 * exposes the latest position and any error encountered.  The hook
 * requests the location once on mount and does not continuously
 * watch the device to minimise battery usage.  For background
 * geofencing you would implement a watchPosition and rotate
 * geofences on a native platform.
 */
export function useGeo() {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setPosition({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        });
      },
      (err) => {
        // Human readable error messages based on error codes
        switch (err.code) {
          case err.PERMISSION_DENIED:
            setError('Permission to access location was denied');
            break;
          case err.POSITION_UNAVAILABLE:
            setError('Location information is unavailable');
            break;
          case err.TIMEOUT:
            setError('The request to get your location timed out');
            break;
          default:
            setError('An unknown error occurred');
        }
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0 }
    );
  }, []);

  return { position, error };
}