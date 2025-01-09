import { MenuItem } from './HeaderMenus.types';
export const menu = [
  {
    text: 'داشبورد مدیریتی',
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
  },
  {
    text: 'گزارش‌ها',
    link: '#',
  },
  {
    text: 'صندوق های سرمایه گذاری',
    link: '#',
  },
  {
    text: 'صندوق من',

    dropdown: [
      {
        groupLabel: '',

        children: [
          {
            text: 'صندوق سهم آشنا',
            subText: 'سهامی',
            link: '#',
            icon: {
              name: 'circle-dot',
              size: 'md',
            },
            badgeColor: 'bg-green-500',
          },
          {
            text: 'امین آشنا ایرانیان',
            subText: 'درآمد ثابت',
            link: '#',
            icon: {
              name: 'circle-dot',
              size: 'md',
            },
            badgeColor: 'bg-green-500',
          },
          {
            text: 'حکمت آشنا ایرانیان',
            subText: 'درآمد ثابت',
            link: '#',
            icon: {
              name: 'circle-dot',
              size: 'md',
            },
            badgeColor: 'bg-blue-500',
          },
        ],
      },
      {
        groupLabel: '',
        children: [],
      },
      {
        groupLabel: 'ابزارهای مدیرعامل',

        children: [
          {
            text: 'کلیت صندوق‌ها',
            subText: 'نمای کلی از عملکرد صندوق‌ها',
            link: '#',
            icon: {
              name: 'clipboard-list',
              size: 'md',
            },
          },
          {
            text: 'ارزیابی مدیرها',
            subText: 'ارزیابی کارایی و نتایج مدیران',
            link: '#',
            icon: {
              name: 'circle-dot',
              size: 'md',
            },
          },
        ],
      },
    ],
  },
  {
    text: 'بازارها',

    dropdown: [
      {
        groupLabel: '',
        children: [
          {
            text: 'سهام',
            subText: 'سهام شرکت‌های بورس و فرابورس',
            icon: {
              name: 'cog',
              size: 'md',
              color: 'text-vividGreen-700',
            },
            link: '#',
          },
          {
            text: 'اوراق با درآمد ثابت',
            subText: 'اوراق بهادار با بازده مشخص و کم ریسک',
            icon: {
              name: 'shield',
              size: 'md',
              color: 'text-blue-700',
            },
            link: '#',
          },
          {
            text: 'اوراق مشتقه',
            subText: 'قراردادهای مالی وابسته به دارایی های دیگر',
            icon: {
              name: 'network',
              size: 'md',
              color: 'text-pink-700',
            },
            link: '#',
          },
          {
            text: 'طلا و کالای فیزیکی',
            subText: 'کالاهای استاندارد شده در بورس کالا',
            icon: {
              name: 'landmark',
              size: 'md',
              color: 'text-yellow-700',
            },
            link: '#',
          },
          {
            text: 'املاک و مستغلات',
            subText: 'بازار املاک برای سرمایه گذاری بلندمدت',
            icon: {
              name: 'building-2',
              size: 'md',
              color: 'text-gray-700',
            },
            link: '#',
          },
          {
            text: 'رمز ارز',
            subText: 'دارایی های دیجیتال برپایه فناوری بلاک چین',
            icon: {
              name: 'bitcoin',
              size: 'md',
              color: 'text-red-700',
            },
            link: '#',
          },
          {
            text: 'خلاصه کلی',
            subText: 'بررسی و تحلیل گسترده‌ای از بازارها',
            icon: {
              name: 'chart-pie',
              size: 'md',
              color: 'text-brand-700',
            },
            link: '#',
          },
        ],
      },
    ],
  },
  {
    text: 'نمودار',
    link: '#',
  },
  {
    text: 'اشتراکات آرسس',
    link: '#',
  },
  {
    text: 'سوالی دارید؟',
    link: '#',
  },
] as MenuItem[];
