import type { Meta, StoryObj } from '@storybook/nextjs';

import { MenuTiles } from './MenuTiles';

const meta: Meta<typeof MenuTiles> = {
  title: 'Components/MenuTiles',
  component: MenuTiles,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuTiles>;

export const WithIconAndBadge: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'صندوق سهم آشنا',
    subText: 'سهامی',
    badgeColor: 'bg-green-500',

    icon: {
      name: 'user-round',
      size: 'md',
    },

    isDashboard: false,
    isActive: true,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
export const WithIconOnly: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'صندوق سهم آشنا',
    subText: 'سهامی',

    icon: {
      name: 'user-round',
      size: 'md',
    },

    isDashboard: false,
    expandable: false,
    isActive: false,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
export const NoSubText: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'صندوق سهم آشنا',

    icon: {
      name: 'user-round',
      size: 'md',
    },

    isDashboard: false,
    expandable: false,
    isActive: false,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
export const justText: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'صندوق سهم آشنا',
    isDashboard: false,
    isActive: false,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
export const expandable: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'بازارها',
    isDashboard: false,
    isActive: false,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
    expandable: true,
  },
};
export const dashBoard: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: '1. تحلیل صنعت پتروشیمی',
    isDashboard: true,
    isActive: false,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
export const dashBoardActive: Story = {
  render: (args) => (
    <div className="flex h-40 w-full items-center justify-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: '2. صندوق‌های پربازده',
    isDashboard: true,
    isActive: true,
    action: 'openModal',
    meta: {
      modalName: 'deleteDashboard',
    },
  },
};
