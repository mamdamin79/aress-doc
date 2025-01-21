import { Meta, StoryObj } from '@storybook/react';
import { OptionsDropdown } from './OptionsDropdown';
const meta: Meta<typeof OptionsDropdown> = {
  component: OptionsDropdown,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdown>;

export const Default: Story = {
  args: {
    anchor: 'bottom end',
    dropDownList: [
      {
        text: 'متن نمونه',
        tag: { color: 'bg-green-600' },
      },
      {
        text: 'متن نمونه',
        tag: { color: 'bg-green-600' },
      },
    ],
    trigger: {
      bg: 'primary',
      emphasize: 'medium',
      size: 'md',
      text: 'متن ریز',
      icon: {
        name: 'clock',
      },
      tag: { color: 'bg-green-600' },
    },
  },
};
