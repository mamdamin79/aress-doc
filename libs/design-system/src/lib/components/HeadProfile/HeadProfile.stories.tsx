import { Meta, StoryObj } from '@storybook/nextjs';
import { HeadProfile } from './HeadProfile';
const meta: Meta<typeof HeadProfile> = {
  component: HeadProfile,
};

export default meta;

type Story = StoryObj<typeof HeadProfile>;

export const Default: Story = {
  args: {
    profileImage: 'https://picsum.photos/200',
  },
};
