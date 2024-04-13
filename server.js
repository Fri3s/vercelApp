// Install the necessary packages: npm install express cors node-fetch
import express from 'express';
import cors from 'cors';
import fetch from 'node-fetch';

const app = express();
const port = process.env.PORT || 3000;

const allowedOrigins = ['https://burgerfri3s-5c9f2.web.app'];
app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  }
}));

app.get('/fetchWebsite', async (req, res) => {
  const url = req.query.url;

  try {
    const response = await fetch(url);
    const content = await response.text();
    res.send(content);
  } catch (error) {
    console.error('Error fetching website:', error);
    res.status(500).send('Error fetching website.');
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
