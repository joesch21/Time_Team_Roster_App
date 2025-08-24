import React, { useState } from 'react';
import { useAuth } from '../lib/auth.js';

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

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await signIn(email, password);
    } catch (err) {
      setError(err.message || 'Authentication failed');
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
    </div>
  );
}

export default Login;