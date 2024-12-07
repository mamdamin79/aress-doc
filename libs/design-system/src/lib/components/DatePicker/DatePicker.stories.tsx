import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';

// Meta configuration for the DatePicker component in Storybook
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker', // Defines the title in Storybook's UI
  component: DatePicker, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// A default story for the DatePicker component
export const Default: Story = {
  args: {
    min: '1400-04-25',
    max: '1409-05-25',
  },
};
