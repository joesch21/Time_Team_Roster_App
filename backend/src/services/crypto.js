import { keccak256, toUtf8Bytes } from 'ethers';

/**
 * Encrypt an event payload prior to storing it on chain.  In a
 * production implementation this function would use a secret key
 * (e.g. via jose or node:crypto) and AES‑GCM to encrypt the
 * serialised JSON.  Here we simply convert the object to a hex
 * string to simulate encryption.
 *
 * @param {object} event The event object to encrypt
 * @returns {Promise<string>} A promise resolving with the
 *   "encrypted" hex string
 */
export async function encryptEvent(event) {
  const json = JSON.stringify(event);
  return Buffer.from(json).toString('hex');
}

/**
 * Compute a keccak256 hash of the event payload.  Uses ethers.js to
 * perform the hash on the UTF‑8 bytes of the JSON string.  The
 * resulting hash can be passed to the smart contract to record
 * immutable logs without revealing the plaintext.
 *
 * @param {object} event The event object to hash
 * @returns {Promise<string>} The keccak256 hash as a 0x prefixed
 *   hex string
 */
export async function hashEvent(event) {
  const json = JSON.stringify(event);
  return keccak256(toUtf8Bytes(json));
}

/**
 * Send the hashed event to the blockchain.  In a real
 * implementation this function would obtain a signer (e.g. via
 * ethers.Wallet) and call the TimesheetLogger contract.  For this
 * skeleton we simply return a random transaction hash.
 *
 * @param {string} uid The unique identifier of the user
 * @param {string} hash The keccak256 hash of the event
 * @returns {Promise<string>} A fake transaction hash
 */
export async function sendToChain(uid, hash) {
  // Simulate asynchronous blockchain call
  await new Promise((resolve) => setTimeout(resolve, 500));
  // Return a dummy tx hash
  const randomHex = () => Math.floor(Math.random() * 16).toString(16);
  return '0x' + Array.from({ length: 64 }, randomHex).join('');
}