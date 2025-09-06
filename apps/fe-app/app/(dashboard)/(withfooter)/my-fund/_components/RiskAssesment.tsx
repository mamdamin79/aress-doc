import { DataList, Icon, Tabs } from 'design-system';
import React, { useState } from 'react';
import { BubbleChart } from './BubbleChart';

export const RiskAssessment = () => {
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
        <BubbleChart
          bubbleData={[
            {
              x: 0.45,
              y: 1300,
              z: 40,
              name: 'قابل معامله ثروت آفرین پاسارگاد',
              nav: '22.7',
            },
            {
              x: 0.55,
              y: 2600,
              z: 50,
              name: 'مشترک یکم سامان',
              nav: '45.7',
            },
            {
              x: 0.7,
              y: 1850,
              z: 45,
              name: 'شاخص سی شرکت بزرگ فیروزه',
              nav: '32.7',
            },
            {
              x: 0.7,
              y: 2000,
              z: 55,
              name: 'قابل معامله هستی بخش آگاه',
              nav: '12.7',
            },
            {
              x: 0.85,
              y: 1500,
              z: 30,
              name: 'تجارت شاخصی کاردان',
              nav: '17.7',
            },
            {
              x: 0.85,
              y: 2100,
              z: 60,
              name: 'مشترک توسعه ملی',
              nav: '27.7',
            },
            {
              x: 1.0,
              y: 2600,
              z: 80,
              name: 'ارزش کاوان آینده',
              nav: '20.7',
            },
            {
              x: 1.0,
              y: 2400,
              z: 65,
              name: 'صندوق سهم آشنا',
              nav: '70.1',
            },
            {
              x: 1.05,
              y: 2200,
              z: 70,
              name: 'مشترک بانک خاورمیانه',
              nav: '52',
            },
            {
              x: 1.15,
              y: 1400,
              z: 35,
              name: 'شاخصی کارآفرین',
              nav: '21.2',
            },
            {
              x: 1.15,
              y: 2500,
              z: 50,
              name: 'مشترک دماوند',
              nav: '26',
            },
          ]}
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
