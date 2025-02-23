import { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './ProfileForm';
const meta: Meta<typeof ProfileForm> = {
  component: ProfileForm,

};

export default meta;

type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {
  args: {
  },
};