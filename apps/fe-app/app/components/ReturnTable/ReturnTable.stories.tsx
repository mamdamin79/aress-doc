import type { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { ReturnTable, TableData } from './ReturnTable'; // Adjust the import path as needed

const meta: Meta<typeof ReturnTable> = {
  title: 'Components/ReturnTable',
  component: ReturnTable,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div className="overflow-x-hidden">
        <Story />
      </div>
    ),
  ],
};

export default meta;

type Story = StoryObj<typeof meta>;

// Mock data that matches the structure of the original image
const mockTableData: TableData = {
  columns: ['عنوان', '۱۳۹۹', '۱۴۰۰', '۱۴۰۱', '۱۴۰۲', '۱۴۰۳', '۱۴۰۴', 'میانگین'],
  rows: [
    {
      data: {
        id: 1,
        عنوان: 'صندوق',
        '۱۳۹۹': null,
        '۱۴۰۰': '۳٪',
        '۱۴۰۱': '۳٪',
        '۱۴۰۲': '۳٪',
        '۱۴۰۳': '۳٪',
        '۱۴۰۴': '۳٪',
        میانگین: '۳٪',
      },
      type: 'text',
    },
    {
      data: {
        id: 2,
        عنوان: 'صندوق های سهامی',
        '۱۳۹۹': null,
        '۱۴۰۰': '۳٪',
        '۱۴۰۱': '۳٪',
        '۱۴۰۲': '۳٪',
        '۱۴۰۳': '۳٪',
        '۱۴۰۴': '۳٪',
        میانگین: '۳٪',
      },
      type: 'text',
    },
    {
      data: {
        id: 3,
        عنوان: 'شاخص کل',
        '۱۳۹۹': null,
        '۱۴۰۰': '۳٪',
        '۱۴۰۱': '۳٪',
        '۱۴۰۲': '۳٪',
        '۱۴۰۳': '۳٪',
        '۱۴۰۴': '۳٪',
        میانگین: '۳٪',
      },
      type: 'text',
    },
    {
      data: {
        id: 3,
        عنوان: 'رتبه چارکی صندوق',
        '۱۳۹۹': 2,
        '۱۴۰۰': 3,
        '۱۴۰۱': 1,
        '۱۴۰۲': 2,
        '۱۴۰۳': 4,
        '۱۴۰۴': 1,
        میانگین: 3,
      },
      type: 'indicator',
    },
  ],
  idKey: 'id',
};

export const Default: Story = {
  name: 'Default Table',
  args: {
    data: mockTableData,
  },
};
