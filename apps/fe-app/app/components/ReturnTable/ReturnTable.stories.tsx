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
    {
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
    {
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
  ],
  idKey: 'id',
};

export const Default: Story = {
  name: 'Default Table',
  args: {
    data: mockTableData,
  },
};
