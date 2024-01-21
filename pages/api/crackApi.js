const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
const port = process.env.PORT || 3001;

// Configure CORS options
const corsOptions = {
  origin: 'http://localhost:3000', // or use '*' to allow all origins
  credentials: true, // if your response includes cookies or other credentials
};

// Use cors middleware with options
app.use(cors(corsOptions));

// External API key
const externalApiKey = '3041b6e2-2cac-4073-b524-a42083aa74df'; // Replace 'your_external_api_key' with your actual API key

// Proxy request to external API using Axios
app.get('/get-jobs', async (req, res) => {
  try {
    const apiUrl = 'https://api.crackeddevs.com/api/get-jobs';

    const { limit = 30, page = 1 } = req.query;
    
    const response = await axios.get(apiUrl, {
      params: {
        limit,
        page,
      },
      headers: {
        'api-key': externalApiKey,
        // ... other headers if needed
      },
    });

    const data = response.data;
    // console.log(data)
    res.send(data);
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).send({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
