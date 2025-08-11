'use client';
import { cn, FundsSidebar, type FundsSidebarData } from 'design-system';
const data: FundsSidebarData[] = [
  {
    changeValue: 23,
    chartData: {
      data: [
        7, 14, 23, 36, 5, 42, 18, 29, 11, 50, 3, 27, 39, 8, 45, 16, 33, 21, 47,
        12,
      ],
      trend: 'positive',
    },
    title: 'صندوق اهرمی کاریزما',
  },
  {
    changeValue: 45,
    chartData: {
      data: [
        5, 23, 15, 28, 37, 19, 44, 22, 16, 30, 18, 29, 35, 41, 8, 9, 12, 10, 21,
        40,
      ],
      trend: 'positive',
    },
    title: 'سبدگردان ماهان',
  },
  {
    changeValue: -12,
    chartData: {
      data: [
        25, 13, 30, 42, 10, 35, 28, 50, 24, 18, 16, 22, 14, 8, 36, 29, 43, 7, 5,
        21,
      ],
      trend: 'negative',
    },
    title: 'صندوق سرمایه‌گذاری دارا یکم',
  },
  {
    changeValue: 11,
    chartData: {
      data: [
        13, 16, 28, 23, 35, 42, 25, 31, 17, 39, 8, 19, 27, 33, 21, 12, 40, 10,
        15, 38,
      ],
      trend: 'positive',
    },
    title: 'صندوق بازنشستگی سامان',
  },
  {
    changeValue: 37,
    chartData: {
      data: [
        3, 18, 22, 40, 8, 25, 12, 35, 29, 42, 19, 24, 16, 7, 9, 13, 21, 30, 17,
        43,
      ],
      trend: 'positive',
    },
    title: 'صندوق سرمایه‌گذاری پالایش',
  },
  {
    changeValue: -5,
    chartData: {
      data: [
        11, 9, 20, 25, 38, 12, 10, 33, 6, 16, 28, 21, 27, 14, 40, 19, 34, 12,
        31, 24,
      ],
      trend: 'negative',
    },
    title: 'صندوق گلدمن ساکس',
  },
  {
    changeValue: 29,
    chartData: {
      data: [
        8, 14, 25, 35, 10, 20, 17, 38, 42, 50, 23, 15, 5, 18, 32, 28, 21, 9, 40,
        11,
      ],
      trend: 'positive',
    },
    title: 'صندوق سرمایه‌گذاری مشترک آرمان',
  },
  {
    changeValue: 17,
    chartData: {
      data: [
        12, 29, 40, 15, 32, 19, 28, 41, 16, 37, 24, 10, 31, 8, 20, 22, 18, 9,
        33, 13,
      ],
      trend: 'positive',
    },
    title: 'سبدگردان نوین',
  },
  {
    changeValue: 8,
    chartData: {
      data: [
        23, 18, 13, 29, 35, 40, 22, 30, 27, 16, 15, 5, 24, 31, 8, 11, 19, 41,
        34, 12,
      ],
      trend: 'positive',
    },
    title: 'صندوق درآمد ثابت ملت',
  },
  {
    changeValue: -3,
    chartData: {
      data: [
        18, 24, 28, 22, 15, 31, 9, 37, 19, 26, 8, 16, 34, 12, 7, 29, 40, 17, 6,
        13,
      ],
      trend: 'negative',
    },
    title: 'صندوق تک سهم بورس',
  },
];
import React from 'react';
import { useHeaderVisibility } from '@shared';
import { SidebarSkeleton } from './skeletons/SideBarSkeleton';
import { SidebarItemSkeleton } from './skeletons/SidebarItemSkeleton';
import { useDashboardData } from './hooks/useDashboardData';
export const FundsSidebarWrapper: React.FC = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const { isDashboardLoading } = useDashboardData();

  return (
    <div
      className={cn(
        '3xl:block sticky hidden h-fit min-w-[296px] transition-all duration-300 lg:block xl:hidden',
      )}
      style={{
        top: isHeaderVisible ? `104px` : `24px`,
      }}
    >
      {isDashboardLoading ? (
        <SidebarSkeleton>
          {Array.from({ length: 12 }).map((_, idx) => (
            <SidebarItemSkeleton key={idx} />
          ))}
        </SidebarSkeleton>
      ) : (
        <FundsSidebar data={data} />
      )}
    </div>
  );
};
