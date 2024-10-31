import type { Meta, StoryObj } from '@storybook/react';

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
    <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
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
  },
};
export const WithIconOnly: Story = {
  render: (args) => (
    <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
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
  },
};
export const NoSubText: Story = {
  render: (args) => (
    <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
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
  },
};
export const justText: Story = {
  render: (args) => (
    <div className="w-full h-40 bg-gray-300 flex justify-center items-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: 'صندوق سهم آشنا',
    isDashboard: false,
    isActive: false,
  },
};
export const dashBoard: Story = {
  render: (args) => (
    <div className="w-full h-40 flex justify-center items-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: '1. تحلیل صنعت پتروشیمی',
    isDashboard: true,
    isActive: false,
  },
};
export const dashBoardActive: Story = {
  render: (args) => (
    <div className="w-full h-40 flex justify-center items-center">
      <MenuTiles {...args} />
    </div>
  ),
  args: {
    text: '2. صندوق‌های پربازده',
    isDashboard: true,
    isActive: true,
  },
};
