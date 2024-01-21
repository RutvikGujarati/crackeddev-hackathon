const apiUrl = 'https://api.thegraph.com/subgraphs/name/rutvikgujarati/cd-api';

const fetchData = async () => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: `{
          jobAddeds(first: 10, skip: 0) {
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
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();
    console.log(data.data.jobAddeds);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

// Call the function to fetch and log data
fetchData();
