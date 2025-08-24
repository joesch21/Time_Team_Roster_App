// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

/// @title TimesheetLogger
/// @notice A minimal smart contract for recording hashed attendance
/// events on chain.  The contract emits an event containing the
/// worker address and keccak256 hash of the event payload.  No
/// on‑chain storage is used; logs provide immutable proof of
/// attendance without revealing private data.
contract TimesheetLogger {
    /// Emitted when a clock event is recorded.  `worker` is the
    /// address associated with the user (e.g. the relayer or a
    /// designated address) and `hash` is the keccak256 hash of the
    /// encrypted event.
    event Logged(address indexed worker, bytes32 hash);

    /// Record an event hash on chain.  Anyone may call this
    /// function; in the future access control could be added.
    /// @param worker The address representing the worker or user
    /// @param hash The keccak256 hash of the attendance event
    function logEvent(address worker, bytes32 hash) external {
        emit Logged(worker, hash);
    }
}