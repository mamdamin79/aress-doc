import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';

// Meta configuration for the Tabs component in Storybook
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs', // Defines the title in Storybook's UI
  component: Tabs, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Tabs>;

// examples story for the Tabs component
export const Lined: Story = {
  args: {
    tabs: [
      {
        content: (
          <div className="flex items-center justify-between p-3 rounded-md bg-brand-500 text-white">
            <p>خلاطه</p>
            <p>تحلیل بازدهی</p>
            <p>ارزیابی ریسک</p>
            <p>پرتفوی صندوق</p>
          </div>
        ),
        title: 'خلاصه',
      },
      {
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
        iconLeft: 'a-arrow-down',
        iconRight: 'alarm-clock-off',
      },
      {
        content: 'ارزیابی ریسک',
        title: 'سلام',
        singleIcon: 'align-horizontal-justify-start',
      },
      { content: 'تحلیل عملکرد', title: 'تحلیل عملکرد' },
      { content: 'پرتفوی صندوق', title: 'پرتفوی صندوق' },
      { content: 'نمودار صندوق', title: 'نمودار صندوق' },
    ],
    bgWhite: true,
    style: 'lined',
  },
};

export const Shaped: Story = {
  args: {
    tabs: [
      { content: 'بسته یک ماهه', title: 'یک ماهه' },
      { content: 'بسته سه ماهه', title: 'سه ماهه' },
      { content: 'بسته شش ماهه', title: 'شش ماهه' },
      { content: 'بسته یک ساله', title: 'یک ساله' },
      { content: 'بسته بدون سال', singleIcon: 'calendar-range' },
      {
        content: 'بسته بدون سال',
        title: 'باز زمانی',
        iconRight: 'calendar-range',
      },
    ],
    bgWhite: true,
    style: 'button-shaped',
  },
};

export const Divided: Story = {
  args: {
    tabs: [
      { content: 'نمودار ریال', title: 'ریال' },
      { content: 'نمودار دلار', title: 'دلار' },
      { content: 'نمودار یورو', title: 'یورو' },
    ],
    bgWhite: true,
    style: 'divided-buttons',
  },
};
