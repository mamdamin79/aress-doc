import { Meta, StoryObj } from '@storybook/react';
import { FileUpload } from './FileUpload';
const meta: Meta<typeof FileUpload> = {
  component: FileUpload,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof FileUpload>;

export const fileUpload: Story = {
  render: (args) => {
    return (
      <div className="my-20 flex items-center justify-center">
        <FileUpload {...args} />
      </div>
    );
  },
  args: {
    types: ['xls', 'xlsx'],
  },
};
