import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const icon: Story = {
  args: {
    name: 'upload',
    size: 'lg',
  },
};
