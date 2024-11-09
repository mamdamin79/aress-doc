import type { Meta, StoryObj } from '@storybook/react';
import { ColoredAnalysisTable } from './ColoredAnalysisTable';

const meta: Meta<typeof ColoredAnalysisTable> = {
  title: 'Components/ColoredAnalysisTable',
  component: ColoredAnalysisTable,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ColoredAnalysisTable>;

export const Default: Story = {
  args: {
    columns: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    rows: ['1403', '1402', '1401', '1400', '1399', 'میانگین', 'انحراف معیار'],
    data: [
      [4.1, 11.0, 7.2, 6.4, null, null, null, null, null, null, null, null],
      [11.3, 5.9, -3.0, 7.8, 5.1, -2.9, -2.2, 8.1, 5.8, 2.6, -1.6, 1.7],
      [12.4, 8.0, -3.0, -2.9, -1.6, 4.9, 6.2, 12.0, -3.1, 4.0, -3.3, 6.3],
      [5.3, 2.1, -7.9, 5.0, 5.9, 6.2, -2.2, 12.3, -3.3, -4.5, 5.5, 6.2],
      [9.4, 6.0, -0.9, -1.6, 5.6, -1.7, 7.7, -5.9, 8.9, 4.8, -7.7, 9],
      [9.4, 6.0, -0.9, -1.6, 5.6, -1.7, 7.7, -5.9, 8.9, 4.8, -4.6, 1],
      [9.4, 6.0, -0.9, -1.6, 5.6, -1.7, 7.7, -5.9, 8.9, 4.8, -2.3, 4],
    ],
  },
};
