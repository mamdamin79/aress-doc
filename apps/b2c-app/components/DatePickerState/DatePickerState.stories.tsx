import type { Meta, StoryObj } from '@storybook/nextjs';
import { DatePckerState } from './DatePickerState';

// Meta configuration for the DatePckerState component in Storybook
const meta: Meta<typeof DatePckerState> = {
  title: 'Components/DatePckerState', // Defines the title in Storybook's UI
  component: DatePckerState, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePckerState>;

// A default story for the DatePckerState component
export const Default: Story = {
  args: {
    active: false,
    size: 'small',
    theme: 'default',
  },
};
