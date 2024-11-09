import type { Meta, StoryObj } from '@storybook/react';
import { RemovableLabel } from './RemovableLabel';

// Meta configuration for the RemovableLabel component in Storybook
const meta: Meta<typeof RemovableLabel> = {
  title: 'Components/RemovableLabel', // Defines the title in Storybook's UI
  component: RemovableLabel, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof RemovableLabel>;

// A default story for the RemovableLabel component
export const Default: Story = {
  args: {
    label: 'نام صندوق',
    onClose: () => null,
  },
};
