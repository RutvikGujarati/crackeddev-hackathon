// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "../lib/chainlink/contracts/src/v0.8/ChainlinkClient.sol";
import "../lib/chainlink/contracts/src/v0.8/shared/access/ConfirmedOwner.sol";

contract CrackedDevsJobConsumer is ChainlinkClient, ConfirmedOwner {
    using Chainlink for Chainlink.Request;

    bytes32 public jobId;
    uint256 public fee;
    string public apiKey;
    string public jobData;

    event RequestJobData(bytes32 indexed requestId, string jobData);

    constructor(string memory _apiKey) ConfirmedOwner(msg.sender)  {
        _setPublicChainlinkToken();
        jobId = 0; // Replace with the correct job ID for CrackedDevs API
        fee = 0.1 * 10**18; // Replace with the correct fee for the job
        apiKey = _apiKey;
    }

    function requestJobData() public {
        Chainlink.Request memory req = _buildChainlinkRequest(
            jobId,
            address(this),
            this.fulfill.selector
        );
    
        req._add("get", "https://api.crackeddevs.com/api/get-jobs?limit=1");
    
        // Set the API key in the headers
        req._addBytes("headers", abi.encodePacked("Authorization: ", apiKey));
    
        bytes32 requestId = _sendChainlinkRequest(req, fee);
        // Save the requestId for reference, if needed
    }
    
    function fulfill(bytes32 _requestId, string memory _jobData) public recordChainlinkFulfillment(_requestId) {
        emit RequestJobData(_requestId, _jobData);
        jobData = _jobData; // Save the job data directly in the contract state
        // Handle the job data as needed
    }

    function withdrawLink() public onlyOwner {
        LinkTokenInterface link = LinkTokenInterface(_chainlinkTokenAddress());
        require(
            link.transfer(msg.sender, link.balanceOf(address(this))),
            "Unable to transfer"
        );
    }
}
