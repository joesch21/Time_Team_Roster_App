/**
 * API client functions.  These functions abstract calls to the
 * backend.  In a real application these would make HTTP requests
 * against your Express server or Cloud Functions.  Here we provide
 * simple stubs returning static data so the UI can render without
 * a live backend.
 */

// Example roster data used by the roster page.  Each object
// represents a single shift with a date, site and start/end times.
const exampleRoster = [
  { date: '2025-08-25', site: 'Site A', start: '09:00', end: '17:00' },
  { date: '2025-08-26', site: 'Site B', start: '10:00', end: '18:00' },
  { date: '2025-08-27', site: 'Site A', start: '09:00', end: '17:00' }
];

// Example timesheet events used by the timesheet page.
const exampleTimesheet = [
  { date: '2025-08-25', type: 'clockIn', time: '09:02', site: 'Site A' },
  { date: '2025-08-25', type: 'clockOut', time: '16:55', site: 'Site A' },
  { date: '2025-08-26', type: 'clockIn', time: '10:05', site: 'Site B' },
  { date: '2025-08-26', type: 'clockOut', time: '18:03', site: 'Site B' }
];

/**
 * Fetch the user's roster.  Replace this with a real API call to
 * your backend.  Returns a promise that resolves with an array of
 * shift objects.
 */
export async function fetchRoster() {
  // simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 300));
  return exampleRoster;
}

/**
 * Fetch the user's timesheet events for the current month.  Replace
 * this with a call to your backend /timesheet endpoint.  Returns
 * an array of timesheet entries.
 */
export async function fetchTimesheet() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return exampleTimesheet;
}

/**
 * Submit a clock‑in or clock‑out event to the backend.  This stub
 * simply logs the event to the console; in production it would
 * POST to your Express route.  Returns a resolved promise.
 */
export async function submitClockEvent(event) {
  console.log('submitClockEvent', event);
  // In a real implementation you would fetch('/api/clock', {method: 'POST', body: JSON.stringify(event)})
  return { success: true };
}

/**
 * Fetch swap requests.  Returns an empty array for now.
 */
export async function fetchSwaps() {
  await new Promise((resolve) => setTimeout(resolve, 300));
  return [];
}