import { Meta, StoryObj } from '@storybook/nextjs';
import { FundsLogo } from './FundsLogo';
const meta: Meta<typeof FundsLogo> = {
  component: FundsLogo,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FundsLogo>;

export const Default: Story = {
  args: {
    size: 'md', // Default size
    hasTag: true, // Example prop to show badge
  },
};
