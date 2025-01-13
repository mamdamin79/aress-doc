import { Meta, StoryObj } from '@storybook/react';
import { HamburgerMenuIcon } from './HamburgerMenuIcon';
const meta: Meta<typeof HamburgerMenuIcon> = {
  component: HamburgerMenuIcon,
};

export default meta;

type Story = StoryObj<typeof HamburgerMenuIcon>;

export const Default: Story = {
  args: {
    open: false,
  },
};
