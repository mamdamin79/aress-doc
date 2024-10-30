import type { Meta, StoryObj } from '@storybook/react';

import { MenuTiles } from './MenuTiles';

const meta: Meta<typeof MenuTiles> = {
  title: 'Components/MenuTiles',
  component: MenuTiles,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MenuTiles>;

export const Default: Story = {
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
  },
};
