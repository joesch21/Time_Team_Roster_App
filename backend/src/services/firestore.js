// Firestore service.  This module would initialize the Firebase
// Admin SDK and expose functions for reading/writing users,
// timesheets, shifts, and swaps.  For the skeleton we leave the
// implementation empty and note where configuration would go.

/*
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
const app = initializeApp({
  credential: cert(serviceAccount)
});

export const db = getFirestore(app);
*/

// Example function signature for fetching a user's roster
export async function getRosterForUser(uid) {
  // TODO: query Firestore for shifts belonging to uid
  return [];
}

// Example function signature for fetching a user's timesheet
export async function getTimesheetForUser(uid, month) {
  // TODO: query Firestore for timesheet entries by uid and month
  return [];
}

// Example function signature for writing a clock event
export async function writeClockEvent(uid, event) {
  // TODO: write event to Firestore and handle concurrency
  return { success: true };
}