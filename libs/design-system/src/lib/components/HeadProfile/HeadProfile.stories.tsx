import { Meta, StoryObj } from '@storybook/react';
import { HeadProfile } from './HeadProfile';
import { Icon } from '../Icon';
const meta: Meta<typeof HeadProfile> = {
  component: HeadProfile,
};

export default meta;

type Story = StoryObj<typeof HeadProfile>;

export const Default: Story = {
  args: {
    name: 'سینا پیروزمندان',
    profileImage: 'https://picsum.photos/200',
  },
};
