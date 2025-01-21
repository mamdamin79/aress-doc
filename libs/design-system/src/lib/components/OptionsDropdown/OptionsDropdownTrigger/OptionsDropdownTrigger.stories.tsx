import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
const meta: Meta<typeof OptionsDropdownTrigger> = {
  component: OptionsDropdownTrigger,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdownTrigger>;

export const Default: Story = {
  args: {
    icon: {
      name: 'clock',
    },
    text: 'متن نمونه',
    tag: {
      color: 'bg-green-600',
    },
    bg: 'primary',
    emphasize: 'medium',
    isActive: false,
    size: 'sm',
  },
};
