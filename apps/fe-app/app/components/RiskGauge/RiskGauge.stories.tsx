import type { Meta, StoryObj } from '@storybook/nextjs';
import { RiskGauge } from './RiskGauge';

const meta: Meta<typeof RiskGauge> = {
  title: 'Components/RiskGauge',
  component: RiskGauge,
};

export default meta;

type Story = StoryObj<typeof RiskGauge>;

export const Value45: Story = {
  args: { value: 45 },
  render: (args) => (
    <div style={{ width: 440 }}>
      <RiskGauge {...args} />
    </div>
  ),
};

export const Low: Story = {
  args: { value: 15 },
  render: (args) => (
    <div style={{ width: 440 }}>
      <RiskGauge {...args} />
    </div>
  ),
};

export const High: Story = {
  args: { value: 82 },
  render: (args) => (
    <div style={{ width: 440 }}>
      <RiskGauge {...args} />
    </div>
  ),
};
