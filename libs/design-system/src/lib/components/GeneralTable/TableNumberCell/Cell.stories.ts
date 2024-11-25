import { Meta, StoryObj } from '@storybook/react';
import { Cell } from './Cell';
const meta: Meta<typeof Cell> = {
  component: Cell,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Cell>;

export const Default: Story = {
  args: {
    value: 2,
    format: 'quarterSymbol',
  },
};
export const Numeral: Story = {
  args: {
    value: 23,
    format: {
      type: 'decimal',
      precision: 2,
      signed: true,
    },
  },
};
