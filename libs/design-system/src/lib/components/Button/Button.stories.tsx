import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './Button';

// Meta configuration for the Button component in Storybook
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Defines the title in Storybook's UI
  component: Button, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'primary',
    size: 'sm',
    disabled: false,
    isLoading: false,
    align: 'center',
  },
};

export const Secondary: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'secondary',
    size: 'sm',
    iconLeft: { name: 'a-arrow-down', size: 'lg' },
    iconRight: { name: 'wifi', size: 'lg' },
    disabled: false,
    isLoading: false,
  },
};
export const Text: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'text',
    size: 'sm',
    disabled: false,
    isLoading: false,
    align: 'right',
  },
};

export const Underline: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'underline',
    iconRight: { name: 'webcam', size: 'md' },
    size: 'sm',
    disabled: false,
    isLoading: false,
    align: 'center',
  },
};
