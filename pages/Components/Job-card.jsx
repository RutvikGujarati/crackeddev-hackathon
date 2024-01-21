// components/JobCard.jsx
import React from "react";
import styles from "../../styles/JobCard.module.css";

const JobCard = ({ job }) => {
  const isValidImageUrl = (url) => {
    // You can add more robust validation logic if needed
    return url && url.startsWith("http");
  };

  return (
    <div className={styles.job_card}>
      <div className={styles.job_details}>
        {/* {isValidImageUrl(job.image_url) ? (
          <image
            src={job.image_url}
            alt={job.company}
            className={`${styles.logo} ${styles.topCornerLogo}`}
          />
        ) : (
          <div className={styles.no_logo}>No Logo Available</div>
        )} */}
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
  );
};

export default JobCard;
