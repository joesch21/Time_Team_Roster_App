import { API_BASE } from './config.js';

export async function login(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  });
  if (!res.ok) throw new Error('login_failed');
  return res.json();
}

export async function loginWithWallet(address, key) {
  const res = await fetch(`${API_BASE}/auth/wallet`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ address, key })
  });
  if (!res.ok) throw new Error('wallet_login_failed');
  return res.json();
}

export async function fetchRoster() {
  const res = await fetch(`${API_BASE}/roster`);
  if (!res.ok) throw new Error('roster_fetch_failed');
  return res.json();
}

export async function fetchTimesheet() {
  const res = await fetch(`${API_BASE}/timesheet`);
  if (!res.ok) throw new Error('timesheet_fetch_failed');
  return res.json();
}

export async function fetchSwaps() {
  const res = await fetch(`${API_BASE}/swaps`);
  if (!res.ok) throw new Error('swaps_fetch_failed');
  return res.json();
}

export async function submitClockEvent(event) {
  const res = await fetch(`${API_BASE}/relay/clock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ uid: 'demoUser', event })
  });
  if (!res.ok) throw new Error('relay_failed');
  return res.json();
}
