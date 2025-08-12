import { Meta, StoryObj } from '@storybook/nextjs';
import { OptionsDropdownOption } from './OptionsDropdownOption';
const meta: Meta<typeof OptionsDropdownOption> = {
  component: OptionsDropdownOption,
};

export default meta;

type Story = StoryObj<typeof OptionsDropdownOption>;
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
      color: 'green',
    },
    text: 'متن نمونه',
  },
};
export const withCheck: Story = {
  args: {
    withCheck: true,
    text: 'متن نمونه',
    isActive: true,
  },
};
