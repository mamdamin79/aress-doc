import type { Meta, StoryObj } from '@storybook/nextjs';

import { ProgressBar } from './ProgressBar';

// Meta configuration for the ProgressBar component in Storybook
const meta: Meta<typeof ProgressBar> = {
  title: 'Components/ProgressBar', // Defines the title in Storybook's UI
  component: ProgressBar, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof ProgressBar>;

// A default story for the ProgressBar component
export const Default: Story = {
  args: {
    progressBarItems: [
      { text: 'رمز عبور جدید', status: 'success' },
      { text: 'رمز عبور جدید', status: 'error' },
      { text: 'رمز عبور جدید', status: 'success' },
      { text: 'رمز عبور جدید', status: 'success' },
      { text: 'رمز عبور جدید', status: 'success' },
      { text: 'رمز عبور جدید', status: 'success' },
    ],
    activeIndex: 0,
  },
};
