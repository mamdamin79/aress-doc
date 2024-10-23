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
      ButtonProps: 'برو به داشبورد',
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
      iconProps: 'undo-2',
      onClick: () => console.log('hello'),
    },
    timeout: 8000,
  },
};
