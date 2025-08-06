import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePickerState } from './DatePickerState';

// Meta configuration for the DatePckerState component in Storybook
const meta: Meta<typeof DatePickerState> = {
  title: 'Components/DatePickerState', // Defines the title in Storybook's UI
  component: DatePickerState, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePickerState>;

// A default story for the DatePckerState component
export const Default: Story = {
  args: {
    active: false,
    size: 'large',
    theme: 'default',
  },
};

export const Active: Story = {
  args: {
    active: true,
    size: 'large',
    theme: 'default',
  },
};
