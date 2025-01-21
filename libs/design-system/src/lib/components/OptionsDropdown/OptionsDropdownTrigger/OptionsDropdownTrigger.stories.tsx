import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
const meta: Meta<typeof OptionsDropdownTrigger> = {
  component: OptionsDropdownTrigger,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdownTrigger>;

export const Default: Story = {
  args: {},
};
