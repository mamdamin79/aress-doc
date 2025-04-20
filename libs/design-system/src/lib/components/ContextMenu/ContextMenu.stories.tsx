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

export const ExtendedForFundsTable: Story = {
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
        icon: 'calendar-range',
        title: 'تغییر بازه زمانی',
        onClick: () => console.log('تنظیمات گزارش'),
      },
      {
        dividerBefore: true,
        icon: 'arrow-down-wide-narrow',
        title: 'مرتب سازی نزولی',
        onClick: () => console.log('مرتب سازی نزولی'),
      },
      {
        isActive: true,
        icon: 'arrow-up-narrow-wide',
        title: 'مرتب سازی صعودی',
        onClick: () => console.log('مرتب سازی صعودی'),
      },
      {
        dividerBefore: true,
        icon: 'arrow-right',
        title: 'انتقال به راست',
        onClick: () => console.log('انتقال به راست'),
      },
      {
        icon: 'arrow-right-to-line',
        title: 'انتقال به ابتدا',
        onClick: () => console.log('انتقال به ابتدا'),
      },
      {
        disabled: true,
        icon: 'arrow-left',
        title: 'انتقال به چپ',
        onClick: () => console.log('انتقال به چپ'),
      },
      {
        disabled: true,
        icon: 'arrow-left-to-line',
        title: 'انتقال به انتها',
        onClick: () => console.log('انتقال به انتها'),
      },
    ],
  },
};
