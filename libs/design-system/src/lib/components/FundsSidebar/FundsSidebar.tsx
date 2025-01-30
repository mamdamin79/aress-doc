import React, { useRef, useState, useEffect } from 'react';
import { OptionsDropdown } from '../OptionsDropdown';
import { PrimarySection } from './PrimarySection';
import { NumberSection } from './NumberSection';
import { SparkLine } from '../SparkLine';
import { cn } from '../../../utils/classNames.utils';
import { CustomTriggerWithoutLogo } from './CustomTriggerWithoutLogo';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const listContainerRef = useRef<HTMLDivElement>(null);
  const [scrollTopPosition, setScrollTopPosition] = useState(0);
  const handleScroll = () => {
    if (listContainerRef.current) {
      const { scrollTop } = listContainerRef.current;
      setScrollTopPosition(scrollTop);
    }
  };
  // Update container width when the component mounts or when the window resizes
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.clientWidth);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div
      className="bg-baseBackground flex h-[490px] w-full min-w-[296px] flex-col items-center overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border-2 border-gray-300 pt-4"
      ref={containerRef}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center transition-all',
          scrollTopPosition > 0 && 'shadow-3xl',
        )}
      >
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
              bg: 'primary',
              emphasize: 'high',
              size: 'lg',
              fixedWidth: containerWidth ? containerWidth - 32 : 0, // Apply the width dynamically
            }}
          />
        </div>
        <div className="flex w-full flex-row items-center justify-between px-4 pb-3 pt-2">
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
            customTriggerRender={({ isActive, selectedItem }) => (
              <CustomTriggerWithoutLogo
                isActive={isActive}
                text={selectedItem.text}
              />
            )}
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
        <div className="w-full px-4">
          <div className="h-0.5 w-full rounded-md bg-gray-300"></div>
        </div>
        <div className="grid w-full grid-cols-[1fr_88px_60px] px-4 py-2 text-xs font-medium text-gray-600">
          <div className="text-right">نام صندوق</div>
          <div className="text-center">نمودار</div>
          <div className="text-left">بازده</div>
        </div>
      </div>
      <div
        className="custom-scrollbar grid w-full grid-cols-[1fr_88px_60px] gap-4 overflow-y-scroll px-4"
        ref={listContainerRef}
        onScroll={handleScroll}
      >
        {data.map((item) => (
          <>
            {/* First Row */}
            <div className="flex w-full items-center justify-start overflow-x-hidden">
              <PrimarySection
                primaryText={{
                  mode: 'neutral',
                  text: item.title,
                }}
              />
            </div>
            <div className="flex w-[88px] items-center justify-center">
              <SparkLine
                data={item.chartData.data}
                trend={item.chartData.trend}
              />
            </div>
            <div className="flex w-[60px] items-center justify-end pt-2">
              <NumberSection value={item.changeValue} />
            </div>
          </>
        ))}
      </div>
    </div>
  );
};
