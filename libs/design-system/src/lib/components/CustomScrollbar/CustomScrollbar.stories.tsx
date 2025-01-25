import { Meta, StoryObj } from '@storybook/react';
import { CustomScrollbar } from './CustomScrollbar';
const meta: Meta<typeof CustomScrollbar> = {
  component: CustomScrollbar,
};

export default meta;

type Story = StoryObj<typeof CustomScrollbar>;

export const Default: Story = {
  args: {},
};
