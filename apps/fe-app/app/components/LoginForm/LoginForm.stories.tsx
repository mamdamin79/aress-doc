import type { Meta, StoryObj } from '@storybook/react';
import { LoginForm } from './LoginForm';
import { set } from 'react-hook-form';

// Meta configuration for the LoginForm component in Storybook
const meta: Meta<typeof LoginForm> = {
  title: 'Components/LoginForm', // Defines the title in Storybook's UI
  component: LoginForm, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof LoginForm>;

// A default story for the LoginForm component

export const Default: Story = {
  render: (args) => (
    <div className="w-[528px]">
      <LoginForm {...args} />
    </div>
  ),
  args: {
    onSubmit: async (values) => {
      return new Promise((resolve) =>
        setTimeout(() => {
          console.log(values);
          resolve();
        }, 1500),
      );
    },
  },
};
