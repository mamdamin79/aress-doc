import { Meta, StoryObj } from '@storybook/nextjs';
import { ProfileSidebar } from './ProfileSidebar';
import { ProfileSidebarItem } from './ProfileSidebar.types';

const meta: Meta<typeof ProfileSidebar> = {
  component: ProfileSidebar,
  title: 'Components/ProfileSidebar',
};

export default meta;

type Story = StoryObj<typeof ProfileSidebar>;

const items: ProfileSidebarItem[] = [
  {
    key: 'profile',
    text: 'حساب کاربری',
    icon: { name: 'user' },
  },
  {
    key: 'logout',
    text: 'خروج',
    icon: { name: 'power' },
    onClick: () => alert('خروج انجام شد!'),
  },
];

export const withPic: Story = {
  args: {
    activeSection: 'profile',
    title: 'علی محمدی',
    subTitle: '09179151234',
    image: 'https://placehold.co/600x600',
    items,
  },
};

export const withoutPic: Story = {
  args: {
    activeSection: 'profile',
    title: 'علی محمدی',
    subTitle: '09179151234',
    items,
  },
};

export const B2C: Story = {
  args: {
    activeSection: 'profile',
    title: 'امیررضا تقوی',
    subTitle: '۰۹۳۴۶۹۰۰۱۸',
    image: 'https://randomuser.me/api/portraits/men/32.jpg',
    items: [
      {
        key: 'profile',
        text: 'حساب کاربری',
        icon: { name: 'user' },
      },
      {
        key: 'messages',
        text: 'پیام‌های من',
        icon: { name: 'bell' },
      },
      {
        key: 'sessions',
        text: 'نشست‌های فعال',
        icon: { name: 'monitor-smartphone' },
      },
      {
        key: 'history',
        text: 'تاریخچه ورود و خروج',
        icon: { name: 'arrow-left-right' },
      },
      {
        key: 'logout',
        text: 'خروج از حساب کاربری',
        icon: { name: 'power' },
        onClick: () => alert('خروج انجام شد!'),
      },
    ],
  },
};
