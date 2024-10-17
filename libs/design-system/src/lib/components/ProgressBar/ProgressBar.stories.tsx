import type { Meta, StoryObj } from '@storybook/react';

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
      'کد ملی و شماره همراه',
      'رمز یک‌بار مصرف',
      'رمز عبور جدید',
      'رمز عبور جدید',
      'رمز عبور جدید',
      'رمز عبور جدید',
    ],
    activeIndex: 0,
  },
};
