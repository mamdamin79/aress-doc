import { ToolTipInfo } from 'design-system';
import React from 'react';

const infos = [
  {
    title: 'حدود قیمت خرید:',
    description:
      'قیمت نهایی هر واحد بر اساس عرضه و تقاضای بازار و پس از تکمیل فرآیند معاملاتی مشخص می‌شود. از این‌رو، قیمت ارائه‌شده هنگام ثبت سفارش صرفاً جنبه تخمینی داشته و ممکن است با قیمت نهایی متفاوت باشد.',
  },
  {
    title: 'حدود تعداد واحد',
    description:
      'به‌دلیل فاصله زمانی چندروزه تا نهایی‌شدن فرآیند صدور یا ابطال و تغییرات احتمالی قیمت، تعداد واحدهای قابل خرید یا فروش در زمان ثبت سفارش، به‌صورت تقریبی محاسبه می‌شود. تعداد دقیق، پس از نهایی‌شدن قیمت بازار تعیین خواهد شد.',
  },
  {
    title: 'حدود قیمت فروش هر واحد:',
    description:
      'قیمت نهایی هر واحد بر اساس عرضه و تقاضای بازار و پس از تکمیل فرآیند معاملاتی مشخص می‌شود. از این‌رو، قیمت ارائه‌شده هنگام ثبت سفارش صرفاً جنبه تخمینی داشته و ممکن است با قیمت نهایی متفاوت باشد.',
  },
  {
    title: 'حدود مبلغ واریزی:',
    description:
      'قیمت نهایی هر واحد بر اساس عرضه و تقاضای بازار و پس از تکمیل فرآیند معاملاتی مشخص می‌شود. از این‌رو، قیمت ارائه‌شده هنگام ثبت سفارش صرفاً جنبه تخمینی داشته و ممکن است با قیمت نهایی متفاوت باشد.',
  },
];
export const TradePopupInfos: React.FC<{
  children: React.ReactElement;
  selectedItemIndex: number;
}> = ({ children, selectedItemIndex }) => {
  return (
    <ToolTipInfo
      title={infos[selectedItemIndex].title}
      description={infos[selectedItemIndex].description}
      trigger="click"
    >
      <span className="inline-block cursor-pointer">{children}</span>
    </ToolTipInfo>
  );
};
