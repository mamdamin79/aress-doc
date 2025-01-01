import { Meta, StoryObj } from '@storybook/react';
import { HorizontalScrollBar } from './HorizontalScrollBar';
const meta: Meta<typeof HorizontalScrollBar> = {
  component: HorizontalScrollBar,
};

export default meta;

type Story = StoryObj<typeof HorizontalScrollBar>;

export const Default: Story = {
  args: {},
};
