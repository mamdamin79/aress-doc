import type { Meta, StoryObj } from '@storybook/nextjs';
import { Badge } from './Badge';

// Meta configuration for the Badge component in Storybook
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge', // Defines the title in Storybook's UI
  component: Badge, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Badge>;

// A default story for the Badge component
export const Default: Story = {
  args: {
    title: 'قابل خرید',
    theme: 'green',
    icon: { name: 'check', size: 'lg' },
  },
};
