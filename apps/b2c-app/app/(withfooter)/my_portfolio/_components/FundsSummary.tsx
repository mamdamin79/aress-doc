'use client';
import { Piechart } from '../../../../components';
import { Tabs } from 'design-system';
import React, { useState } from 'react';

export const FundsSummary: React.FC = () => {
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
        <div className="w-[300px]">
          <div>وزن دارایی</div>
        </div>
      </div>
      <div className="flex flex-row gap-8">
        <Piechart
          data={[
            { name: 'درآمد ثابت', value: 15300000 },
            { name: 'سهامی', value: 8200000 },
            { name: 'مختلط', value: 4200000 },
            { name: 'طلا', value: 3200000 },
          ]}
          state="default"
        />
      </div>
    </div>
  );
};
