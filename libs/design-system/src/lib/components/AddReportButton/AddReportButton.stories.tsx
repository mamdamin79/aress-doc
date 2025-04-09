import { Meta, StoryObj } from '@storybook/react';
import { AddReportButton } from './AddReportButton';
const meta: Meta<typeof AddReportButton> = {
  component: AddReportButton,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof AddReportButton>;

export const Default: Story = {
  render: () => (
    <div className="w-full h-80 bg-gray-100 flex justify-center items-center p-52">
      <AddReportButton onClick={() => alert('click')} />
    </div>
  ),
};
