import type { Meta, StoryObj } from '@storybook/react';
import { PercentageLabel } from './PercentageLabel';

// Meta configuration for the PercentageLabel component in Storybook
const meta: Meta<typeof PercentageLabel> = {
  title: 'Components/PercentageLabel', // Defines the title in Storybook's UI
  component: PercentageLabel, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof PercentageLabel>;

// A positive story for the PercentageLabel component
export const positive: Story = {
  args: {
    size: 'normal',
    tooltip: 'moooo',
    value: 8,
  },
};

// A negative story for the PercentageLabel component
export const negative: Story = {
  args: {
    size: 'normal',
    tooltip: 'moooo',
    value: -8,
  },
};
