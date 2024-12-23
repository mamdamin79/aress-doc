import type { Meta, StoryObj } from '@storybook/react';
import { ResetPasswordForm } from './ResetPasswordForm';

// Meta configuration for the ResetPasswordForm component in Storybook
const meta: Meta<typeof ResetPasswordForm> = {
  title: 'Components/ResetPasswordForm', // Defines the title in Storybook's UI
  component: ResetPasswordForm, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof ResetPasswordForm>;

// A default story for the ResetPasswordForm component

export const Default: Story = {
  render: () => (
    <div className="w-[528px]">
      <ResetPasswordForm onClick={() => console.log('clicked')} />
    </div>
  ),
};
