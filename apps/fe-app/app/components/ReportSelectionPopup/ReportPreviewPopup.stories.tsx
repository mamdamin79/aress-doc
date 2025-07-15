import { Meta, StoryObj } from '@storybook/react';
import { ReportSelectionPopup } from './ReportPreviewPopup';
import { useState } from 'react';
const meta: Meta<typeof ReportSelectionPopup> = {
  component: ReportSelectionPopup,
};

export default meta;

type Story = StoryObj<typeof ReportSelectionPopup>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <button onClick={() => setIsOpen(true)}>Open dialog</button>
        <ReportSelectionPopup
          isOpen={isOpen}
          category="درآمد ثابت"
          isNew
          onClose={() => setIsOpen(false)}
          summary="این گزارش نرخ بازده تا سررسید (YTM) اوراق با درآمد ثابت را به نمایش گذاشته است. این نرخ به ساختار اقتصادی کشور مربوط می‌باشد و اگر تغییرات شدید نرخ با عدم تغییر ساختار اقتصادی همراه باشد به میانگین تاریخی خود باز می‌گردد."
          title="سهم تاثیر بازدهی صنایع در شاخص"
          video
        />
      </div>
    );
    ``;
  },
};
