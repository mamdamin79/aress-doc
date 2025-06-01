'use client';
import { ReportCardBase } from 'design-system';
import React from 'react';

export const ReportCardBaseWrapper: React.FC = () => {
  const args = {
    title: 'تایتل (اسم گزارش)',
    switchIcons: {
      items: [
        {
          icon: { name: 'grid-3x3' },
        },
        {
          icon: { name: 'chart-scatter' },
        },
      ],
      onChange(value: number) {
        console.log(value);
      },
      size: 'sm',
      bgWhite: false,
      initialIndex: 1,
    },
    optionsListItems: {
      categories: [
        {
          id: 1,
          title: 'همه',
        },
        {
          id: 2,
          title: 'سهامی',
        },
        {
          id: 3,
          title: 'درآمد ثابت',
        },
        {
          id: 4,
          title: 'کالایی',
        },
        {
          id: 5,
          title: 'مختلط',
        },
        {
          id: 6,
          title: 'دیده بان',
        },
      ],
      items: [
        {
          id: 1,
          title: 'کل ابزارهای مالی',
          categoryId: 1,
        },
        {
          title: 'ذغال سنگ',
          id: 2,
          categoryId: 2,
          priceRials: 11250,
          priceChangePercent: -1.1,
          type: 'سهامی',
        },
        {
          id: 3,

          title: 'آلومینیوم',
          categoryId: 5,
          priceChangePercent: -1.1,
          priceRials: 30000,
          type: 'مختلط',
        },
        {
          id: 4,

          title: 'پتروشیمی',
          categoryId: 6,
          priceChangePercent: 3.5,
          priceRials: 22000,
          type: 'دیده بان',
        },
        {
          id: 5,

          title: 'معدنی',
          categoryId: 2,
          priceChangePercent: 0.5,
          priceRials: 18000,
          type: 'سهامی',
        },
        {
          id: 6,

          title: 'گاز',
          categoryId: 3,
          priceChangePercent: -2.5,
          priceRials: 35000,
          type: 'درآمد ثابت',
        },
        {
          id: 7,

          title: 'برق',
          categoryId: 3,
          priceChangePercent: 4.0,
          priceRials: 15000,
          type: 'درآمد ثابت',
        },
        {
          id: 8,

          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          id: 9,

          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          id: 10,

          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          id: 11,

          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
      ],
    },
  };
  return (
    <div className="shadow-6xl w-[616px] overflow-hidden rounded-2xl border-2 border-gray-200">
      <ReportCardBase {...args} compactHeader />
    </div>
  );
};
