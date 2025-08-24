# Backend API Reference

This file documents the REST API exposed by the backend server.  The
current implementation provides stubbed responses for demonstration
purposes; replace the examples with real data sources as you build
out the application.

## Base URL

During local development the backend listens on port 5000 by default:

```
http://localhost:5000
```

## Endpoints

### `GET /`

Health check endpoint.  Returns `{ status: "ok" }` when the server is
running.

### `POST /auth/login`

Authenticate a user.  Accepts a JSON body with `email` and
`password` fields.  Returns a JSON object containing a dummy token
and the email address.  In a production system this would return a
JWT or Firebase session cookie.

**Request Body**

```json
{
  "email": "user@example.com",
  "password": "secret"
}
```

**Response**

```json
{
  "token": "dummy-token",
  "email": "user@example.com"
}
```

### `GET /roster`

Retrieve an array of shifts assigned to the current user.  Each shift
contains `date`, `site`, `start` and `end` fields.  Example
response:

```json
[
  { "date": "2025-08-25", "site": "Site A", "start": "09:00", "end": "17:00" },
  { "date": "2025-08-26", "site": "Site B", "start": "10:00", "end": "18:00" }
]
```

### `GET /timesheet`

Return an array of clock in/out events for the current user.  Each
event contains `date`, `type` (clockIn/clockOut), `time` and `site`.

### `GET /swaps`

List shift swap requests.  Currently returns an empty array.

### `POST /relay/clock`

Forward a clock event to the blockchain.  Accepts a JSON body with a
`uid` and an `event` object.  The `event` should include at least
`type`, `ts`, `siteId`, `lat` and `lng`.  Returns a JSON object
containing a fake transaction hash, the hex‑encoded ciphertext and
the keccak256 hash of the event.

**Request Body**

```json
{
  "uid": "user123",
  "event": {
    "type": "clockIn",
    "ts": "2025-08-25T09:00:00.000Z",
    "siteId": "Site A",
    "lat": -33.865143,
    "lng": 151.2099
  }
}
```

**Response**

```json
{
  "txHash": "0x…",
  "ciphertext": "7b226…",
  "hash": "0x…"
}
```