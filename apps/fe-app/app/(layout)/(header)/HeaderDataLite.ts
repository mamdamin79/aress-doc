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
            leadingAction: () => console.log('clicked'),
          },
          {
            text: 'کپی کردن داشبورد',
            icon: {
              name: 'copy',
              size: 'md',
            },
            leadingAction: () => console.log('clicked'),
          },
          {
            text: 'حذف داشبورد',
            icon: {
              name: 'trash-2',
              size: 'md',
            },
            leadingAction: () => console.log('clicked'),
            isDisabled: true,
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
            leadingAction: () => console.log('clicked'),
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
    link: 'investment_funds',
  },
];
