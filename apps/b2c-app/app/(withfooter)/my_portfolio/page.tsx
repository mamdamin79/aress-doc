import { BarStickyBtn, LineChart } from '../../../components';
import React from 'react';
import { TabsWrapper } from './_components';
import { FundsSummary } from './_components/FundsSummary';

const MyPortfolio = () => {
  return (
    <>
      <div className="text-text-neutral-primary flex flex-col gap-1 px-20 pt-6">
        <div className="flex flex-col items-center gap-4 pb-12">
          <h1 className="w-full text-right text-xl font-semibold">دارایی من</h1>
          <div className="bg-surface-brand-200 h-[66px] w-full">
            {/* tooltip for chart */}
          </div>
          <LineChart
            points={[
              { date: '2025-06-28', value: 30788784785779 },
              { date: '2025-06-29', value: 30405281689754 },
              { date: '2025-06-30', value: 87194219214295 },
              { date: '2025-07-01', value: 117202322640183 },
              { date: '2025-07-02', value: 242103985257960 },
              { date: '2025-07-03', value: 106557396483695 },
              { date: '2025-07-04', value: 69988139907382 },
              { date: '2025-07-05', value: 106557396483695 },
              { date: '2025-07-06', value: 69988139907382 },
              { date: '2025-07-07', value: 106557396483695 },
            ]}
          />
          <TabsWrapper />
        </div>
        {/* Funds Summary Section */}
        <FundsSummary />
        <div className="sticky bottom-6 z-50 flex justify-center pb-[52px]">
          <BarStickyBtn title="یک صندوق برای سرمایه‌گذاری انتخاب کنید" />
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
