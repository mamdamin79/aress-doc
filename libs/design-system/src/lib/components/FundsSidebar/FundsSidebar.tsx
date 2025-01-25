import React from 'react';
import { OptionsDropdown } from '../OptionsDropdown';
import { PrimarySection } from './PrimarySection';
import { NumberSection } from './NumberSection';
import { SparkLine } from '../SparkLine';
export interface FundsSidebarProps {
  data: {
    title: string;
    chartData: {
      data: number[];
      trend: 'positive' | 'negative';
    };
    changeValue: number;
  }[];
}
export const FundsSidebar: React.FC<FundsSidebarProps> = ({ data }) => {
  return (
    <div className="bg-baseBackground flex h-[790px] w-[296px] flex-col items-center overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border-2 border-gray-300 pt-4">
      <div className="shadow-3xl flex w-full flex-col items-center">
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
              {
                text: 'بیشترین بازدهی',
                icon: { name: 'chart-no-axes-column' },
              },
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
        <div className="mt-3 h-0.5 w-[264px] rounded-sm bg-gray-300"></div>
        <div className="grid w-full grid-cols-3 px-4 pt-2 text-xs font-medium text-gray-600">
          <div className="text-right">نام صندوق</div>
          <div className="text-center">نمودار</div>
          <div className="text-left">بازده</div>
        </div>
      </div>
      <div className="grid w-full grid-cols-3 gap-4 px-4 pb-2 pt-3">
        {data.map((item) => (
          <>
            {/* First Row */}
            <div className="flex min-w-24 items-center justify-start">
              <PrimarySection
                primaryText={{
                  mode: 'neutral',
                  text: item.title,
                }}
              />
            </div>
            <div className="flex items-center justify-center">
              <SparkLine
                data={item.chartData.data}
                trend={item.chartData.trend}
              />
            </div>
            <div className="flex items-center justify-end pt-2">
              <NumberSection value={item.changeValue} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
