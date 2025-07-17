import { Meta, StoryObj } from '@storybook/nextjs';
import { PopupInfo } from './PopupInfo';
import React, { useState } from 'react';

const meta: Meta<typeof PopupInfo> = {
  component: PopupInfo,
};

export default meta;

type Story = StoryObj<typeof PopupInfo>;

const PopupInfoStory = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <PopupInfo
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        itemsList={[
          {
            title: '1. نمادهای مالی',
            content: 'k: هزار ریال - M:میلیون ریال - B:میلیارد ریال',
            link: '/',
          },
          {
            title: 'ارزش کل خرید حقیقی',
            content:
              'مجموع ارزش معاملاتی که توسط سرمایه‌گذاران حقیقی در بازار بورس انجام شده',
          },
          {
            title: 'ارزش کل خرید حقوقی',
            content:
              'مجموع ارزش معاملاتی که توسط سرمایه‌گذاران حقوقی (شرکت‌ها، سازمان‌ها و نهادهای مالی) در بازار بورس انجام شده است.',
          },
        ]}
        title="تعاریف مالی به کار رفته."
      />
    </div>
  );
};

export const Default: Story = {
  render: () => <PopupInfoStory />,
  args: {},
};
