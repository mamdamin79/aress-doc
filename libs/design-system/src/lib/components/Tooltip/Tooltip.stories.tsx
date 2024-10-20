import { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from './Tooltip';
const meta: Meta<typeof Tooltip> = {
  component: Tooltip,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="my-10 flex items-center justify-center">
        <Tooltip {...args}>سلام</Tooltip>
      </div>
    );
  },
  args: {
    id: '5',
    content: 'سلام علیکم و رحمته الله',
    position: 'top',
  },
};
