import { Notification, NotificationProps } from 'design-system';
import { Fragment } from 'react';

const notificationsData: NotificationProps[] = [
  {
    title: 'بروزرسانی سجام',
    subtitle: 'بروزرسانی سامانه سجام با موفقیت انجام شد.',
    isNew: true,
    icon: {
      name: 'check-circle',
      size: 'md',
    },
  },
  {
    title: 'پرداخت سود تقسیمی',
    subtitle:
      'سود تقسیمی صندوق --فُلان-- به حساب بانکی پرداخت شد. جزئیات در بخش فعالیت های اخیر موجود است.',
    isNew: true,
    icon: {
      name: 'check-circle',
      size: 'md',
    },
  },
  {
    title: 'واریز وجه',
    subtitle: 'واریز وجه با موفقیت انجام شد.',
    isNew: false,
    icon: {
      name: 'arrow-down',
      size: 'md',
    },
  },
  {
    title: 'گزارش عملکرد ماهانه',
    subtitle:
      'سود تقسیمی صندوق --فُلان-- به حساب بانکی پرداخت شد. جزئیات در بخش فعالیت های اخیر موجود است.',
    isNew: false,
    icon: {
      name: 'chart-no-axes-combined',
      size: 'md',
    },
  },
  {
    title: 'گزارش حسابداری فصلی',
    subtitle: 'گزارش حسابداری فصلی بهار صندوق در بخش مستندات بارگذاری شده است.',
    isNew: false,
    icon: {
      name: 'calculator',
      size: 'md',
    },
  },
  {
    title: 'پاسخ مدیر صندوق --فُلان-- به سوال شما',
    subtitle:
      'مدیر صندوق --فُلان-- به سوال شما پاسخ داد. جهت مشاهده، به صفحه مربوطه مراجعه فرمایید.',
    isNew: false,
    icon: {
      name: 'message-square-more',
      size: 'md',
    },
  },
  {
    title: 'ورود به آرسس',
    subtitle: 'شما در تاریخ ۱۴۰۲/۰۲/۱۳ و ساعت ۱۲:۰۲ وارد سامانه آرسس شدید.',
    isNew: false,
    icon: {
      name: 'arrow-left-to-line',
      size: 'md',
    },
  },
  {
    title: 'فرصت‌های جدید سرمایه‌گذاری',
    subtitle:
      'فرصت‌های جدید سرمایه‌گذاری برای شما آماده است. جهت بررسی، وارد پنل کاربری شوید.',
    isNew: false,
    icon: {
      name: 'star',
      size: 'md',
    },
  },
];

export default function Messages() {
  const groupedNotifications = {
    امروز: notificationsData.slice(0, 2),
    دیروز: notificationsData.slice(2, 4),
    '۱۳ اردیبهشت ۱۴۰۴': notificationsData.slice(4),
  };

  return (
    <div className="flex flex-col gap-2">
      {Object.entries(groupedNotifications).map(
        ([date, notifications], index) => (
          <Fragment key={index}>
            <div className="text-text-neutral-secondary mt-4 text-right text-lg font-medium">
              {date}
            </div>
            <div className="flex flex-col gap-2">
              {notifications.map((notification, notifIndex) => (
                <Notification
                  key={notifIndex}
                  title={notification.title}
                  subtitle={notification.subtitle}
                  isNew={notification.isNew}
                  icon={notification.icon}
                />
              ))}
            </div>
            <div className="bg-surface-neutral-tertiary my-1 h-[1px] w-full"></div>
          </Fragment>
        ),
      )}
    </div>
  );
}
