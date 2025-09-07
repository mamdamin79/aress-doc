'use client';

import { Tabs } from 'design-system';
import { useState } from 'react';
import { Summary } from './Summary';
import { ReturnAnalysis } from './ReturnAnalysis';
import { RiskAssessment } from './RiskAssesment';
import {
  FundSummaryBaseInfoApiModel,
  FundSummaryCaseByCaseApiModel,
} from '@openapi';

type FundTabsProps = {
  summary: {
    points: { date: string; value: number }[];
    defaultQuantity: number;
    defaultValueChange: number;
    defaultPercentageChange: number;
    fundSummaryBasicInfo: FundSummaryBaseInfoApiModel;
    fundSummaryCaseByCase: FundSummaryCaseByCaseApiModel;
  };
};

export function FundTabs({ summary }: FundTabsProps) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <Tabs
      activeTab={activeTab}
      onClickTab={(newTabId) => {
        setActiveTab(newTabId);
      }}
      variant="lined"
      fullWidthDivider={true}
      tabs={[
        {
          title: 'خلاصه',
          id: '0',
          content: (
            <Summary
              points={summary.points}
              defaultQuantity={summary.defaultQuantity}
              defaultValueChange={summary.defaultValueChange}
              defaultPercentageChange={summary.defaultPercentageChange}
              fundSummaryBasicInfo={summary.fundSummaryBasicInfo}
              fundSummaryCaseByCase={summary.fundSummaryCaseByCase}
            />
          ),
        },
        { title: 'تحلیل بازدهی', id: '1', content: <RiskAssessment /> },
        { title: 'ارزیابی ریسک', id: '2', content: <ReturnAnalysis /> },
      ]}
    />
  );
}
