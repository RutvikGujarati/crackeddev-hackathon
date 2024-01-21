// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract CdAPI {
    struct Job {
        uint256 id;
        string title;
        string company;
        uint256 min_salary_usd;
        uint256 max_salary_usd;
        string location_iso;
        string job_type;
        bool degree_required;
        string description;
        string url;
        string created_at;
    }

    mapping(uint256 => Job) public jobs;
    uint256 public jobCount;

    event JobAdded(
        uint256 indexed id,
        string title,
        string company,
        uint256 min_salary_usd,
        uint256 max_salary_usd,
        string location_iso,
        string job_type,
        bool degree_required,
        string description,
        string url,
        string created_at
    );

    function addJob(
        uint256 id,
        string memory title,
        string memory company,
        uint256 min_salary_usd,
        uint256 max_salary_usd,
        string memory location_iso,
        string memory job_type,
        bool degree_required,
        string memory description,
        string memory url,
        string memory created_at
    ) external {
        jobs[jobCount] = Job(
            id,
            title,
            company,
            min_salary_usd,
            max_salary_usd,
            location_iso,
            job_type,
            degree_required,
            description,
            url,
            created_at
        );
        emit JobAdded(
            id,
            title,
            company,
            min_salary_usd,
            max_salary_usd,
            location_iso,
            job_type,
            degree_required,
            description,
            url,
            created_at
        );
        jobCount++;
    }

//    function getJobDetails(uint256 jobId) external view returns (
//     uint256 id,
//     string memory title,
//     string memory company,
//     uint256 min_salary_usd,
//     uint256 max_salary_usd,
//     string memory location_iso,
//     string memory job_type,
//     bool degree_required,
//     string memory description,
//     string memory url,
//     string memory created_at
// ) {
//     require(jobId < jobCount, "Invalid job ID");

//     Job memory job = jobs[jobId];

//     return (
//         job.id,
//         job.title,
//         job.company,
//         job.min_salary_usd,
//         job.max_salary_usd,
//         job.location_iso,
//         job.job_type,
//         job.degree_required,
//         job.description,
//         job.url,
//         job.created_at
//     );
// }
}


//old contract(mumbai) : 0xEb809716e5fd36dD123e2D5990d313cc47ae296E 

//new contract(mumbai) : 0x6f7fc0e7474A703563eBc70231Df6B83c837D3ce