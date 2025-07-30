import { Meta, StoryObj } from '@storybook/nextjs';
import { BarStickyBtn } from './BarStickyBtn';
const meta: Meta<typeof BarStickyBtn> = {
  component: BarStickyBtn,
};

export default meta;

type Story = StoryObj<typeof BarStickyBtn>;

export const Default: Story = {
  args: {},
};
