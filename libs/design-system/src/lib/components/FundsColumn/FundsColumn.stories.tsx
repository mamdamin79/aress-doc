import type { Meta, StoryObj } from '@storybook/react';
import { FundsColumn } from './FundsColumn';

// Meta configuration for the FundsColumn component in Storybook
const meta: Meta<typeof FundsColumn> = {
  title: 'Components/FundsColumn', // Defines the title in Storybook's UI
  component: FundsColumn, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FundsColumn>;

// A default story for the FundsColumn component
export const Default: Story = {
  args: {
    filterable: true,
    size: 'small',
    title: 'title',
    sortType: 'ranked',
    type: 'inactive',
    shadow: true,
  },
};
