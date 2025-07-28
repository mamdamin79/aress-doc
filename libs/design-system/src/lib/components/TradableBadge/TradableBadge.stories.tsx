import type { Meta, StoryObj } from '@storybook/nextjs';
import { TradableBadge } from './TradableBadge';

// Meta configuration for the TradableBadge component in Storybook
const meta: Meta<typeof TradableBadge> = {
  title: 'Components/TradableBadge', // Defines the title in Storybook's UI
  component: TradableBadge, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof TradableBadge>;

// A default story for the TradableBadge component
export const Default: Story = {
  args: {
    title: 'قابل خرید',
    haveIcon: true,
    theme: 'green',
  },
};
