import { MenuItem } from '@shared';

export const MenuData: MenuItem[] = [
  {
    text: 'داشبورد مدیریتی',
    link: '/',
    dropdown: [
      {
        groupLabel: 'گزینه‌ها',
        children: [
          {
            text: 'تغییر نام داشبورد',
            icon: {
              name: 'pencil',
              size: 'md',
            },
            action: 'openModal',
            meta: {
              modalName: 'changeDashboardName',
            },
          },
          {
            text: 'کپی کردن داشبورد',
            icon: {
              name: 'copy',
              size: 'md',
            },
            action: 'openModal',
            meta: {
              modalName: 'copyDashboard',
            },
          },
          {
            text: 'حذف داشبورد',
            icon: {
              name: 'trash-2',
              size: 'md',
            },
            action: 'openModal',
            meta: {
              modalName: 'deleteDashboard',
            },
          },
        ],
      },
      {
        groupLabel: '',
        children: [
          {
            text: 'افزودن داشبورد جدید',
            icon: {
              name: 'plus',
              size: 'md',
            },
            action: 'openModal',
            meta: {
              modalName: 'newDashboard',
            },
          },
        ],
      },
      {
        groupLabel: 'داشبوردهای‌شما',
        counter: true,
        id: 'userDashboards',
        children: [],
      },
    ],
  },
  {
    text: 'گزارش‌ها',
    link: '/reports',
  },
  {
    text: 'صندوق‌های سرمایه گذاری',
    link: '/investment_funds',
  },
  {
    text: 'صندوق من',
    link: '/my-fund',
  },
];
