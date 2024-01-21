// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;

// import {Script} from "forge-std/Script.sol";
import {CdAPI} from "../src/cdAPI.sol";

contract deploy  {
    function run() public returns (CdAPI) {
        vm.startBroadcast();
        CdAPI api = new CdAPI();
        vm.stopBroadcast();
        return api;
    }
}
