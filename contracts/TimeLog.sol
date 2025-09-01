// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract TimeLog {
    event Clocked(address indexed worker, uint256 ts, bool isIn, string shiftId, bytes32 attHash);

    function log(address worker, uint256 ts, bool isIn, string calldata shiftId, bytes32 attHash) external {
        emit Clocked(worker, ts, isIn, shiftId, attHash);
    }
}
