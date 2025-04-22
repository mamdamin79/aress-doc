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
        <FileUpload {...args} onError={(msg: string) => console.log(msg)} />
      </div>
    );
  },
  args: {
    types: ['xls', 'xlsx'],
    maxSize: 1000000000,
  },
};
