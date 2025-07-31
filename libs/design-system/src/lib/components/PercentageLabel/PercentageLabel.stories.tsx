import type { Meta, StoryObj } from '@storybook/nextjs';
import { PercentageLabel } from './PercentageLabel';

// Meta configuration for the PercentageLabel component in Storybook
const meta: Meta<typeof PercentageLabel> = {
  title: 'Components/PercentageLabel', // Defines the title in Storybook's UI
  component: PercentageLabel, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof PercentageLabel>;

export const Default: Story = {
  argTypes: {
    size: { control: 'radio', options: ['normal', 'small'] },
    value: { control: 'number' },
  },
  args: {
    size: 'normal',
    value: 8,
  },
};
