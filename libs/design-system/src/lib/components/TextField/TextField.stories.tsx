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
    mergeTitleAndPlaceholder: true,
    leadingIcon: {
      name: 'user-round',
      size: 'lg',
    },
    trailingIcons: [
      { name: 'x', size: 'md' },
      { name: 'eye', size: 'md' },
    ],
    disabled: false,
    type: 'text',
    className: 'w-[320px]',
  },
};

export const WithError: Story = {
  args: {
    ...Default.args,
    isError: true,
    supportText: 'خطا: فیلد دارای مشکل است',
  },
};

export const OTP: Story = {
  args: {
    label: 'لطفا رمز یکبار مصرف ارسال شده به شماره 09124109520 را وارد کنید',
    placeholder: '- - - - - -',
    supportText: 'رمز ارسال شده تا 5 دقیقه دیگر معتبر است',
    isError: false,
    mode: 'filled',
    trailingIcons: [],
    mergeTitleAndPlaceholder: false,
    disabled: false,
    type: 'text',
    className: 'w-[380px]',
  },
};

export const Disabled: Story = {
  args: {
    ...Default.args,
    disabled: true,
    supportText: 'این فیلد غیرفعال است',
  },
};

export const PasswordToggle: Story = {
  args: {
    ...Default.args,
    type: 'password',
    supportText: 'رمز عبور خود را وارد کنید',
  },
};

export const WithoutIcons: Story = {
  args: {
    ...Default.args,
    leadingIcon: undefined,
    trailingIcons: [],
  },
};

export const MergedTitleAndPlaceholder: Story = {
  args: {
    ...Default.args,
    mergeTitleAndPlaceholder: true,
    label: 'نام کاربری',
    supportText: 'برچسب و پلیس‌هولدر ترکیب شده‌اند',
  },
};
