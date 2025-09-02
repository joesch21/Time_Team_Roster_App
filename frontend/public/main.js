// main.js  (ESM)
// Drop-in hardened encoder logic for image-based wallet creation.

import initEncoder, {
  generate_wallet,
  embed_key_in_image_with_password
} from './pkg/condor_encoder.js';

// ==== Adjust selectors here if your HTML uses different IDs ====
const SEL = {
  genBtn: '#generate-btn',
  pass1: '#pass-1',
  pass2: '#pass-2',
  file:  '#png-input',         // <input type="file" accept="image/png">
  embed: '#embed-btn',
  addr:  '#address-out',
  status:'#status'
};
// ===============================================================

let wallet = null;     // { address, key } – kept in memory only
let lastBlobUrl = null;

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

function downloadBlob(bytes, name) {
  const blob = new Blob([bytes], { type: 'image/png' });
  if (lastBlobUrl) URL.revokeObjectURL(lastBlobUrl);
  lastBlobUrl = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = lastBlobUrl;
  a.download = name;
  a.click();
}

async function onGenerate() {
  try {
    info('Initialising encoder…');
    await initEncoder();
    info('Generating wallet…');
    const w = generate_wallet();                // { address, key } from WASM
    w.key = normalizePk(w.key);
    wallet = w;
    setText(SEL.addr, w.address);
    ok('Wallet generated. Choose a PNG and set a passphrase to embed.');
  } catch (e) {
    console.error(e);
    bad(e?.message || String(e));
  }
}

async function onEmbed() {
  try {
    if (!wallet?.key) throw new Error('Generate a wallet first.');
    const p1 = $(SEL.pass1).value;
    const p2 = $(SEL.pass2).value;
    if (p1.length < 8) throw new Error('Passphrase must be at least 8 characters.');
    if (p1 !== p2)     throw new Error('Passphrases do not match.');
    const file = $(SEL.file).files?.[0];
    if (!file) throw new Error('Select a PNG image to embed the wallet.');
    if (!/\.png$/i.test(file.name)) throw new Error('Only PNG files are supported.');

    info('Reading PNG…');
    const bytes = await fileToBytes(file);

    info('Embedding wallet into image…');
    const outBytes = embed_key_in_image_with_password(bytes, wallet.key, p1);

    const outName = `wallet_${wallet.address.slice(0,6)}.png`;
    downloadBlob(outBytes, outName);

    ok('Wallet embedded. Image downloaded. Keep it safe!');
    // scrub inputs AFTER download to avoid empty embeds
    $(SEL.pass1).value = '';
    $(SEL.pass2).value = '';
    $(SEL.file).value = '';
    // Optionally clear wallet from memory when you navigate away.
  } catch (e) {
    console.error(e);
    bad(e?.message || String(e));
  }
}

// ---- Hook up UI ----
window.addEventListener('DOMContentLoaded', () => {
  $(SEL.genBtn).addEventListener('click', onGenerate);
  $(SEL.embed).addEventListener('click', onEmbed);
  setText(SEL.addr, '');
  info('Ready.');
});

