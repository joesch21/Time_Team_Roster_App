// unlock.js  (ESM)
// Drop-in hardened decoder logic for image-based wallet login.

import initDecoder, {
  decode_wallet_from_image
} from './pkg/condor_wallet.js';

// ==== Adjust selectors here if your HTML uses different IDs ====
const SEL = {
  file:   '#unlock-file',      // <input type="file" accept="image/png">
  pass:   '#unlock-pass',
  btn:    '#unlock-btn',
  addr:   '#unlock-address',
  status: '#unlock-status'
};
// ===============================================================

function $(q) { const el = document.querySelector(q); if (!el) throw new Error(`Missing element ${q}`); return el; }
function setText(q, text) { $(q).textContent = text; }
function ok(msg)   { setText(SEL.status, `✅ ${msg}`); }
function bad(msg)  { setText(SEL.status, `❌ ${msg}`); }
function info(msg) { setText(SEL.status, `ℹ️ ${msg}`); }

function normalizePk(pk) {
  let p = String(pk || '').trim();
  if (!p.startsWith('0x')) p = '0x' + p;
  if (!/^0x[0-9a-fA-F]{64}$/.test(p)) throw new Error('Invalid private key format (need 0x + 64 hex chars)');
  return p;
}

async function fileToBytes(file) {
  const buf = await file.arrayBuffer();
  return new Uint8Array(buf);
}

async function onUnlock() {
  try {
    info('Initialising decoder…');
    await initDecoder();

    const file = $(SEL.file).files?.[0];
    if (!file) throw new Error('Select the wallet PNG image.');
    if (!/\.png$/i.test(file.name)) throw new Error('Only PNG files are supported.');

    const pass = $(SEL.pass).value;
    if (!pass) throw new Error('Enter your passphrase.');

    info('Reading PNG…');
    const bytes = await fileToBytes(file);

    info('Decoding wallet from image…');
    const res = decode_wallet_from_image(bytes, pass); // { address, key } on success
    if (!res || !res.key) throw new Error('No wallet found in this image (wrong file or corrupted).');

    const pk = normalizePk(res.key);
    setText(SEL.addr, res.address);
    ok('Wallet decoded. You can now sign in with this address.');

    // SECURITY: hold pk in memory only; hand it to your app's auth flow here:
    // window.myAppSignIn({ address: res.address, privateKey: pk })

  } catch (e) {
    console.error(e);
    const msg = String(e?.message || e);
    if (/passphrase/i.test(msg) || /authentication/i.test(msg)) {
      bad('Incorrect passphrase. Please try again.');
    } else {
      bad(msg);
    }
  }
}

// ---- Hook up UI ----
window.addEventListener('DOMContentLoaded', () => {
  $(SEL.btn).addEventListener('click', onUnlock);
  setText(SEL.addr, '');
  info('Ready.');
});

