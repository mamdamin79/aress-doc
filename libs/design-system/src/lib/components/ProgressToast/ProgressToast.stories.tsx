import { Meta, StoryObj } from '@storybook/react';
import { ProgressToast } from './ProgressToast';
const meta: Meta<typeof ProgressToast> = {
  component: ProgressToast,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof ProgressToast>;

export const trailing: Story = {
  render: (args) => {
    return (
      <div className="my-20 flex items-center justify-center">
        <ProgressToast {...args} />
      </div>
    );
  },
  args: {
    title: 'گزارش جایگذاری شد.',
    trailingAction: {
      ButtonProps: {
        align: 'center',
        isLoading: false,
        mode: 'primary',
        size: 'sm',
        children: 'برو به داشبورد',
      },
      onClick: () => console.log('hello'),
    },
    timeout: 8000,
  },
};
export const leading: Story = {
  render: (args) => {
    return (
      <div className="my-20 flex items-center justify-center">
        <ProgressToast {...args} />
      </div>
    );
  },
  args: {
    title: 'گزارش حذف شد.',
    leadingAction: {
      iconProps: {
        name: 'undo-2',
        size: 'lg',
      },
      onClick: () => console.log('hello'),
    },
    timeout: 8000,
  },
};
