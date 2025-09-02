// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TimeLog
 * @notice Minimal immutable time logging: emits events on clock in/out.
 * @dev No access control in this MVP. Anyone can call `log`. You can add
 *      access rules later (msg.sender == worker, or relayer-only, etc).
 */
contract TimeLog {
    event Clocked(
        address indexed worker,
        uint256 timestamp,    // unix seconds
        bool isIn,            // true=clock in, false=clock out
        string shiftId,       // client-defined shift identifier
        bytes32 attHash       // optional attachment hash (e.g., IPFS or opaque ref)
    );

    /**
     * @notice Emit a clock event.
     * @param worker  The worker address (can be msg.sender or a param if relayed)
     * @param ts      Unix timestamp (seconds)
     * @param isIn    true for clock-in, false for clock-out
     * @param shiftId Arbitrary client shift identifier
     * @param attHash Optional 32-byte attachment hash
     */
    function log(
        address worker,
        uint256 ts,
        bool isIn,
        string calldata shiftId,
        bytes32 attHash
    ) external {
        emit Clocked(worker, ts, isIn, shiftId, attHash);
    }
}
