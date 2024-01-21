import React, { useState, useEffect } from 'react';
import JobCard from '../Components/Job-card';
import styles from '../../styles/JobCard.module.css'; // Import your CSS file

const JobsAPI = () => {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    // Fetch jobs when the component mounts or when the page changes
    fetchJobs();
  }, [currentPage]);

  const fetchJobs = async () => {
    try {
      const apiKey = process.env.API_KEY;
      const apiUrl = `http://localhost:3001/get-jobs?limit=30&page=${currentPage}`; // Update the URL based on your server endpoint
      
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'api-key': apiKey,
          // ... other headers
        },
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch jobs');
      }

      const data = await response.json();
      setJobs(data);
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
    <div className={styles.job_container}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
    <div className={styles.div}>
    <button className={styles.button1} onClick={handlePreviousPage} disabled={currentPage === 1}>
          Previous Page
        </button>
      <button className={styles.button} onClick={handleNextPage}>Next Page</button>
      </div>
      </>
  );
};

export default JobsAPI;
