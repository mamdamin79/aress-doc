import { Meta, StoryObj } from '@storybook/react';
import { ProfileImageAndUpload } from './ProfileImageAndUpload';
const meta: Meta<typeof ProfileImageAndUpload> = {
  component: ProfileImageAndUpload,
};

export default meta;

type Story = StoryObj<typeof ProfileImageAndUpload>;

export const withImage: Story = {
  args: {
    image: 'https://placehold.co/600x600',
    types: ['png', 'jpg'],
  },
};
export const withoutImage: Story = {
  args: {
    types: ['png', 'jpg'],
  },
};
