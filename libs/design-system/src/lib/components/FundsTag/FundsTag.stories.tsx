import { Meta, StoryObj } from '@storybook/react';
import { FundsTag } from './FundsTag';
const meta: Meta<typeof FundsTag> = {
  component: FundsTag,
};

export default meta;

type Story = StoryObj<typeof FundsTag>;

export const Default: Story = {
  args: {
    color: 'blue',
  },
};
