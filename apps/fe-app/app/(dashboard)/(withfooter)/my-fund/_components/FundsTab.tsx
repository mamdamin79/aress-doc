'use client';

import { Tabs } from 'design-system';
import { useState } from 'react';
import { Summary } from './Summary';
import { Risk } from './Risk';
import { Return } from './Return';
import {
  FundReturnAnalysisResponseApiModel,
  FundSummaryBaseInfoApiModel,
  FundSummaryCaseByCaseApiModel,
  FundVideoPlaylistItemApiModel,
} from '@openapi';

type FundTabsProps = {
  summary: {
    points: { date: string; value: number }[];
    defaultQuantity: number;
    defaultValueChange: number;
    defaultPercentageChange: number;
    fundSummaryBasicInfo: FundSummaryBaseInfoApiModel;
    fundSummaryCaseByCase: FundSummaryCaseByCaseApiModel;
    fundVideoPlaylist: Array<FundVideoPlaylistItemApiModel>;
  };
  returnAnalysis: FundReturnAnalysisResponseApiModel;
};

export function FundTabs({ summary, returnAnalysis }: FundTabsProps) {
  const [activeTab, setActiveTab] = useState(1);

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
              fundVideoPlaylist={summary.fundVideoPlaylist}
            />
          ),
        },
        {
          title: 'تحلیل بازدهی',
          id: '1',
          content: <Return data={returnAnalysis} />,
        },
        {
          title: 'ارزیابی ریسک',
          id: '2',
          content: <Risk />,
        },
      ]}
    />
  );
}
