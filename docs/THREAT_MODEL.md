# Threat Model

This document outlines the primary assets, threats and mitigation
strategies for the roster app.  It serves as a starting point for
ongoing security assessments and should be updated as features are
added.

## Assets

* **User credentials** – email addresses and authentication tokens
* **Timesheet data** – clock in/out times, shift assignments
* **Geolocation** – latitude/longitude used for attendance
* **Blockchain logs** – encrypted attendance events and hashes

## Threats

* **Unauthorized access** – attackers gaining access to admin
  interfaces or manipulating shifts
* **Data leakage** – exposure of personal data or location
* **Replay attacks** – re‑submission of clock events to inflate
  timesheets
* **Smart contract misuse** – malicious transactions interfering
  with on‑chain logs

## Mitigations

* Use HTTPS and enforce CORS to prevent man‑in‑the‑middle attacks
* Store sensitive config (Firebase keys, relayer private keys) in
  environment variables and never commit them to source control
* Validate and sanitise all API inputs using zod
* Use JWTs or Firebase session cookies to authenticate API requests
* Encrypt event payloads before writing to the blockchain to
  conceal location and timestamps
* Employ nonces or replay protection in the smart contract and
  backend to prevent duplicate log entries
* Implement least privilege for Firebase rules so that users can
  access only their own timesheets and swap requests

## Future Considerations

As the application evolves, consider conducting formal penetration
tests, integrating automated dependency scanning and adopting a
defence‑in‑depth approach on both the frontend and backend.  Monitor
the opBNB network for contract interactions and watch for unusual
activity.