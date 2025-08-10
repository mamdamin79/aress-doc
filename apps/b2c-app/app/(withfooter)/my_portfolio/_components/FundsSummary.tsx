'use client';
import { MyFundsTable, Piechart } from '../../../../components';
import { Tabs } from 'design-system';
import React, { useState } from 'react';

interface FundsSummaryProps {
  hiddenContent?: boolean;
}

export const FundsSummary: React.FC<FundsSummaryProps> = ({
  hiddenContent = false,
}) => {
  const [activeTab, setActiveTab] = useState(0);
  return (
    <div className="flex w-full flex-col gap-6">
      <div className="text-xl font-medium">خلاصه دارایی</div>
      <div className="flex flex-row items-center justify-end gap-8">
        <Tabs
          className="pt-2"
          tabs={[
            { id: 'rial', title: 'ریال' },
            { id: 'toman', title: 'تومان' },
          ]}
          variant="sliding"
          activeTab={activeTab}
          onClickTab={setActiveTab}
        />
        <div className="text-text-brand-primary-600 w-[300px]">
          <div className="font-medium">وزن دارایی</div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <MyFundsTable
          hiddenContent={hiddenContent}
          data={[
            {
              typeID: 1, // درآمد ثابت
              dailyValue: 156785000, // ارزش روزانه (Current daily value in Rials)
              userInvestValue: 150000000, // سرمایه کاربر (User's original investment in Rials)
              profitLoss: 6785000, // سود/زیان (Profit/Loss in Rials)
              profitLossPercentage: 4.52, // درصد سود/زیان (Profit/Loss percentage)
              fundWeight: 3, // تعداد صندوق (Number of funds)
              fundWeightPercentage: 42.5, // درصد وزن (Weight percentage of total portfolio)
            },
            {
              typeID: 0, // سهامی
              dailyValue: 89450000, // ارزش روزانه
              userInvestValue: 95000000, // سرمایه کاربر
              profitLoss: -5550000, // زیان (Loss)
              profitLossPercentage: -5.84, // درصد زیان
              fundWeight: 2, // تعداد صندوق
              fundWeightPercentage: 24.3, // درصد وزن
            },
            {
              typeID: 2, // مختلط
              dailyValue: 73920000, // ارزش روزانه
              userInvestValue: 70000000, // سرمایه کاربر
              profitLoss: 3920000, // سود (Profit)
              profitLossPercentage: 5.6, // درصد سود
              fundWeight: 4, // تعداد صندوق
              fundWeightPercentage: 20.1, // درصد وزن
            },
            {
              typeID: 3, // کالایی
              dailyValue: 48150000, // ارزش روزانه
              userInvestValue: 45000000, // سرمایه کاربر
              profitLoss: 3150000, // سود
              profitLossPercentage: 7.0, // درصد سود
              fundWeight: 1, // تعداد صندوق
              fundWeightPercentage: 13.1, // درصد وزن
            },
          ]}
        />
        <div className="flex h-[356px] w-[300px] items-center justify-center">
          <Piechart
            data={[
              { name: 'درآمد ثابت', value: 156785000 }, // Matches dailyValue from fund type 1
              { name: 'سهامی', value: 89450000 }, // Matches dailyValue from fund type 0
              { name: 'مختلط', value: 73920000 }, // Matches dailyValue from fund type 2
              { name: 'کالایی', value: 48150000 }, // Matches dailyValue from fund type 3
            ]}
            state="default"
          />
        </div>
      </div>
    </div>
  );
};
