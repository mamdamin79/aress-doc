import React from 'react';
import { MyPortfolioPage } from './_components/MyPortfolioPage';

const MyPortfolio = () => {
  return (
    <MyPortfolioPage
      points={[
        { date: '2025-06-28', value: 123456789 },
        { date: '2025-06-29', value: 234567891 },
        { date: '2025-06-30', value: 345678912 },
        { date: '2025-07-01', value: 456789123 },
        { date: '2025-07-02', value: 567891234 },
        { date: '2025-07-03', value: 678912345 },
        { date: '2025-07-04', value: 789123456 },
        { date: '2025-07-05', value: 891234567 },
        { date: '2025-07-06', value: 912345678 },
        { date: '2025-07-07', value: 987654321 },
      ]}
      defaultQuantity={560000000}
      defaultValueChange={100000}
      defaultPercentageChange={5.3}
    />
  );
};

export default MyPortfolio;
