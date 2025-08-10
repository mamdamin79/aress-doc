'use client';

import React, { useState } from 'react';
import { LineChart } from '../../../../components/Charts/LineChart';
import { AssetInfoBox } from '../../../../components/AssetInfoBox';

interface HoverData {
  date: string;
  value: number;
}

interface PortfolioChartSectionProps {
  points: {
    date: string;
    value: number;
  }[];
  defaultQuantity: number;
  defaultValueChange: number;
  defaultPercentageChange: number;
  hiddenContent?: boolean;
  onToggleHiddenContent?: () => void;
}

export const PortfolioChartSection: React.FC<PortfolioChartSectionProps> = ({
  points,
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
  hiddenContent = false,
  onToggleHiddenContent,
}) => {
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);

  const handleChartHover = (data: HoverData | null) => {
    setHoveredData(data);
  };

  // Use hovered data if available, otherwise use default values
  const displayQuantity = hoveredData ? hoveredData.value : defaultQuantity;

  // For now, we'll keep the same change values when hovering
  // You might want to calculate these based on previous data point
  const displayValueChange = defaultValueChange;
  const displayPercentageChange = defaultPercentageChange;

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex h-[66px] w-full items-center justify-end">
        <AssetInfoBox
          hiddenContent={hiddenContent}
          onToggleHiddenContent={onToggleHiddenContent || (() => {})}
          quantity={displayQuantity}
          valueChange={displayValueChange}
          percentageChange={displayPercentageChange}
        />
      </div>
      <LineChart
        points={points}
        onHover={handleChartHover}
        hiddenContent={hiddenContent}
      />
    </div>
  );
};
