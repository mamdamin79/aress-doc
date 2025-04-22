import { Meta, StoryObj } from '@storybook/react';
import { SparkLine } from './SparkLine';
const meta: Meta<typeof SparkLine> = {
  component: SparkLine,
};

export default meta;

type Story = StoryObj<typeof SparkLine>;

export const positive: Story = {
  render: (args) => (
    <div className="p-60">
      <SparkLine {...args} />
    </div>
  ),
  args: {
    data: [
      7, 14, 23, 36, 5, 42, 18, 29, 11, 50, 3, 27, 39, 8, 45, 16, 33, 21, 47,
      12,
    ],
    trend: 'positive',
  },
};
export const negative: Story = {
  render: (args) => (
    <div className="p-60">
      <SparkLine {...args} />
    </div>
  ),
  args: {
    data: [
      7, 14, 23, 36, 5, 42, 18, 29, 11, 50, 3, 27, 39, 8, 45, 16, 33, 21, 47,
      12,
    ],
    trend: 'negative',
  },
};
