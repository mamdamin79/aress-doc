import { Meta, StoryObj } from '@storybook/react';
import { ContextMenu } from './ContextMenu';
import { Icon } from '../Icon';
const meta: Meta<typeof ContextMenu> = {
  component: ContextMenu,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ContextMenu>;

export const Default: Story = {
  render: (args) => (
    <div className="fixed flex items-center justify-center">
      <ContextMenu {...args} />
    </div>
  ),
  args: {
    items: [
      {
        icon: 'settings',
        title: 'تنظیمات گزارش',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        icon: 'share-2',
        title: 'اشتراک گذاری',
        onClick: () => console.log('اشتراک گذاری'),
      },
      {
        icon: 'square-arrow-out-up-right',
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
        icon: 'trash-2',
        title: 'حذف گزارش از این فضا',
        onClick: () => console.log('حذف گزارش از این فضا'),
      },
    ],
  },
};

export const withIcon: Story = {
  render: (args) => (
    <div className="fixed flex items-center justify-center">
      <ContextMenu {...args}>
        <Icon name="ellipsis" />
      </ContextMenu>
    </div>
  ),
  args: {
    items: [
      {
        icon: 'settings',
        title: 'تنظیمات گزارش',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        icon: 'share-2',
        title: 'اشتراک گذاری',
        onClick: () => console.log('اشتراک گذاری'),
      },
      {
        icon: 'square-arrow-out-up-right',
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
        icon: 'trash-2',
        title: 'حذف گزارش از این فضا',
        onClick: () => console.log('حذف گزارش از این فضا'),
      },
    ],
  },
};

export const DifferentPosition: Story = {
  render: (args) => (
    <div className="fixed flex items-center justify-center">
      <ContextMenu anchor="bottom start" {...args}>
        <Icon name="ellipsis" />
      </ContextMenu>
    </div>
  ),
  args: {
    items: [
      {
        icon: 'settings',
        title: 'تنظیمات گزارش',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        icon: 'share-2',
        title: 'اشتراک گذاری',
        onClick: () => console.log('اشتراک گذاری'),
      },
      {
        icon: 'square-arrow-out-up-right',
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
        icon: 'trash-2',
        title: 'حذف گزارش از این فضا',
        onClick: () => console.log('حذف گزارش از این فضا'),
      },
    ],
  },
};
