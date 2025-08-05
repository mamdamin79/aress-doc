'use client';
import React, { useRef, useState, useEffect } from 'react';
import { Button, cn, Icon } from 'design-system';
import { ReactComponent as FundIcon } from './FundIcon.svg';
export interface FundData {
  typeID: number;
  dailyValue: number;
  userInvestValue: number;
  profitLoss: number;
  profitLossPercentage: number;
  fundWeight: number;
  fundWeightPercentage: number;
  isStock?: boolean;
}
const fundTypeMaps: Record<number, { title: string; color: string }> = {
  0: {
    title: 'سهامی',
    color: 'bg-surface-accent-vividgreen-600',
  },
  1: {
    title: 'درآمد ثابت',
    color: 'bg-surface-accent-blue-600',
  },
  2: {
    title: 'مختلط',
    color: 'bg-surface-accent-purple-600',
  },
  3: {
    title: 'کالایی',
    color: 'bg-surface-accent-yellow-600',
  },
};

export interface MyFundsTableProps {
  data: FundData[];
}

export function MyFundsTable({ data }: MyFundsTableProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);

  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };
  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    let atStart = false;
    let atEnd = false;
    atStart = Math.abs(scrollLeft) <= 1;
    atEnd = Math.abs(scrollLeft) >= maxScrollLeft - 1;
    setShowLeftButton(!atEnd);
    setShowRightButton(!atStart);
  };

  useEffect(() => {
    // Add a small delay to ensure DOM is fully rendered
    const timer = setTimeout(() => {
      checkScrollable();
    }, 100);

    const handleResize = () => checkScrollable();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);

  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollable);
      return () =>
        scrollContainer.removeEventListener('scroll', checkScrollable);
    }
  }, []);

  return (
    <div
      className={cn(
        'bg-surface-neutral-background border-border-neutral-secondary relative flex flex-col rounded-2xl border-2 p-7 pt-3',
      )}
    >
      {/* Scroll Left Button */}
      {showLeftButton && (
        <Button
          onClick={handleScrollLeft}
          mode="secondary"
          theme="brand"
          className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll left"
        >
          <Icon name="chevron-left" size="md" />
        </Button>
      )}

      {/* Scroll Right Button */}
      {showRightButton && (
        <Button
          onClick={handleScrollRight}
          mode="secondary"
          theme="brand"
          className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll right"
        >
          <Icon name="chevron-right" size="md" />
        </Button>
      )}

      <div
        ref={scrollContainerRef}
        className="scrollbar-md w-full overflow-x-auto pb-2.5"
      >
        <div className="min-w-[800px]">
          {/* Header */}
          <div className="grid grid-cols-4 gap-4 pb-3">
            <div className="text-text-neutral-primary text-md text-center font-medium">
              نوع صندوق
            </div>
            <div className="text-text-neutral-primary text-md text-center font-medium">
              ارزش روز/سرمایه
            </div>
            <div className="text-text-neutral-primary text-md text-center font-medium">
              سود/بازده
            </div>
            <div className="text-text-neutral-primary text-md text-center font-medium">
              وزن/تعداد
            </div>
          </div>

          {/* Table Body */}
          <div className="border-border-neutral-secondary flex flex-col border-b-2 border-t-2">
            {data.map((fund, i) => (
              <div
                key={fund.typeID}
                className={cn(
                  'relative grid h-[70px] grid-cols-4 items-center gap-4 border-b border-t',
                  i % 2 == 0
                    ? 'bg-surface-neutral-tertiary'
                    : 'bg-surface-neutral-background',
                )}
              >
                {/* Fund Type */}
                <div className="flex w-[200px] items-center justify-start gap-2 pr-5">
                  {fund.isStock ? (
                    <div className="bg-surface-neutral-secondary h-8 w-8 rounded-full"></div>
                  ) : (
                    <FundIcon width={36} height={36} />
                  )}
                  {/* badge */}
                  <div
                    className={cn(
                      'border-border-neutral-oninverse absolute right-5 top-10 h-[10px] w-[10px] rounded-full border',
                      fundTypeMaps[fund.typeID].color,
                    )}
                  ></div>
                  <div className="text-right">
                    <div className="text-text-neutral-primary text-base font-medium">
                      {fundTypeMaps[fund.typeID].title}
                    </div>
                  </div>
                  {/* color line */}
                  <div
                    className={cn(
                      'absolute right-0 top-0 h-[70px] w-1',
                      fundTypeMaps[fund.typeID].color,
                    )}
                  ></div>
                </div>
                {/* Daily Value */}
                <div className="text-center">
                  <div className="text-text-neutral-primary text-base">
                    {fund.dailyValue.toLocaleString('fa-IR')} ریال
                  </div>
                  <div className="text-text-neutral-secondarycontrast text-sm">
                    {fund.userInvestValue.toLocaleString('fa-IR')} ریال
                  </div>
                </div>

                {/* Profit/Loss */}
                <div className="text-center">
                  <div
                    className={cn(
                      'text-base',
                      fund.profitLoss >= 0
                        ? 'text-text-accent-green-primary-600'
                        : 'text-text-accent-red-primary-600',
                    )}
                  >
                    {Math.abs(fund.profitLoss).toLocaleString('fa-IR')} ریال
                  </div>
                  <div
                    className={cn(
                      'text-sm font-medium',
                      fund.profitLoss >= 0
                        ? 'text-text-accent-green-primary-600'
                        : 'text-text-accent-red-primary-600',
                    )}
                  >
                    {Math.abs(fund.profitLossPercentage)}٪
                    {fund.profitLoss >= 0 ? ' + ' : ' - '}
                  </div>
                </div>

                {/* Weight/Count */}
                <div className="text-center">
                  <div className="text-text-neutral-primary text-base">
                    {fund.fundWeightPercentage}٪
                  </div>
                  <div className="text-text-neutral-secondarycontrast text-sm">
                    {fund.fundWeight} صندوق
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
