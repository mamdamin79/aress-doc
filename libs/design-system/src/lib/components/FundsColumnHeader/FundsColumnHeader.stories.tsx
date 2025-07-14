import type { Meta, StoryObj } from '@storybook/react';
import { FundsColumnHeader } from './FundsColumnHeader';

// Meta configuration for the FundsColumnHeader component in Storybook
const meta: Meta<typeof FundsColumnHeader> = {
  title: 'Components/FundsColumn', // Defines the title in Storybook's UI
  component: FundsColumnHeader, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FundsColumnHeader>;

// A default story for the FundsColumnHeader component
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
