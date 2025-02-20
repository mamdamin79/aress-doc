import { Meta, StoryObj } from '@storybook/react';
import { ProfileImageAndUpload } from './ProfileImageAndUpload';
const meta: Meta<typeof ProfileImageAndUpload> = {
  component: ProfileImageAndUpload,
};

export default meta;

type Story = StoryObj<typeof ProfileImageAndUpload>;

export const Default: Story = {
  args: {},
};
