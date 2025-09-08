import { DataList, Icon, Tabs } from 'design-system';
import React, { useState } from 'react';
import { BubbleChart } from './BubbleChart';
import { FundReturnAnalysisResponseApiModel } from '@openapi';

type ReturnAnalysisProps = {
  data: FundReturnAnalysisResponseApiModel;
};

export const Return: React.FC<ReturnAnalysisProps> = ({ data }) => {
  console.log(data);

  const riskReturnAnalysis = {
    riskCriteria: 1,
    calculationPeriod: 1,
    calculationCustomPeriodStartJdate: null,
    calculationCustomPeriodEndJdate: null,
    chartItems: [
      {
        abbreviatedName: 'سهم آشنا',
        risk: 0.9,
        returnPercent: 2800,
        netAssetsRials: 4800000000000,
        colorHex: '#0000ff',
      },
      {
        abbreviatedName: 'در اوراق بهادار مبتنی بر طلای زرین آگاه',
        risk: 0.47163758405947215,
        returnPercent: 1547.5736207303942,
        netAssetsRials: 3721760384157,
        colorHex: '#00ff00',
      },
      {
        abbreviatedName: 'آسمان امید',
        risk: 0.8079829322925767,
        returnPercent: 3111.419257010967,
        netAssetsRials: 9951428931732,
        colorHex: '#00ff00',
      },
      {
        abbreviatedName: 'بانک اقتصاد نوین',
        risk: 0.7690066859730045,
        returnPercent: 3014.172150639745,
        netAssetsRials: 4907296887956,
        colorHex: '#00ff00',
      },
      {
        abbreviatedName: 'گنجینه رفاه',
        risk: 0.585077757097346,
        returnPercent: 2529.583233161694,
        netAssetsRials: 7146046676895,
        colorHex: '#00ff00',
      },
    ],
  };

  const bubbleData = riskReturnAnalysis?.chartItems?.map((item) => ({
    x: item.risk,
    y: item.returnPercent,
    z: item.netAssetsRials / 1e9,
    name: item.abbreviatedName,
    nav: (item.netAssetsRials / 1e9).toFixed(0),
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
            data={[
              {
                key: 'بازده صندوق',
                value: '۴.۳٪',
              },
              {
                key: 'بتا صندوق',
                value: '۱.۳ واحد',
              },
              {
                key: 'واحد های ابطال شده',
                value: '۳۵۶ واحد',
              },
              {
                key: 'واحد های صادر شده',
                value: '۶,۲۵۴ واحد',
              },
              {
                key: 'رنج قیمتی',
                value: '۳,۱۰۰-۳,۳۰۰ ریال',
              },
              {
                key: 'گردش دارایی',
                value: '۱۲٪',
              },
            ]}
          />
        </div>
      </div>
      <div className="mb-6 xl:hidden">
        <DataList
          data={[
            {
              key: 'بازده صندوق',
              value: '۴.۳٪',
            },
            {
              key: 'بتا صندوق',
              value: '۱.۳ واحد',
            },
            {
              key: 'واحد های ابطال شده',
              value: '۳۵۶ واحد',
            },
            {
              key: 'واحد های صادر شده',
              value: '۶,۲۵۴ واحد',
            },
            {
              key: 'رنج قیمتی',
              value: '۳,۱۰۰-۳,۳۰۰ ریال',
            },
            {
              key: 'گردش دارایی',
              value: '۱۲٪',
            },
          ]}
          mode="carousel"
        />
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
      <div className="mb-12 flex h-[280px] w-full items-center justify-center bg-yellow-100">
        table
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
      <div className="mb-12 flex h-[280px] w-full items-center justify-center bg-red-100">
        table
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
      <div className="mb-8 h-[600px] w-full bg-green-100">
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
