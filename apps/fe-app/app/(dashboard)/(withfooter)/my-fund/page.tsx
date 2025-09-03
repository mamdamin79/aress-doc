'use client';
import { Breadcrumb, Button, FundsLogo, Tabs } from 'design-system';
import { Summary } from './_components/Summary';
import { ReturnAnalysis } from './_components/ReturnAnalysis';
import { RiskAssessment } from './_components/RiskAssessment';
import { useState } from 'react';

export default function FundPage() {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div>
      <div className="mb-7 mr-8 mt-3">
        <Breadcrumb
          items={[
            { icon: 'home' },
            { title: 'صندوق من' },
            { title: 'صندوق سرمایه گذاری سهم اشنا' },
          ]}
        />
      </div>
      <div className="px-8 lg:px-20">
        <div className="mb-6 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between lg:gap-0">
          <div className="flex items-center justify-start gap-2">
            <FundsLogo color="green" src="" hasTag={true} size="md" />
            <div className="text-text-neutral-primary text-xl font-semibold">
              صندوق سرمایه گذاری سهم آشنا (در سهام)
            </div>
          </div>
          <Button
            className="w-[183px]"
            iconRight={{ name: 'plus', size: 'lg' }}
          >
            افزودن به دیده بان
          </Button>
        </div>
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="lined"
          fullWidthDivider={true}
          tabs={[
            {
              title: 'خلاصه',
              id: '0',
              content: (
                <Summary
                  points={[
                    { date: '2025-06-28', value: 307887847 },
                    { date: '2025-06-29', value: 304052816 },
                    { date: '2025-06-30', value: 871942192 },
                    { date: '2025-07-01', value: 117202326 },
                    { date: '2025-07-02', value: 242103982 },
                    { date: '2025-07-03', value: 106557394 },
                    { date: '2025-07-04', value: 699881399 },
                    { date: '2025-07-05', value: 956679485 },
                    { date: '2025-07-06', value: 733212929 },
                    { date: '2025-07-07', value: 588485694 },
                  ]}
                  defaultQuantity={560000000}
                  defaultValueChange={100000}
                  defaultPercentageChange={5.3}
                />
              ),
            },
            { title: 'تحلیل بازدهی', id: '1', content: <ReturnAnalysis /> },
            { title: 'ارزیابی ریسک', id: '2', content: <RiskAssessment /> },
          ]}
        />
      </div>
    </div>
  );
}
