import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePickerText } from './DatePickerText';

// Meta configuration for the DateText component in Storybook
const meta: Meta<typeof DatePickerText> = {
  title: 'Components/DateText', // Defines the title in Storybook's UI
  component: DatePickerText, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePickerText>;

// A default story for the DateText component
export const Default: Story = {
  args: {
    title: 'تاریخ واریز',
  },
};

export const Active: Story = {
  args: {
    title: 'تاریخ واریز',
    date: {
      day: 1,
      month: 1,
      year: 2023,
    },
  },
};
