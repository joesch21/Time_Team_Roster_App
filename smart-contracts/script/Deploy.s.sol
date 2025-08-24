// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "forge-std/Script.sol";
import { TimesheetLogger } from "../src/TimesheetLogger.sol";

/// @notice Deployment script for TimesheetLogger.  This script can
/// be executed via `forge script` with the appropriate RPC URL and
/// private key to deploy the contract to a network.  After
/// deployment the script prints the contract address.
contract DeployTimesheetLogger is Script {
    function run() external {
        vm.startBroadcast();
        TimesheetLogger logger = new TimesheetLogger();
        vm.stopBroadcast();
        console2.log("TimesheetLogger deployed at", address(logger));
    }
}