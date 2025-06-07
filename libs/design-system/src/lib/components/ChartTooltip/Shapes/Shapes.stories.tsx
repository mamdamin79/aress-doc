import { Meta, StoryObj } from '@storybook/react';
import { Shapes } from './Shapes';
const meta: Meta<typeof Shapes> = {
  component: Shapes,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Shapes>;

export const Default: Story = {
  args: {
    color: 'blue',
    shape: 'circle',
  },
};
