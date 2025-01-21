import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdown } from './OptionsDropdown';
const meta: Meta<typeof OptionsDropdown> = {
  component: OptionsDropdown,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdown>;

export const Default: Story = {
  args: {},
};
