import { Router } from 'express';

// Roster routes deliver shift assignments for the current user.  In
// production these would query a database (e.g. Firestore) based
// on the authenticated user.  For this skeleton we return static
// sample data.
const router = Router();

// Example roster data.  This should be replaced with calls to the
// firestore service in src/services/firestore.js.
const exampleRoster = [
  { date: '2025-08-25', site: 'Site A', start: '09:00', end: '17:00' },
  { date: '2025-08-26', site: 'Site B', start: '10:00', end: '18:00' },
  { date: '2025-08-27', site: 'Site A', start: '09:00', end: '17:00' }
];

router.get('/', (req, res) => {
  res.json(exampleRoster);
});

export default router;