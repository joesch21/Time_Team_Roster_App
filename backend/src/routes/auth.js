import { Router } from 'express';

// Auth routes handle login and other authentication related
// endpoints.  In a production app you would integrate Firebase
// Authentication or your chosen auth provider here.  For the
// skeleton we simply respond with a dummy token for a POST to
// /auth/login.
const router = Router();

router.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: 'Missing email or password' });
  }
  // TODO: authenticate user and generate JWT
  res.json({ token: 'dummy-token', email });
});

router.post('/wallet', (req, res) => {
  const { address, key } = req.body;
  if (!address || !key) {
    return res.status(400).json({ error: 'Missing address or key' });
  }
  // TODO: validate wallet credentials
  res.json({ token: 'wallet-token', email: address });
});

export default router;
