import { Meta, StoryObj } from '@storybook/react';
import { OTPForm } from './OTPForm';
const meta: Meta<typeof OTPForm> = {
  component: OTPForm,
};

export default meta;

type Story = StoryObj<typeof OTPForm>;

export const Default: Story = {
  args: {
    onSubmit(code) {
      console.log(code);
    },
  },
};
