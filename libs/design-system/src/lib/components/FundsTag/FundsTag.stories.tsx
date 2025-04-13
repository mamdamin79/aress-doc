import { Meta, StoryObj } from '@storybook/react';
import { FundsTag } from './FundsTag';
const meta: Meta<typeof FundsTag> = {
  component: FundsTag,
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: 'select',
      options: ['purple', 'blue', 'green', 'yellow', 'pink'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof FundsTag>;

export const Default: Story = {
  args: {
    color: 'blue',
  },
};
