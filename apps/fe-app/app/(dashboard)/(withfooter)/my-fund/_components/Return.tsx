import { DataList, Icon, Tabs } from 'design-system';
import React, { useState } from 'react';
import { BubbleChart } from './BubbleChart';
import {
  FundReturnAnalysisResponseApiModel,
  FundReturnAnalysisReturnComparisonApiModel,
  FundReturnAnalysisReturnRankApiModel,
} from '@openapi';
import { ChangeComparisonFunds } from './ChangeComparisonFunds';
import { ReturnTable, TableData } from '../../../../components/ReturnTable';

type ReturnAnalysisProps = {
  data: FundReturnAnalysisResponseApiModel;
};

export const Return: React.FC<ReturnAnalysisProps> = ({ data }) => {
  const initialBubbleData = data.riskReturnAnalysis?.chartItems?.map(
    (item) => ({
      x: item.risk,
      y: item.returnPercent,
      z: item.netAssetsRials / 1e9,
      name: item.abbreviatedName,
      nav: (item.netAssetsRials / 1e9).toFixed(0),
    }),
  );
  const [bubbleData, setBubbleData] = useState(initialBubbleData);

  console.log(data.returnComparison);

  const dataList = [
    {
      key: 'بازده صندوق',
      value: `${data?.returnTrend?.fundReturnInPeriodPercent ?? '-'} ٪`,
    },
    {
      key: 'بازده صندوق‌های سهامی',
      value: `${data?.returnTrend?.stockFundsReturnInPeriodPercent ?? '-'} ٪`,
    },
    {
      key: 'بازده شاخص کل',
      value: `${data?.returnTrend?.tedpixReturnInPeriodPercent ?? '-'} ٪`,
    },
    {
      key: 'بازده اضافه صندوق نسبت به صندوق‌های سهامی',
      value: `${data?.returnTrend?.fundReturnVsStockFundsInPeriodPercent ?? '-'} ٪`,
    },
    {
      key: 'بازده اضافه صندوق نسبت به شاخص کل',
      value: `${data?.returnTrend?.fundReturnVsTedpixInPeriodPercent ?? '-'} ٪`,
    },
    {
      key: 'میانگین اهرم صندوق',
      value: `${data?.returnTrend?.fundAverageLeveragePercent ?? '-'} ٪`,
    },
    {
      key: 'میانگین اهرم صندوق‌های سهامی',
      value: `${data.returnTrend?.stockFundsAverageLeveragePercent ?? '-'} ٪`,
    },
  ];

  const mapApiToTableData = (
    apiData:
      | FundReturnAnalysisReturnComparisonApiModel
      | FundReturnAnalysisReturnRankApiModel,
    type: 'comparison' | 'rank',
  ): TableData => {
    const { tableColumns } = apiData;

    const columns = [
      'شاخص',
      ...tableColumns.map((col) => col.columnLabel),
      'میانگین',
    ];

    if (type === 'comparison') {
      const {
        fundAverageReturnPercent,
        stockFundsAverageReturnPercent,
        tedpixAverageReturnPercent,
        tableColumns: comparisonColumns,
      } = apiData as FundReturnAnalysisReturnComparisonApiModel;

      const rows: TableData['rows'] = [
        {
          type: 'text',
          data: {
            شاخص: 'صندوق',
            ...comparisonColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.fundReturnPercent,
              }),
              {},
            ),
            میانگین: fundAverageReturnPercent,
          },
        },
        {
          type: 'text',
          data: {
            شاخص: 'صندوق های سهامی',
            ...comparisonColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.stockFundsReturnPercent,
              }),
              {},
            ),
            میانگین: stockFundsAverageReturnPercent,
          },
        },
        {
          type: 'text',
          data: {
            شاخص: 'شاخص کل',
            ...comparisonColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.tedpixReturnPercent,
              }),
              {},
            ),
            میانگین: tedpixAverageReturnPercent,
          },
        },
      ];
      return { columns, rows };
    }

    if (type === 'rank') {
      const {
        quarterAverageReturnRank,
        percentAverageReturnRank,
        relativeAverageReturnRank,
        tableColumns: rankColumns,
      } = apiData as FundReturnAnalysisReturnRankApiModel;

      const rows: TableData['rows'] = [
        {
          type: 'indicator',
          data: {
            شاخص: 'رتبه چارکی صندوق',
            ...rankColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.quarterRank,
              }),
              {},
            ),
            میانگین: quarterAverageReturnRank,
          },
        },
        {
          type: 'text',
          data: {
            شاخص: 'رتبه درصدی صندوق',
            ...rankColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.percentRank,
              }),
              {},
            ),
            میانگین: percentAverageReturnRank,
          },
        },
        {
          type: 'indicator',
          data: {
            شاخص: 'رتبه نسبی صندوق',
            ...rankColumns.reduce(
              (acc, col) => ({
                ...acc,
                [col.columnLabel]: col.relativeRank,
              }),
              {},
            ),
            میانگین: relativeAverageReturnRank,
          },
        },
      ];
      return { columns, rows };
    }

    return { columns: [], rows: [] };
  };

  const returnComparisonTableData = data.returnComparison
    ? mapApiToTableData(data.returnComparison, 'comparison')
    : { columns: [], rows: [] };

  const returnRankTableData = data.returnRank
    ? mapApiToTableData(data.returnRank, 'rank')
    : { columns: [], rows: [] };

  const selectedFunds = data.riskReturnAnalysis?.chartItems?.map((item) => ({
    id: `${item.fundId}`,
    label: item.abbreviatedName,
    removable: true,
  }));

  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="mt-12">
      <div className="mb-6 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            روند بازدهی
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2 font-medium">مبنای بازده :</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '0', title: 'ریال' },
              { id: '0', title: 'دلار' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="flex items-start justify-center gap-8">
        <div className="mb-6 flex h-[600px] min-w-[704px] flex-1 items-center justify-center bg-blue-100">
          multiple line chart
        </div>
        <div className="hidden xl:block">
          <DataList
            className="h-[600px] w-[392px]"
            mode="vertical"
            data={dataList}
          />
        </div>
      </div>
      <div className="mb-6 xl:hidden">
        <DataList data={dataList} mode="carousel" />
      </div>
      <div className="mb-11 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">بازه زمانی:</div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'یک ماهه' },
            { id: '2', title: 'سه ماهه' },
            { id: '3', title: 'شش ماهه' },
            { id: '4', title: 'نه ماهه' },
            { id: '4', title: 'یک ساله' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            مقایسه بازدهی
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">تفکیک زمانی:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '0', title: 'روز' },
              { id: '1', title: 'ماه' },
              { id: '2', title: 'سال' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-12 flex h-[280px] w-full items-center justify-center">
        {/* return comparison */}
        <ReturnTable data={returnComparisonTableData} />
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            رتبه بازدهی
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">تفکیک زمانی:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '0', title: 'روز' },
              { id: '1', title: 'ماه' },
              { id: '2', title: 'سال' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-12 flex h-[280px] w-full items-center justify-center">
        {/* return rank */}
        <ReturnTable data={returnRankTableData} />
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            تحلیل ریسک و بازدهی
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">معیار ریسک:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '0', title: 'انحراف معیار' },
              { id: '1', title: 'بتا' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-8 h-[600px] w-full">
        <ChangeComparisonFunds
          selectedFunds={selectedFunds ?? []}
          onDataUpdate={setBubbleData}
        />
        <BubbleChart bubbleData={bubbleData} />
      </div>
      <div className="mb-11 flex items-start justify-center gap-3">
        <div className="text-md mt-2 font-normal">بازه زمانی:</div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
          tabs={[
            { id: '1', title: 'یک ماهه' },
            { id: '2', title: 'سه ماهه' },
            { id: '3', title: 'شش ماهه' },
            { id: '4', title: 'نه ماهه' },
            { id: '4', title: 'یک ساله' },
          ]}
        />
        <div className="bg-surface-neutral-tertiary border-border-neutral-secondary flex h-12 w-12 items-center justify-center rounded-full border">
          <Icon name="calendar-range" size="lg" />
        </div>
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div className="mb-8 flex items-start justify-between">
        <div className="mt-2 flex items-center gap-2">
          <div className="text-text-neutral-primary text-lg font-medium">
            تحلیل اثر فصلی
          </div>
          <div className="text-icon-neutral-secondary">
            <Icon name="info" size="md" />
          </div>
        </div>
        <div className="flex items-start gap-3">
          <div className="text-md mt-2.5 font-normal">جدول بر مبنای:</div>
          <Tabs
            variant="sliding"
            tabs={[
              { id: '0', title: 'صندوق' },
              { id: '1', title: 'شاخص کل' },
            ]}
            activeTab={activeTab}
            onClickTab={(newTabId) => {
              setActiveTab(newTabId);
              console.log('clicked tab id:', newTabId);
            }}
          />
        </div>
      </div>
      <div className="mb-40 flex h-[672px] w-full items-center justify-center bg-gray-200">
        Seasonal effect analysis-V2
      </div>
    </div>
  );
};
