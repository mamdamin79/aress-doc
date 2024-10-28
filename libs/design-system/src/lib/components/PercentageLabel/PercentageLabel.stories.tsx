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

export const Positive: Story = {
  args: {
    size: 'normal',
    value: 8,
  },
};

export const Negative: Story = {
  args: {
    size: 'normal',
    tooltip: 'negative number',
    value: -8,
  },
};

export const Zero: Story = {
  args: {
    size: 'normal',
    tooltip: 'zero number',
    value: 0,
  },
};
