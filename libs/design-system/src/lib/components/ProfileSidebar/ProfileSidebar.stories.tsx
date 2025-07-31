import { Meta, StoryObj } from '@storybook/nextjs';
import { ProfileSidebar } from './ProfileSidebar';
const meta: Meta<typeof ProfileSidebar> = {
  component: ProfileSidebar,
};

export default meta;

type Story = StoryObj<typeof ProfileSidebar>;

export const withPic: Story = {
  args: {
    activeSection: 'profile',
    title: 'علی محمدی',
    subTitle: '09179151234',
    image: 'https://placehold.co/600x600',
  },
};
export const withoutPic: Story = {
  args: {
    activeSection: 'profile',

    title: 'علی محمدی',
    subTitle: '09179151234',
  },
};
