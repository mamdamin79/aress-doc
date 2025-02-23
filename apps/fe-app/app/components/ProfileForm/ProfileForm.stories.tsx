import { Meta, StoryObj } from '@storybook/react';
import { ProfileForm } from './ProfileForm';
const meta: Meta<typeof ProfileForm> = {
  component: ProfileForm,
};

export default meta;

type Story = StoryObj<typeof ProfileForm>;

export const Default: Story = {
  args: {
    email: 'sinapir2@gmail.com',
    fnameAndLname: 'علی محمدی',
    nationalID: 2283936876,
    phoneNumber: '09339133898',
    username: 'alimhmd',
  },
};
