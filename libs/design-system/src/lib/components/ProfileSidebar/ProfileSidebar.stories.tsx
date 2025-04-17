import { Meta, StoryObj } from '@storybook/react';
import { ProfileSidebar } from './ProfileSidebar';
const meta: Meta<typeof ProfileSidebar> = {
  component: ProfileSidebar,
};

export default meta;

type Story = StoryObj<typeof ProfileSidebar>;

export const withPic: Story = {
  args: {
    title: 'علی محمدی',
    subTitle: '09179151234',
    image: 'https://placehold.co/600x600',
  },
};
export const withoutPic: Story = {
  args: {
    title: 'علی محمدی',
    subTitle: '09179151234',
  },
};
