import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../lib/auth.jsx';
import { login } from '../lib/api.js';
import { loadDecoder } from '../lib/condorEncoder';
import { makeLocalAccount } from '../web3/localSigner.js';

function Login() {
  const { signIn, setWeb3 } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [walletError, setWalletError] = useState(null);
  const [imageFile, setImageFile] = useState(null);
  const [imagePass, setImagePass] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      const data = await login(email, password);
      await signIn({ email: data.email, token: data.token });
    } catch (err) {
      setError(err.message || 'Authentication failed');
    }
  };

  const handleImageLogin = async () => {
    if (!imageFile) return;
    setWalletError(null);
    try {
      const { decodeFromImage } = await loadDecoder();
      const bytes = new Uint8Array(await imageFile.arrayBuffer());
      const { address, key } = decodeFromImage(bytes, imagePass);
      const pk = key.startsWith('0x') ? key : `0x${key}`;
      if (!/^0x[0-9a-fA-F]{64}$/.test(pk)) throw new Error('Invalid private key format');
      const account = makeLocalAccount(pk);
      setWeb3({ type: 'image', address, account });
      await signIn({ email: address, token: 'image' });
    } catch (err) {
      setWalletError(err.message || 'Wallet authentication failed');
    }
  };

  return (
    <div className="container" style={{ maxWidth: '400px', marginTop: '2rem' }}>
      <h2>Sign In to Roster</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div style={{ marginTop: '1rem' }}>
        <p>Or upload wallet image:</p>
        {walletError && <p style={{ color: 'red' }}>{walletError}</p>}
        <input type="file" accept="image/png" onChange={(e) => setImageFile(e.target.files?.[0] || null)} />
        <input
          type="password"
          placeholder="Passphrase"
          value={imagePass}
          onChange={(e) => setImagePass(e.target.value)}
        />
        <button onClick={handleImageLogin}>Login with Image</button>
        <p style={{ marginTop: '0.5rem' }}>
          <Link to="/signup">Create wallet image</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
