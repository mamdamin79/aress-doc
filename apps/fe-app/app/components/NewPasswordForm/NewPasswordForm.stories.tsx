import type { Meta, StoryObj } from '@storybook/nextjs';
import { NewPasswordForm } from './NewPasswordForm';

// Meta configuration for the NewPassword component in Storybook
const meta: Meta<typeof NewPasswordForm> = {
  title: 'Components/NewPasswordForm', // Defines the title in Storybook's UI
  component: NewPasswordForm, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof NewPasswordForm>;

// A default story for the NewPassword component

export const Default: Story = {
  render: (args) => (
    <div className="w-[528px]">
      <NewPasswordForm {...args} />
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
