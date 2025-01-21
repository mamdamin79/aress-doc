import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdownCell } from './OptionsDropdownCell';
const meta: Meta<typeof OptionsDropdownCell> = {
  component: OptionsDropdownCell,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdownCell>;
export const textOnly: Story = {
  args: {
    text: 'متن نمونه',
  },
};
export const withIcon: Story = {
  args: {
    icon: { name: 'settings' },
    text: 'متن نمونه',
  },
};
export const withTag: Story = {
  args: {
    tag: {
      color: 'bg-green-600',
    },
    text: 'متن نمونه',
  },
};
export const withCheck: Story = {
  args: {
    withCheck: true,
    text: 'متن نمونه',
  },
};
