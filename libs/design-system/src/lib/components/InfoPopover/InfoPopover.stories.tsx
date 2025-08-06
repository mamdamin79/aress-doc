import type { Meta, StoryObj } from '@storybook/nextjs';

import { InfoPopover } from './InfoPopover';

// Meta configuration for the InfoPopover component in Storybook
const meta: Meta<typeof InfoPopover> = {
  title: 'Components/InfoPopover', // Defines the title in Storybook's UI
  component: InfoPopover, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof InfoPopover>;

export const Default: Story = {
  args: {
    title: 'upload',
    message:
      'پردازش آرسس اطلاعات مالی را از منابع مختلف جمع‌آوری کرده و آن‌ها را به‌صورت یک فهرست کاربردی به شما نشان می‌دهد. پیشنهادات جستجو بر اساس شباهت با متنی که وارد کرده‌اید و تعداد دفعات جستجوی آن توسط سایر کاربران پردازش آرسس نمایش داده می‌شود. متونی که بیشترین شباهت را به عبارت شما دارند، در اولویت قرار می‌گیرند.',
    button: <button className="bg-brand-300 rounded-md p-2">پیشنهادات</button>,
  },
};
