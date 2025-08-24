import React, { createContext, useContext, useEffect, useState } from 'react';

// This file provides a very simple authentication context for the
// roster app.  In a real application you would integrate Firebase
// Authentication here (e.g. via initializeApp and getAuth from
// firebase/app and firebase/auth) and subscribe to auth state
// changes.  For the purposes of this skeleton we store the user
// object in localStorage and simulate async calls.

const AuthContext = createContext({});

/**
 * AuthProvider wraps your app and supplies authentication state via
 * React context.  It exposes the current user, a loading flag, and
 * signIn/signOut functions.  The user is persisted in
 * localStorage to survive page refreshes.
 */
export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, read the user from localStorage and clear the loading flag
  useEffect(() => {
    const stored = localStorage.getItem('rosterUser');
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  /**
   * Sign in with email and password.  This stub merely stores the
   * email as the user object; in a real app you would call
   * signInWithEmailAndPassword from Firebase and handle errors.
   */
  const signIn = async (email, password) => {
    // simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300));
    const userObj = { email };
    setUser(userObj);
    localStorage.setItem('rosterUser', JSON.stringify(userObj));
  };

  /**
   * Sign out the current user.  Clears localStorage and resets
   * authentication state.
   */
  const signOut = async () => {
    await new Promise((resolve) => setTimeout(resolve, 100));
    localStorage.removeItem('rosterUser');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

/**
 * Hook to access the authentication context.  Components call
 * `useAuth()` to retrieve the current user, loading status, and
 * signIn/signOut functions.
 */
export function useAuth() {
  return useContext(AuthContext);
}