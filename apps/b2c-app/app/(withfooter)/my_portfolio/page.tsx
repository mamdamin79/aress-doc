import { BarStickyBtn } from '../../../components';
import React from 'react';
import { PortfolioWrapper } from './_components/PortfolioWrapper';

const MyPortfolio = () => {
  return (
    <>
      <div className="text-text-neutral-primary relative flex flex-col gap-1 px-20 pt-6">
        <PortfolioWrapper
          points={[
            { date: '2025-06-28', value: 560000000 },
            { date: '2025-06-29', value: 490000000 },
            { date: '2025-06-30', value: 390000000 },
            { date: '2025-07-01', value: 470000000 },
            { date: '2025-07-02', value: 560000000 },
            { date: '2025-07-03', value: 460000000 },
            { date: '2025-07-04', value: 780000000 },
            { date: '2025-07-05', value: 870000000 },
            { date: '2025-07-06', value: 990000000 },
            { date: '2025-07-07', value: 600000000 },
          ]}
          defaultQuantity={560000000}
          defaultValueChange={100000}
          defaultPercentageChange={5.3}
        />
        <div className="sticky -bottom-7 z-50 flex justify-center pb-[52px] pt-8">
          <BarStickyBtn title="یک صندوق برای سرمایه‌گذاری انتخاب کنید" />
        </div>
      </div>
    </>
  );
};

export default MyPortfolio;
