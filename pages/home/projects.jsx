import React, { useState } from "react";
import styles from "../../styles/Projects.module.css";
import Navbar from "../Components/Navbar";
import Image from "next/image"
import search from "../../public/search.png";

const YourComponent = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [minStars, setMinStars] = useState("");
  const [topics, setTopics] = useState("");
  const [users, setUsers] = useState("");
  const [languageFilter, setLanguageFilter] = useState("");
  const [issuesFilter, setIssuesFilter] = useState("");
  const [contributionMdFilter, setContributionMdFilter] = useState(false);
  const [openSourceFilter, setOpenSourceFilter] = useState(true);
  const [searchResults, setSearchResults] = useState([]);

  
  const handleSearch = async () => {
    try {
      const queryParts = [];
      if (searchTerm) queryParts.push(searchTerm);
      if (minStars) queryParts.push(`stars:>${minStars}`);
      // if (minForks) queryParts.push(`forks:>${minForks}`);
      // if (updatedWithin) queryParts.push(`pushed:>${updatedWithin}`);
      // if (excludeForks) queryParts.push('fork:false');
      // if (license) queryParts.push(`license:${license}`);
      if (topics) queryParts.push(`topic:${topics}`);
      // if (size) queryParts.push(`size:${size}`);
      // if (fileExtension) queryParts.push(`extension:${fileExtension}`);
      if (users) queryParts.push(`user:${users}`);
      // if (createdWithin) queryParts.push(`created:>${createdWithin}`);

      if (languageFilter) queryParts.push(`language:${languageFilter}`);
      if (issuesFilter) queryParts.push(issuesFilter);
      if (contributionMdFilter) queryParts.push("filename:CONTRIBUTING.md");
      if (openSourceFilter) queryParts.push("is:public");

      const query = queryParts.join(" ");

      const response = await fetch(
        `https://api.github.com/search/repositories?q=${query}&sort=stars&order=desc`
      );
      const data = await response.json();

      setSearchResults(data.items);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      <Navbar />
      <div className={styles.topnav}>
        <div className={styles.search_container}>
          <input
            className={styles.search_input}
            type="text"
            placeholder="Find a Repo..."
            value={searchTerm}
            onChange={handleInputChange}
          />
          <button className={styles.search_button} onClick={handleSearch}>Search
            {/* <img src="/search.png" alt="Search" /> */}
          </button>
        </div>
      </div>
      <div className={styles.filter_container}>
        <label>
          Language :
          <input
            type="text"
            placeholder="Write a language"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          />
        </label>
       
        <label>
          Topics :
          <input
            type="text"
            value={topics}
            onChange={(e) => setTopics(e.target.value)}
          />
        </label>
        <label>
          Issues :
          <input
            type="text"
            placeholder="Count of issues"
            value={issuesFilter}
            onChange={(e) => setIssuesFilter(e.target.value)}
          />
        </label>

      {/* {setUsers ? <h2>error</h2>: console.log("done")} */}
        <label>
        Users : 
          <input 
          className={styles.fileExtension}
            type="text"
            checked={users}
            onChange={(e) => setUsers(e.target.value)}
          />
        </label>
        <label>
          CONTRIBUTING.md :
          <input
            type="checkbox"
            checked={contributionMdFilter}
            onChange={() => setContributionMdFilter(!contributionMdFilter)}
          />
        </label>
        <label>
          MinStar :
          <input
            type="checkbox"
            value={minStars}
            onChange={(e) => setMinStars(e.target.value)}
          />
        </label>
        <label>
          Open Source :
          <input
            type="checkbox"
            checked={openSourceFilter}
            onChange={() => setOpenSourceFilter(!openSourceFilter)}
          />
        </label>
      </div>
      <div className={styles.results_container}>
        <h2>Search Results</h2>
        <br></br>
        <ul>
          {searchResults.map((repo) => (
            <li key={repo.id}>
              <div>
                <h2>{repo.full_name}</h2>
                <br></br>
                <p>{repo.description}</p>
                <br></br>
                <h3>Stars: {repo.stargazers_count}</h3>
                <br></br>
                <p>Date: {repo.created_at}</p>
                <p>Forks: {repo.forks}</p>
                <h4>OPen Issues: {repo.open_issues}</h4>
                <br></br>
                <h3>{repo.language}</h3>
                <br></br>
                <p>
                  <h3>
                    {" "}
                    <a
                      className={styles.text1}
                      href={repo.html_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Start Contributing👉 : GitHub Link
                    </a>
                  </h3>
                </p>
              </div>
              {repo.owner.avatar_url && (
                <image
                  src={repo.owner.avatar_url}
                  alt={`${repo.owner.login}'s avatar`}
                />
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default YourComponent;
