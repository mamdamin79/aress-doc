import type { Meta, StoryObj } from '@storybook/nextjs';
import { ToastDemo } from './ToastDemo';
import { Toaster } from 'react-hot-toast';
import { useCustomToast } from './CustomToast';

// Meta configuration for the Toast component in Storybook
// Add more detailed documentation
const meta: Meta<typeof ToastDemo> = {
  title: 'Components/Toast',
  component: ToastDemo,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Toast component for displaying notifications with different styles and actions.',
      },
    },
  },
  argTypes: {
    message: {
      description: 'The message to display in the toast',
      control: 'text',
    },
    type: {
      description: 'The type of toast which determines its styling',
      control: {
        type: 'select',
        options: ['info', 'success', 'error', 'warning'],
      },
    },
  },
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

export const trailing: Story = {
  render: () => {
    const { showProgressToast } = useCustomToast();
    return (
      <>
        <div
          className="w-fit cursor-pointer rounded-md border p-2"
          onClick={() => {
            showProgressToast({
              title: 'گزارش جایگذاری شد.',
              trailingAction: {
                ButtonProps: {
                  align: 'center',
                  isLoading: false,
                  mode: 'primary',
                  size: 'sm',
                  children: 'برو به داشبورد',
                },
                onClick: () => console.log('Trailing action clicked'),
              },
              timeout: 5000,
            });
          }}
        >
          show toast
        </div>
        <Toaster />
      </>
    );
  },
};
export const leading: Story = {
  render: () => {
    const { showProgressToast } = useCustomToast();
    return (
      <>
        <div
          className="w-fit cursor-pointer rounded-md border p-2"
          onClick={() => {
            showProgressToast({
              title: 'گزارش حذف شد.',
              leadingAction: {
                iconProps: {
                  name: 'undo-2',
                  size: 'lg',
                },
                onClick: () => console.log('leading action clicked'),
              },
              timeout: 5000,
            });
          }}
        >
          show toast
        </div>
        <Toaster />
      </>
    );
  },
};
