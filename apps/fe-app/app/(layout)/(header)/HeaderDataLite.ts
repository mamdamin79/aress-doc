import { MenuItem } from './DesktopMenu/DesktopMenu.types';

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
        groupLabel: 'داشبوردهای شما',
        counter: true,

        children: [
          {
            link: '#',
            text: 'تحلیل صنعت پتروشیمی',
            isDashboard: true,
          },
          {
            link: '#',
            text: 'صندوق کالایی',
            isDashboard: true,
            isActive: true,
          },
          {
            link: '#',
            text: 'صندوق های پربازده',
            isDashboard: true,
          },
        ],
      },
    ],
  },
  {
    text: 'گزارش‌ها',
    link: '/reports',
  },
  {
    text: 'صندوق های سرمایه گذاری',
    link: '/investment_funds',
  },
];
