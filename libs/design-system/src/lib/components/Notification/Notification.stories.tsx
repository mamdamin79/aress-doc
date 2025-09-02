import { Meta, StoryObj } from '@storybook/nextjs';
import { Notification } from './Notification';
const meta: Meta<typeof Notification> = {
  component: Notification,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Notification>;

export const Default: Story = {
  args: {
    title: 'بروزرسانی سجام',
    subtitle: 'بروزرسانی سامانه سجام با موفقیت انجام شد.',
    isNew: true,
    icon: {
      name: 'check-circle',
      size: 'md',
    },
  },
};
