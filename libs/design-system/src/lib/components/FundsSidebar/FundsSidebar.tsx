'use client';
import React, { useRef, useState, useEffect } from 'react';
import { OptionsDropdown } from '../OptionsDropdown';
import { PrimarySection } from './PrimarySection';
import { NumberSection } from './NumberSection';
import { SparkLine } from '../SparkLine';
import { cn } from '../../../utils/classNames.utils';
import { CustomTriggerWithoutLogo } from './CustomTriggerWithoutLogo';
import { DropdownCell } from '../OptionsDropdown/OptionsDropdown.types';
export type FundsSidebarData = {
  title: string;
  chartData: {
    data: number[];
    trend: 'positive' | 'negative';
  };
  changeValue: number;
};
export interface FundsSidebarProps {
  data: FundsSidebarData[];
  onCategoryChange?: (categoryID: number) => void;
  onSortOptionChange?: (selectedSortID: number) => void;
  onTimeframeChange?: (selectedTimeframeID: number) => void;
  selectedFundTypeId?: number;
  selectedFundSortParameterId?: number;
  selectedFundSortPeriodId?: number;
  timePeriodList?: {
    id: number;
    text: string;
  }[];
  sortOptionsList?: {
    id: number;
    text: string;
  }[];
}

export const FundsSidebar: React.FC<FundsSidebarProps> = ({
  data,
  onCategoryChange,
  onSortOptionChange,
  onTimeframeChange,
  selectedFundSortParameterId = 0,
  selectedFundSortPeriodId = 0,
  selectedFundTypeId = 0,
  sortOptionsList = [
    {
      id: 1,
      text: 'ماهانه',
    },
  ],
  timePeriodList = [
    {
      id: 1,
      text: 'بیشترین بازدهی',
    },
  ],
}) => {
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
      className="border-border-neutral-primary bg-surface-neutral-primary flex h-[calc(100vh-24px)] w-full flex-col items-center overflow-x-hidden overflow-y-hidden rounded-tl-2xl rounded-tr-2xl border-2 border-b-0 px-1 pt-4"
      ref={containerRef}
    >
      <div
        className={cn(
          'flex w-full flex-col items-center transition-all',
          scrollTopPosition > 0 && 'shadow-3xl',
        )}
      >
        <div className="flex w-full justify-center px-4">
          <OptionsDropdown
            initialSelectedIndex={selectedFundTypeId}
            onChange={(_, selectedID) => onCategoryChange?.(selectedID ?? 0)}
            triggerClassName="text-md font-medium"
            dropDownList={[
              { text: 'سهامی', tag: { color: 'green' }, id: 1 },
              { text: 'مختلط', tag: { color: 'purple' }, id: 2 },
              { text: 'درآمد ثابت', tag: { color: 'blue' }, id: 3 },
              { text: 'کالایی', tag: { color: 'yellow' }, id: 4 },
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
            initialSelectedIndex={selectedFundSortParameterId}
            onChange={(_, selectedID) => onSortOptionChange?.(selectedID ?? 0)}
            dropDownList={sortOptionsList as DropdownCell[]}
            optionClassName="w-full justify-center"
            dropDownStyles={{
              anchor: 'bottom start',
              bg: 'primary',
              emphasize: 'medium',
              size: 'sm',
              checkSelected: true,
            }}
            customTriggerRender={({ isActive, selectedItem }) => (
              <CustomTriggerWithoutLogo
                isActive={isActive}
                text={selectedItem.text}
              />
            )}
          />
          <div className="w-fit">
            <OptionsDropdown
              initialSelectedIndex={selectedFundSortPeriodId}
              triggerClassName="text-sm font-medium"
              onChange={(_, selectedID) => onTimeframeChange?.(selectedID ?? 0)}
              dropDownList={timePeriodList as DropdownCell[]}
              optionClassName="w-full justify-center"
              dropDownStyles={{
                anchor: 'bottom start',
                bg: 'primary',
                emphasize: 'medium',
                size: 'sm',
                checkSelected: true,
              }}
            />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="bg-border-neutral-primary h-0.5 w-full rounded-md"></div>
        </div>
        <div className="text-text-neutral-secondary grid w-full grid-cols-[1fr_61px_45px] gap-4 px-4 py-2 text-xs font-medium">
          <div className="text-right">نام صندوق</div>
          <div className="text-center">نمودار</div>
          <div className="text-left">بازده</div>
        </div>
      </div>
      <div
        className="scrollbar-sm-hidden grid w-full grid-cols-[45px_61px_1fr] gap-4 overflow-x-hidden overflow-y-scroll pl-3 pr-2"
        ref={listContainerRef}
        onScroll={handleScroll}
        dir="ltr"
      >
        {data.map((item, index) => (
          <React.Fragment key={index}>
            <div className="flex w-[45px] items-center justify-start pt-2">
              <NumberSection value={item.changeValue} />
            </div>
            <div className="flex w-[61px] items-center justify-center">
              <SparkLine
                data={item.chartData.data}
                trend={item.chartData.trend}
              />
            </div>
            <div
              className="flex w-full items-center justify-end overflow-x-hidden"
              key={item.title + item.changeValue}
            >
              <PrimarySection
                primaryText={{
                  mode: 'neutral',
                  text: item.title,
                }}
              />
            </div>
          </React.Fragment>
        ))}
      </div>
      <div className="h-4"></div>
    </div>
  );
};
