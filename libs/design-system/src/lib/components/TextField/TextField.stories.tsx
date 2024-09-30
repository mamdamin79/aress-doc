import { Meta, StoryObj } from '@storybook/react';
import { TextField } from './TextField';
const meta: Meta<typeof TextField> = {
  component: TextField,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof TextField>;

export const Default: Story = {
  args: {
    label: 'تایتل یا برچسب',
    placeholder: 'پلیس هولدر',
    supportText: 'متن پشتیبان',
    isError: false,
    mode: 'filled',
    mergeTitleAndPlaceholder: false,
    leadingIcon: 'user',
    trailingIcons: ['x', 'eye'],
  },
};
