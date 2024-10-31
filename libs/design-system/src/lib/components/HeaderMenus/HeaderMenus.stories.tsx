import type { Meta, StoryObj } from '@storybook/react';

import { HeaderMenus } from './HeaderMenus';
import { menu } from './HeaderMenus.constants';
const meta: Meta<typeof HeaderMenus> = {
  title: 'Components/HeaderMenus',
  component: HeaderMenus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderMenus>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="p-5">
        <HeaderMenus {...args} />
      </div>
    );
  },
  args: {
    menuItems: [
      {
        name: 'داشبورد مدیریتی',
        link: '#',

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
                text: 'تحلیل صنعت پتروشیمی',
                isDashboard: true,
                isActive: true,
                leadingAction: () => console.log('clicked'),
              },
              {
                text: 'صندوق کالایی',
                isDashboard: true,
                leadingAction: () => console.log('clicked'),
              },
              {
                text: 'صندوق های پربازده',
                isDashboard: true,
                leadingAction: () => console.log('clicked'),
              },
              {
                text: 'مقایسه صندوق من',
                isDashboard: true,
                leadingAction: () => console.log('clicked'),
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
      {
        name: 'صندوق های سرمایه گذاری',
        link: '#',
      },
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
      {
        name: 'نمودار',
        link: '#',
      },
      {
        name: 'اشتراکات آرسس',
        link: '#',
      },
      {
        name: 'سوالی دارید؟',
        link: '#',
      },
    ],
  },
};
