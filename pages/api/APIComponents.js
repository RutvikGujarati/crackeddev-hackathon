import React, { useState, useEffect } from 'react';
import JobCard from '../Components/Job-card';
import styles from '../../styles/JobCard.module.css';

const JobsAPI = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch jobs when the component mounts or when the page changes
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      const apiUrl = `https://api.thegraph.com/subgraphs/name/rutvikgujarati/cd-api`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `{
            jobAddeds(first: 10, skip: ${(currentPage - 1) * 10}) {
              degree_required
              created_at
              company
              id
              max_salary_usd
              min_salary_usd
              location_iso
              job_type
              transactionHash
              title
              url
              description
              blockTimestamp
              blockNumber
              CDAPI_id
            }
          }`,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data.data.jobAddeds);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <>
    <h2 className={styles.h2}>Getting job data using decentralized API</h2>
      <div className={styles.job_container}>
        {jobs.map((job) => (
          <JobCard key={job.id} job={job} />
        ))}
      </div>
      <div className={styles.div}>
        <button className={styles.button1} onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
        <button className={styles.button} onClick={handleNextPage}>
          Next Page
        </button>
      </div>
    </>
  );
};

export default JobsAPI;
