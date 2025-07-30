import type { Meta, StoryObj } from '@storybook/nextjs';
import { VerifiedBadge } from './VerifiedBadge';

const meta: Meta<typeof VerifiedBadge> = {
  component: VerifiedBadge,
  title: 'Components/VerifiedBadge',
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      defaultValue: 'md',
    },
    color: {
      control: 'select',
      options: ['brand', 'success', 'neutral'],
      defaultValue: 'brand',
    },
  },
};

export default meta;
type Story = StoryObj<typeof VerifiedBadge>;

export const Default: Story = {
  args: {
    size: 'md',
    color: 'brand',
  },
};

export const Small: Story = {
  args: {
    size: 'sm',
    color: 'brand',
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    color: 'brand',
  },
};

export const Success: Story = {
  args: {
    size: 'md',
    color: 'success',
  },
};

export const Neutral: Story = {
  args: {
    size: 'md',
    color: 'neutral',
  },
};

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4">
        <VerifiedBadge size="sm" color="brand" />
        <VerifiedBadge size="md" color="brand" />
        <VerifiedBadge size="lg" color="brand" />
      </div>
      <div className="flex items-center gap-4">
        <VerifiedBadge size="sm" color="success" />
        <VerifiedBadge size="md" color="success" />
        <VerifiedBadge size="lg" color="success" />
      </div>
      <div className="flex items-center gap-4">
        <VerifiedBadge size="sm" color="neutral" />
        <VerifiedBadge size="md" color="neutral" />
        <VerifiedBadge size="lg" color="neutral" />
      </div>
    </div>
  ),
};
