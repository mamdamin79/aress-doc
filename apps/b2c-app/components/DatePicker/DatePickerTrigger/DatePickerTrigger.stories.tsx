import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePickerTrigger } from './DatePickerTrigger';

// Meta configuration for the DatePickerTrigger component in Storybook
const meta: Meta<typeof DatePickerTrigger> = {
  title: 'Components/DatePickerTrigger', // Defines the title in Storybook's UI
  component: DatePickerTrigger, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePickerTrigger>;

// A default story for the DateText component
export const Default: Story = {
  args: {
    title: ['تاریخ واریز', 'تاریخ برداشت'],
    mode: 'range',
  },
};

export const Active: Story = {
  args: {
    title: ['تاریخ واریز', 'تاریخ برداشت'],
    mode: 'range',
    startDate: {
      day: 1,
      month: 1,
      year: 2023,
    },
    endDate: {
      day: 1,
      month: 1,
      year: 2024,
    },
  },
};
