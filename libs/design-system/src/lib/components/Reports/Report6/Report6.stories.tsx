import { Meta, StoryObj } from '@storybook/react';
import { Report6 } from './Report6';
const meta: Meta<typeof Report6> = {
  component: Report6,
};

export default meta;

type Story = StoryObj<typeof Report6>;

export const Default: Story = {
  args: {
    indexData: [-2.5, 2.5, -2.5, -2, -1.5, -4, 2, 5.5, 3.5, -4.5, 0.5, 3.5],
    inFlowData: [115, 105, null, null, 85, null, 115, 95, null, null, 85, 105],
    outFlowData: [
      null,
      null,
      -55,
      -45,
      null,
      -90,
      null,
      null,
      -10,
      -75,
      null,
      null,
    ],
  },
};
