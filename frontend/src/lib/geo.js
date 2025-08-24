/**
 * Calculate the great circle distance between two coordinates using
 * the Haversine formula.  Returns the distance in metres.  This
 * utility is used to determine how far a worker is from a job site
 * when checking in or out.  The calculation assumes the Earth is
 * a sphere with radius 6,371 kilometres.
 *
 * @param {number} lat1 Latitude of the first point in decimal degrees
 * @param {number} lon1 Longitude of the first point in decimal degrees
 * @param {number} lat2 Latitude of the second point in decimal degrees
 * @param {number} lon2 Longitude of the second point in decimal degrees
 * @returns {number} Distance between the two points in metres
 */
export function calculateDistance(lat1, lon1, lat2, lon2) {
  const toRad = (deg) => (deg * Math.PI) / 180;
  const R = 6371000; // Earth radius in metres
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}