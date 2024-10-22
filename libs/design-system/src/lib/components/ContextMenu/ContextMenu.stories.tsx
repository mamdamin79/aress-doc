import { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  args: {
    items: [
      {
        icon: 'settings',
        title: 'تنظیمات گزارش',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        icon: 'share',
        title: 'اشتراک گذاری',
        onClick: () => console.log('اشتراک گذاری'),
      },
      {
        icon: 'square-arrow-up-right',
        title: 'هدایت به نسخه مادر',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        icon: 'info',
        title: 'اطلاعات بیشتر',
        onClick: () => console.log('اطلاعات بیشتر'),
      },
      {
        icon: 'repeat',
        title: 'جایگزینی گزارش',
        onClick: () => console.log('جایگزینی گزارش'),
      },
      {
        icon: 'trash',
        title: 'حذف گزارش از این فضا',
        onClick: () => console.log('حذف گزارش از این فضا'),
      },
    ],
  },
};
