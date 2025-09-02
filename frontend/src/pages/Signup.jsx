import React, { useState } from 'react';
import { loadEncoder } from '../lib/condorEncoder';

export default function Signup() {
  const [pass, setPass] = useState('');
  const [pass2, setPass2] = useState('');
  const [png, setPng] = useState(null);
  const [info, setInfo] = useState(null);

  const pickImage = (e) => setPng(e.target.files?.[0] || null);

  const generate = async () => {
    const enc = await loadEncoder();
    const wallet = await enc.generateWallet();
    setInfo(wallet);
  };

  const embed = async () => {
    if (!info || !png) return alert('Generate wallet and choose a PNG');
    if (pass.length < 8) return alert('Passphrase must be at least 8 chars');
    if (pass !== pass2) return alert('Passphrases do not match');
    if (png.type !== 'image/png') return alert('Only PNG images supported');
    const bytes = new Uint8Array(await png.arrayBuffer());
    const enc = await loadEncoder();
    const outBytes = await enc.embedWithPassword(bytes, info.key, pass);
    const blob = new Blob([outBytes], { type: 'image/png' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'wallet_image.png';
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div style={{ maxWidth: 560, margin: '2rem auto' }}>
      <h2>Create Wallet Image</h2>
      <button onClick={generate}>Generate Wallet</button>
      {info && <p>Address: {info.address}</p>}
      <input
        type="password"
        placeholder="Passphrase"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <input
        type="password"
        placeholder="Confirm"
        value={pass2}
        onChange={(e) => setPass2(e.target.value)}
      />
      <input type="file" accept="image/png" onChange={pickImage} />
      <button onClick={embed}>Embed into PNG</button>
    </div>
  );
}
