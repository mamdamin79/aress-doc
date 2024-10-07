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

// A Primary story for the ButtonComponent
export const Primary: Story = {
  args: {
    text: 'دنبال کردن',
    mode: 'primary',
    size: 'sm',
    disable: false,
    loading: false,
    align: 'center',
  },
};

// A Secondary story for the ButtonComponent
export const Secondary: Story = {
  args: {
    text: 'دنبال کردن',
    mode: 'secondary',
    size: 'sm',
    disable: false,
    loading: false,
    align: 'left',
  },
};
// A text story for the ButtonComponent
export const Text: Story = {
  args: {
    text: 'دنبال کردن',
    mode: 'text',
    size: 'sm',
    disable: false,
    loading: false,
  },
};
// A default story for the ButtonComponent component
export const Underline: Story = {
  args: {
    text: 'دنبال کردن',
    mode: 'underline',
    size: 'sm',
    disable: false,
    loading: false,
    align: 'right',
  },
};
