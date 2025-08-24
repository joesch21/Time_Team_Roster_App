# Apple Policies Compliance

This document summarises the key Apple App Store policies relevant to
the roster app and describes how the project intends to comply with
them.  It is not an exhaustive list; developers should always refer
to the [App Store Review Guidelines](https://developer.apple.com/app-store/review/guidelines/).

## Location and Geofencing

* The app requests location permissions solely to verify attendance at
  work sites.  Background location access is required only in the
  native version when implementing Core Location region monitoring.
* A clear purpose string is provided in `Info.plist` explaining why
  location is collected.

## Push Notifications

* Web notifications are limited to in‑app toasts during the PWA
  phase.  The native app integrates APNs to inform users of shift
  changes and swap approvals.
* Users can opt into notifications; they are not required for core
  functionality.

## Cryptocurrency and Blockchain

* The blockchain component (opBNB) is used strictly for recording
  immutable logs of attendance.  There are no token‑gated features,
  no external purchases or in‑app currencies, and no exchange of
  cryptocurrency.

## Data Privacy

* Personal data (email, timesheet entries) is stored in Firebase
  with appropriate security rules and encryption.
* Encrypted event payloads are written to the chain to avoid
  exposing sensitive information on‑chain.

## Beta / Test Builds

* Test versions should be distributed via TestFlight.  Do not
  distribute test binaries outside of TestFlight or ad‑hoc options.

This document will be updated as the app evolves and as Apple
publishes new guidelines.