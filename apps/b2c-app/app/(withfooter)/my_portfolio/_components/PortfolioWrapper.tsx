'use client';

import React, { useState } from 'react';
import { PortfolioChartSection } from './PortfolioChartSection';
import { FundsSummary } from './FundsSummary';
import { TabsWrapper } from './TabsWrapper';

interface PortfolioWrapperProps {
  points: {
    date: string;
    value: number;
  }[];
  defaultQuantity: number;
  defaultValueChange: number;
  defaultPercentageChange: number;
}

export const PortfolioWrapper: React.FC<PortfolioWrapperProps> = ({
  points,
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
}) => {
  const [hiddenContent, setHiddenContent] = useState(false);

  const handleToggleHiddenContent = () => {
    setHiddenContent(!hiddenContent);
  };

  return (
    <>
      <div className="flex flex-col gap-4 pb-12">
        <h1 className="w-full text-right text-xl font-semibold">دارایی من</h1>
        <PortfolioChartSection
          points={points}
          defaultQuantity={defaultQuantity}
          defaultValueChange={defaultValueChange}
          defaultPercentageChange={defaultPercentageChange}
          hiddenContent={hiddenContent}
          onToggleHiddenContent={handleToggleHiddenContent}
        />
        <TabsWrapper />
      </div>
      {/* Funds Summary Section */}
      <FundsSummary hiddenContent={hiddenContent} />
    </>
  );
};
