// src/components/Marquee.tsx

import React from 'react';

const Marquee: React.FC = () => {
  return (
    <div className="overflow-hidden whitespace-nowrap bg-gray-100 dark:bg-gray-800">
      <div className="inline-block animate-marquee py-2">
        <span className="mx-6">AAPL: $145.09 (+1.23%)</span>
        <span className="mx-6">GOOG: $2,812.45 (+0.56%)</span>
        <span className="mx-6">TSLA: $678.90 (-2.12%)</span>
        <span className="mx-6">AMZN: $3,405.80 (+0.82%)</span>
        <span className="mx-6">MSFT: $299.50 (+0.35%)</span>
      </div>
    </div>
  );
};

export default Marquee;
