const express = require('express');
const axios = require('axios');

const app = express();
const port = 3002;

app.get('/public-repos', async (req, res) => {
  try {
    const apiUrl = 'https://api.github.com/search/repositories';

    const response = await axios.get(apiUrl, {
      params: {
        q: 'is:public language:javascript',
      },
    });

    const repos = response.data.items;

    res.json(repos);
  } catch (error) {
    console.error('Error fetching public repositories:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
