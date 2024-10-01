import { createRequire } from "module";
const require = createRequire(import.meta.url);
const request = require('request');

export default function handler(req, res) {
  const ALPHAAPI_KEY = process.env.ALPHAAPI_KEY;
  const stocks = [
    'RELIANCE.BSE', 
    'TCS.BSE', 
    'INFY.BSE', 
    'HDFCBANK.BSE', 
    'ITC.BSE', 
    'BAJFINANCE.BSE'
  ]; // Added HDFCBANK, ITC, and BAJFINANCE stock symbols
  const stockData = {};

  let completedRequests = 0;

  stocks.forEach((stock) => {
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${stock}&apikey=${ALPHAAPI_KEY}`;

    request.get({
        url: url,
        json: true,
        headers: { 'User-Agent': 'request' }
      }, (err, response, data) => {
        completedRequests++;

        if (err) {
          console.error(`Error fetching data for ${stock}:`, err);
          stockData[stock] = { error: 'Failed to fetch stock data' };
        } else if (response.statusCode !== 200) {
          console.error(`Status for ${stock}:`, response.statusCode);
          stockData[stock] = { error: 'Failed to fetch stock data' };
        } else {
          // Successfully fetched data
          stockData[stock] = data;
        }

        // Once all requests are complete, send the response
        if (completedRequests === stocks.length) {
          res.status(200).json(stockData);
        }
    });
  });
}
