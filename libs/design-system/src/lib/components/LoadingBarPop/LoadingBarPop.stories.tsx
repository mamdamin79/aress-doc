import { Meta, StoryObj } from '@storybook/react';
import { LoadingBarPop } from './LoadingBarPop';
const meta: Meta<typeof LoadingBarPop> = {
  component: LoadingBarPop,
};

export default meta;

type Story = StoryObj<typeof LoadingBarPop>;

export const Default: Story = {
  args: {
    status: 'rejected',
  },
};
