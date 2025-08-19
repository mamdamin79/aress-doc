import { SummaryCellCarousel, SummaryCellProps } from 'design-system';
import React from 'react';

export const Summary: React.FC = () => {
  const cells: SummaryCellProps[] = [
    {
      label: {
        icon: 'CustomCalendar',
        title: 'تاریخ ورود به صندوق',
      },
      value: '۱۴۰۲/۰۶/۰۸',
    },
    {
      label: {
        icon: 'CustomClock',
        title: 'سابقه صندوق',
      },
      value: '۷ سال و ۳ ماه',
    },
    {
      label: {
        icon: 'user',
        title: 'مدیر صندوق',
      },
      value: 'سبدگردان سهم آشنا',
    },
    {
      label: {
        icon: 'CustomBag',
        title: 'سیاست سرمایه‌گذاری',
      },
      value: 'مخاطره آمیز',
    },
    {
      label: {
        icon: 'CustomWallet',
        title: 'ارزش خالص دارایی',
      },
      value: '۴۰۸.۴ میلیارد ریال',
    },
    {
      label: {
        icon: 'CustomAlpha',
        title: 'بازده اضافی',
      },
      value: '۴.۱٪',
    },
    {
      label: {
        icon: 'CustomBeta',
        title: 'بای صندوق',
      },
      value: '۳.۸۴',
    },
  ];
  return (
    <div className="mt-12">
      <SummaryCellCarousel cells={cells} />
    </div>
  );
};
