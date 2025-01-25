import React from 'react';
import { OptionsDropdown } from '../OptionsDropdown';

export const FundsSidebar: React.FC = () => {
  return (
    <div className="bg-baseBackground flex h-[790px] w-[296px] flex-col overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border-2 border-gray-300 pt-4">
      <div className="flex w-full justify-center">
        <OptionsDropdown
          dropDownList={[
            { text: 'سهامی', tag: { color: 'green' } },
            { text: 'کالایی', tag: { color: 'yellow' } },
            { text: 'مختلط', tag: { color: 'purple' } },
            { text: 'درآمد ثابت', tag: { color: 'blue' } },
          ]}
          dropDownStyles={{
            anchor: 'bottom',
            bg: 'secondary',
            emphasize: 'high',
            size: 'lg',
            fixedWidth: 264,
          }}
        />
      </div>
      <div className="flex w-full flex-row items-center justify-between px-4">
        <OptionsDropdown
          dropDownList={[
            { text: 'بیشترین بازدهی', icon: { name: 'chart-no-axes-column' } },
            { text: 'بالاترین عملکرد', icon: { name: 'biceps-flexed' } },
            { text: 'بیشترین سود', icon: { name: 'hand-coins' } },
            { text: 'اهرمی‌ترین', icon: { name: 'weight' } },
          ]}
          dropDownStyles={{
            anchor: 'bottom start',
            bg: 'primary',
            emphasize: 'medium',
            size: 'sm',
          }}
        />
        <OptionsDropdown
          dropDownList={[
            { text: 'روزانه' },
            { text: 'هفتگی' },
            { text: 'ماهانه' },
            { text: 'سه ماهه' },
          ]}
          dropDownStyles={{
            anchor: 'bottom start',
            bg: 'primary',
            emphasize: 'medium',
            size: 'sm',
          }}
        />
      </div>
    </div>
  );
};
