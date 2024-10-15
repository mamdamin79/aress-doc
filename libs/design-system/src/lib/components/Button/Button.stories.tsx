import type { Meta, StoryObj } from '@storybook/react';

import { ButtonComponent } from './Button';

// Meta configuration for the ButtonComponent component in Storybook
const meta: Meta<typeof ButtonComponent> = {
  title: 'Components/ButtonComponent', // Defines the title in Storybook's UI
  component: ButtonComponent, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;
type Story = StoryObj<typeof ButtonComponent>;

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
  },
};

export const Underline: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'underline',
    size: 'sm',
    disabled: false,
    isLoading: false,
    align: 'right',
  },
};
