import { Meta, StoryObj } from '@storybook/nextjs';
import { OTPForm } from './OTPForm';
const meta: Meta<typeof OTPForm> = {
  component: OTPForm,
};

export default meta;

type Story = StoryObj<typeof OTPForm>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="w-[600px]">
        <OTPForm {...args} />
      </div>
    );
  },
  args: {
    onSubmit(code) {
      console.log(code);
    },
  },
};
