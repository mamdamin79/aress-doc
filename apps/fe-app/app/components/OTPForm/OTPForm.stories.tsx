import type { Meta, StoryObj } from '@storybook/react';
import { OTPForm } from './OTPForm';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the OTPForm component in Storybook
const meta: Meta<typeof OTPForm> = {
  title: 'Components/OTPForm', // Defines the title in Storybook's UI
  component: OTPForm, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof OTPForm>;

// A default story for the OTPForm component

export const Default: Story = {
  render: (args) => (
    <div className="w-[528px]">
      <OTPForm {...args} />
    </div>
  ),
  args: {
    phoneNumber: '09123456789',
    onClick: () => console.log('clicked'),
  },
};
