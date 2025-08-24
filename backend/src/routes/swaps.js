import { Router } from 'express';

// Swap routes manage shift swap requests between workers.  The GET
// endpoint lists all swap requests for the current user; in a real
// implementation you would query Firestore.  POST/PUT/DELETE would
// create/update/cancel swap requests respectively.
const router = Router();

router.get('/', (req, res) => {
  // Return an empty array for now
  res.json([]);
});

export default router;