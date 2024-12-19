import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Meta configuration for the Button component in Storybook
const meta: Meta<typeof Button> = {
  title: 'Components/Button', // Defines the title in Storybook's UI
  component: Button, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
  argTypes: {
    mode: {
      control: { type: 'radio' },
      options: ['text', 'primary', 'underline', 'secondary'],
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md'],
    },
    theme: {
      control: { type: 'radio' },
      options: ['brand', 'pressed'],
    },
    align: {
      control: { type: 'radio' },
      options: ['right', 'center'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Default: Story = {
  args: {
    children: 'دنبال کردن',
    mode: 'primary',
    size: 'sm',
    disabled: false,
    isLoading: false,
    align: 'center',
  },
};
