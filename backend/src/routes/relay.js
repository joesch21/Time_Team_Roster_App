import { Router } from 'express';
import { encryptEvent, hashEvent, sendToChain } from '../services/crypto.js';

// Relay routes forward timesheet events to the opBNB smart contract.
// They encrypt the event payload, compute a keccak hash and send it
// via the ethers signer.  In this skeleton we return a fake
// transaction hash to simulate a successful relay.
const router = Router();

router.post('/clock', async (req, res) => {
  try {
    const { uid, event } = req.body;
    if (!uid || !event) {
      return res.status(400).json({ error: 'Missing uid or event' });
    }
    // Encrypt and hash the event (stubbed)
    const ciphertext = await encryptEvent(event);
    const hash = await hashEvent(event);
    // Send to blockchain (stubbed)
    const txHash = await sendToChain(uid, hash);
    // Return transaction hash and ciphertext for storage
    res.json({ txHash, ciphertext, hash });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to relay event' });
  }
});

export default router;