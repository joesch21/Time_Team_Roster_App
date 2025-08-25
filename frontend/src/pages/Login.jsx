import React, { useState } from 'react';
import { useAuth } from '../lib/auth.jsx';
import { login, loginWithWallet } from '../lib/api.js';
import decodeImageWallet from '../lib/decodeImageWallet.js';

/**
 * Login page.  Uses the useAuth hook to sign in a user via
 * Firebase authentication.  This page is shown whenever there is
 * no authenticated user.  A simple email/password form is provided
 * here; other sign‑in methods (e.g. Apple) can be added later.
 */
function Login() {
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [walletError, setWalletError] = useState(null);

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

  const handleWallet = async (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    setWalletError(null);
    try {
      const { address, privateKey } = await decodeImageWallet(file);
      const data = await loginWithWallet(address, privateKey);
      await signIn({ email: data.email || address, token: data.token });
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
        <input type="file" accept="image/*" onChange={handleWallet} />
      </div>
    </div>
  );
}

export default Login;
