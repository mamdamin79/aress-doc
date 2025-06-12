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
export const showOnHover: Story = {
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
      searchable: true,
      title: 'انتخاب دسته‌بندی اوراق',
      items: {
        items: [
          {
            id: 11,
            title: 'ذغال سنگ',
          },
        ],
      },
      selectedItemId: 11,
    },
  },
};
export const showSettingsOnly: Story = {
  render: (args) => {
    return <ReportCardBase {...args} />;
  },
  args: {
    compactHeader: true,
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
    optionsListItems: [
      {
        searchable: true,
        title: 'انتخاب دسته‌بندی اوراق',
        items: {
          items: [
            {
              id: 11,
              title: 'ذغال سنگ',
            },
          ],
        },
      },
    ],
  },
};
