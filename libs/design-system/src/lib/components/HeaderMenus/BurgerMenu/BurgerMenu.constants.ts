import { BurgerMenuItems } from './BurgerMenu.types';

export const menu = [
  {
    groupLabel: '',
    children: [
      {
        subMenu: [
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
            border: true,

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
                isActive: true,
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
              {
                link: '#',
                text: 'مقایسه صندوق من',
                isDashboard: true,
              },
              {
                link: '#',
                text: 'داشبورد نمونه 1',
                isDashboard: true,
              },
            ],
          },
        ],
        text: 'داشبورد مدیریتی',
        expandable: true,
        leadingAction: () => console.log('clicked'),
      },
      {
        text: 'گزارش ها',
      },
    ],
  },
  {
    groupLabel: '',
    children: [],
    border: true,
  },
  {
    groupLabel: '',
    children: [
      {
        text: 'گزارش ها',
        expandable: true,
      },
      {
        text: 'صندوق‌های سرمایه‌گذاری',
        expandable: true,
      },
      {
        text: 'صندوق من',
        expandable: true,
      },
      {
        text: 'بازار ها',
      },
      {
        text: 'اشتراکات آرسس',
      },
      {
        text: 'سوالی دارید؟',
      },
    ],
  },
] as BurgerMenuItems[];
