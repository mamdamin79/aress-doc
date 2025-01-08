import type { Meta, StoryObj } from '@storybook/react';
import { ReportCardBase } from './ReportCardBase';
import { useState } from 'react';

// Meta configuration for the ReportCardBase component in Storybook
const meta: Meta<typeof ReportCardBase> = {
  title: 'Components/ReportCardBase', // Defines the title in Storybook's UI
  component: ReportCardBase, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof ReportCardBase>;

// A default story for the ReportCardBase component
export const Default: Story = {
  render: (args) => {
    return <ReportCardBase {...args} />;
  },
  args: {
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
          title: 'ذغال سنگ',
          categoryId: 2,
          priceRials: 11250,
          type: 'سهامی',
        },
        {
          title: 'مس',
        },
        {
          title: 'آلومینیوم',
          categoryId: 5,
          priceChangePercent: -1.1,
          priceRials: 30000,
          type: 'مختلط',
        },
        {
          title: 'پتروشیمی',
          categoryId: 6,
          priceChangePercent: 3.5,
          priceRials: 22000,
          type: 'دیده بان',
        },
        {
          title: 'معدنی',
          categoryId: 2,
          priceChangePercent: 0.5,
          priceRials: 18000,
          type: 'سهامی',
        },
        {
          title: 'گاز',
          categoryId: 3,
          priceChangePercent: -2.5,
          priceRials: 35000,
          type: 'درآمد ثابت',
        },
        {
          title: 'برق',
          categoryId: 3,
          priceChangePercent: 4.0,
          priceRials: 15000,
          type: 'درآمد ثابت',
        },
        {
          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          title: 'شیمیایی',
          categoryId: 4,
          priceChangePercent: 5.0,
          priceRials: 33000,
          type: 'کالایی',
        },
        {
          title: 'برق',
          categoryId: 3,
          priceChangePercent: 4.0,
          priceRials: 15000,
          type: 'درآمد ثابت',
        },
      ],
    },
  },
};
