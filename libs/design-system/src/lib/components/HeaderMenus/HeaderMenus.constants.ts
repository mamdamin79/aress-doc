import { MenuItem } from './HeaderMenus.types';
export const menu = [
  {
    name: 'داشبورد مدیریتی',
    link: '#',
    subMenu: [
      {
        groupLabel: 'گزینه‌ها',
        children: [
          {
            leadingAction: () => console.log('clicked'),
            text: 'تغییر نام داشبورد',
            icon: { name: 'pencil', size: 'md' },
          },
          {
            leadingAction: () => console.log('clicked'),
            text: 'کپی کردن داشبورد',
            icon: { name: 'copy', size: 'md' },
          },
          {
            leadingAction: () => console.log('clicked'),
            text: 'حذف داشبورد',
            icon: { name: 'trash-2', size: 'md' },
          },
        ],
      },
      {
        groupLabel: '',
        border: true,
        children: [
          {
            leadingAction: () => console.log('clicked'),
            text: 'افزودن داشبورد جدید',
            icon: { name: 'plus', size: 'md' },
          },
        ],
      },
      {
        groupLabel: 'داشبوردهای شما',
        counter: true,
        children: [
          {
            leadingAction: () => console.log('clicked'),
            text: 'تحلیل صنعت پتروشیمی',
            isDashboard: true,
          },
          {
            leadingAction: () => console.log('clicked'),
            text: 'صندوق کالایی',
            isDashboard: true,
          },
          {
            leadingAction: () => console.log('clicked'),
            text: 'صندوق های پربازده',
            isDashboard: true,
          },
          {
            leadingAction: () => console.log('clicked'),
            text: 'مقایسه صندوق من',
            isDashboard: true,
          },
        ],
      },
    ],
  },
  {
    name: 'گزارش‌ها',
    link: '#',
    subMenu: [
      {
        groupLabel: 'گزینه‌ها',
        children: [],
      },
    ],
  },
  { name: 'صندوق های سرمایه گذاری', link: '#' },
  {
    name: 'صندوق های من',
    link: '#',
    subMenu: [
      {
        groupLabel: 'گزینه‌ها',
        children: [],
      },
    ],
  },
  {
    name: 'بازارها',
    link: '#',
    subMenu: [
      {
        groupLabel: 'گزینه‌ها',
        children: [],
      },
    ],
  },
  { name: 'نمودار', link: '#' },
  { name: 'اشتراکات آرسس', link: '#' },
  { name: 'سوالی دارید؟', link: '#' },
] as MenuItem[];
