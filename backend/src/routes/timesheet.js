import { Router } from 'express';

// Timesheet routes return clock in/out events for a given user
// and month.  Replace the example data with calls to your
// Firestore or database.  POST /timesheet could also allow
// uploading of timesheets; omitted here.
const router = Router();

const exampleTimesheet = [
  { date: '2025-08-25', type: 'clockIn', time: '09:02', site: 'Site A' },
  { date: '2025-08-25', type: 'clockOut', time: '16:55', site: 'Site A' },
  { date: '2025-08-26', type: 'clockIn', time: '10:05', site: 'Site B' },
  { date: '2025-08-26', type: 'clockOut', time: '18:03', site: 'Site B' }
];

router.get('/', (req, res) => {
  res.json(exampleTimesheet);
});

export default router;