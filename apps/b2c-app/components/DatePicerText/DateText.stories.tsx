import type { Meta, StoryObj } from '@storybook/nextjs';
import { DateText } from './DateText';

// Meta configuration for the DateText component in Storybook
const meta: Meta<typeof DateText> = {
  title: 'Components/DateText', // Defines the title in Storybook's UI
  component: DateText, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DateText>;

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
