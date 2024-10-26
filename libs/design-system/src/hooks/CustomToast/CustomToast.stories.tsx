import type { Meta, StoryObj } from '@storybook/react';
import { ToastDemo } from './ToastDemo';

// Meta configuration for the Toast component in Storybook
const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast', // Defines the title in Storybook's UI
  component: ToastDemo, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof ToastDemo>;

// Examples story for the Toast component
export const Error: Story = {
  args: {
    message: 'شماره همراه یا رمز عبور نادرست است.',
    type: 'error',
  },
};

export const Success: Story = {
  args: {
    message: 'رمز یک‌بار مصرف برای شما ارسال شد.',
    type: 'success',
  },
};

export const Info: Story = {
  args: {
    message: 'حالت اطلاع رسانی',
    type: 'info',
  },
};

export const Warning: Story = {
  args: {
    message:
      'بعد از اتمام زمان‌بندی میتوانید برای ارسال مجدد رمز یک‌بار مصرف اقدام کنید.',
    type: 'warning',
  },
};
