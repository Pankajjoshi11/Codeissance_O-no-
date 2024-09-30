import { createRequire } from "module";
const require = createRequire(import.meta.url);
const request = require('request');

export default function handler(req, res) {
  const ALPHAAPI_KEY = process.env.ALPHAAPI_KEY;
  const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=IBM&interval=5min&apikey=${ALPHAAPI_KEY}`;

  request.get({
      url: url,
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, response, data) => {
      if (err) {
        console.error('Error:', err);
        res.status(500).json({ error: 'Failed to fetch stock data' });
      } else if (response.statusCode !== 200) {
        console.error('Status:', response.statusCode);
        res.status(response.statusCode).json({ error: 'Failed to fetch stock data' });
      } else {
        // Successfully fetched data
        res.status(200).json(data);
      }
  });
}
