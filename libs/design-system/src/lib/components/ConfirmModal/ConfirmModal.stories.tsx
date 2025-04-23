import { Meta, StoryObj } from '@storybook/react';
import { ConfirmModal } from './ConfirmModal';
import { ConfirmModalProps } from './ConfirmModal.types';
import { useState } from 'react';

const meta: Meta<typeof ConfirmModal> = {
  component: ConfirmModal,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ConfirmModal>;

export const withInput: Story = {
  render: (args: ConfirmModalProps) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div className="my-20 flex items-center justify-center bg-gray-100 py-20">
        <button onClick={() => setIsOpen(true)}>open modal</button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: 'تغییر نام داشبورد',
    input: {
      label: 'نام جدید را وارد کنید',
      placeholder: 'نام مد نظر خود را وارد کنید ...',
    },
    checkBoxText: 'باز کردن در تب جدید',
    onConfirm: ({ checked, input }) => {
      console.log(checked);
      console.log(input);
    },
  } as ConfirmModalProps,
};

export const withoutInput: Story = {
  parameters: {
    // Ensures that only one story renders at a time
    chromatic: { disableSnapshot: true },
  },
  render: (args: ConfirmModalProps) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div className="my-20 flex h-[100px] items-center justify-center bg-gray-100">
        <button onClick={() => setIsOpen(true)}>open modal</button>
        <ConfirmModal
          {...args}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
        />
      </div>
    );
  },
  args: {
    title: 'تایید حذف اسلاید',
    input: {
      label: 'آیا مطمئن هستید که می‌خواهید «اسلاید ۱» را حذف کنید؟',
    },
    onConfirm: ({ checked, input }) => {
      console.log(checked);
      console.log(input);
    },
  } as ConfirmModalProps,
};
