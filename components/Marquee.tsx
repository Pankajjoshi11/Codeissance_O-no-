// src/components/Marquee.tsx

import React, { useEffect, useState } from 'react';

const Marquee: React.FC = () => {
  const [stockData, setStockData] = useState<{ [key: string]: any }>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const response = await fetch('/api/stockdata'); // Assuming your handler is under `/api/stockdata`
        if (!response.ok) {
          throw new Error('Failed to fetch stock data');
        }
        const data = await response.json();
        setStockData(data);
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching stock data:', error);
        setIsLoading(false);
      }
    };

    fetchStockData();
  }, []);

  return (
    <div className="overflow-hidden bg-gray-100 dark:bg-gray-800 py-2">
      <div className="marquee-content flex space-x-10 animate-marquee">
        {isLoading ? (
          <span className="text-lg font-semibold text-black dark:text-white">
            Loading stock data...
          </span>
        ) : (
          Object.keys(stockData).map((stockSymbol) => {
            const stockInfo = stockData[stockSymbol];
            if (stockInfo.error) {
              return (
                <span
                  key={stockSymbol}
                  className="text-lg font-semibold text-red-500 dark:text-red-400"
                >
                  {stockSymbol}: {stockInfo.error}
                </span>
              );
            }

            const timeSeries = stockInfo['Time Series (Daily)'];
            const latestDate = Object.keys(timeSeries)[0];
            const latestData = timeSeries[latestDate];
            const closePrice = latestData['4. close'];

            return (
              <span
                key={stockSymbol}
                className="text-lg font-semibold text-black dark:text-white"
              >
                {stockSymbol}: ${parseFloat(closePrice).toFixed(2)}
              </span>
            );
          })
        )}
      </div>
    </div>
  );
};

export default Marquee;
