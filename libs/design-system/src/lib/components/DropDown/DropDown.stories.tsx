import { Meta, StoryObj } from '@storybook/react';
import { DropDown } from './DropDown';
const meta: Meta<typeof DropDown> = {
  component: DropDown,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DropDown>;

export const Default: Story = {
  args: {
    menuItems: [
      'فروردین',
      'اردیبهشت',
      'خرداد',
      'تیر',
      'مرداد',
      'شهریور',
      'مهر',
      'آبان',
      'آذر',
      'دی',
      'بهمن',
      'اسفند',
    ],
    selectedItem: 'اردیبهشت',
  },
};
