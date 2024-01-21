// components/JobCard.jsx
import React, { useEffect, useState } from "react";
import styles from "../../styles/JobCard.module.css";

const JobCard = ({ job }) => {
  // const [job, setJob] = useState(null);

  useEffect(() => {
    // Assuming you have a function to fetch job data
    const fetchJobData = async () => {
      try {
        // Replace the following line with your actual API call or data fetching logic
        const response = await fetch(
          "https://api.thegraph.com/subgraphs/name/rutvikgujarati/cd-api"
        );
        const data = await response.json();
        setJob(data);
      } catch (error) {
        console.error("Error fetching job data:", error);
      }
    };

    // Call the function to fetch job data
    fetchJobData();
  }, []); // The empty dependency array ensures that this effect runs once when the component mounts

  const isValidImageUrl = (url) => {
    // You can add more robust validation logic if needed
    return url && url.startsWith("http");
  };

  if (!job) {
    // Loading state, or you can render an error message
    return <div>Loading...</div>;
  }

  return (
    <>
      <div className={styles.job_card}>
        <div className={styles.job_details}>
         
          <h3 className={styles.text2}>{job.title}</h3>
          <br></br>
          <p>Company: {job.company}</p>

          <br></br>
          <p>
            Minimum Salary - {job.min_salary_usd}$ - Max-Salary{" "}
            {job.max_salary_usd}
          </p>
          <br></br>
          <p>Job Type: {job.job_type}</p>
          <br></br>
          <p>Location: {job.location_iso ? job.location_iso : "N/A"}</p>
          <br></br>
          <p>Degree Required: {job.degree_required ? "Yes" : "No"}</p>
          {/* <p>{job.technologies}</p> */}
        </div>
        <p className={styles.text1}>
          <a href={job.url} target="_blank" rel="noopener noreferrer">
            Apply Here
          </a>
        </p>
        <div className={styles.job_description}>
          {/* Add description if needed */}
          <p>{job.description}</p>
        </div>
        {/* Add more job details as needed */}
      </div>
    </>
  );
};

export default JobCard;
