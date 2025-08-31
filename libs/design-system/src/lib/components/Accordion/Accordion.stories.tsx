import { Meta, StoryObj } from '@storybook/nextjs';
import React from 'react';
import { Accordion } from './Accordion';
import { Icon } from '../Icon';

const meta: Meta<typeof Accordion> = {
  component: Accordion,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component:
          'Enhanced Accordion component with support for custom trigger and content props, along with backward compatibility for traditional title/content usage. Custom triggers can be functions that receive the open state for dynamic behavior (e.g., rotating chevrons). Supports custom styling through className prop and flexible behavior options.',
      },
    },
  },
  argTypes: {
    mode: {
      control: { type: 'select' },
      options: ['b2b', 'b2c'],
      description: 'Visual mode for styling',
    },
    singleOpen: {
      control: { type: 'boolean' },
      description: 'Whether only one item can be open at a time',
    },
    allowMultiple: {
      control: { type: 'boolean' },
      description: 'Allow multiple items to be open simultaneously',
    },
    defaultOpenItems: {
      control: { type: 'object' },
      description: 'Array of item indexes to open by default',
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

// Traditional Title/Content Usage (Backward Compatibility)
export const Default: Story = {
  name: 'Traditional Title/Content',
  args: {
    items: [
      {
        title: 'مدیر صندوق سهم مدیریت این صندوق را دارد؟',
        content:
          'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است.',
      },
      {
        title: 'مدیر صندوق سهم آشنا چند سال تجربه مدیریت این را دارد؟',
        content:
          'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است.',
      },
      {
        title: 'صندوق سهم آشنا چند سال تجربه مدیریت این صندوق را دارد؟',
        content:
          'مدیر صندوق سهم آشنا دارای ۵ سال سابقه مدیریت است. طی این مدت، او موفق به افزایش ارزش دارایی‌های صندوق و بهبود عملکرد سرمایه‌گذاری‌ها شده است.',
      },
    ],
    mode: 'b2c',
    singleOpen: true,
  },
};

// Custom Trigger and Content
export const CustomTriggerContent: Story = {
  name: 'Custom Trigger & Content',
  args: {
    items: [
      {
        trigger: (isOpen: boolean) => (
          <div className="flex w-full items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-4 transition-colors hover:bg-blue-100">
            <div className="flex items-center gap-3">
              <Icon name="star" size="md" />
              <span className="font-semibold text-blue-900">
                گزارش عملکرد ویژه
              </span>
            </div>
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <Icon name="chevron-down" size="sm" />
            </div>
          </div>
        ),
        content: (
          <div className="rounded-lg bg-gradient-to-r from-blue-50 to-purple-50 p-4">
            <h3 className="mb-2 text-lg font-bold">گزارش تفصیلی عملکرد</h3>
            <p className="mb-3 text-gray-700">
              این گزارش شامل تمامی اطلاعات مربوط به عملکرد صندوق در ماه گذشته
              می‌باشد.
            </p>
            <div className="flex gap-2">
              <button className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">
                دانلود گزارش
              </button>
              <button className="rounded-md bg-gray-200 px-4 py-2 text-gray-700 hover:bg-gray-300">
                انصراف
              </button>
            </div>
          </div>
        ),
      },
      {
        trigger: (isOpen: boolean) => (
          <div className="flex w-full items-center justify-between rounded-lg border border-green-200 bg-green-50 p-3">
            <div className="flex items-center gap-2">
              <Icon name="check-circle" size="md" />
              <span className="font-medium text-green-800">مدارک صندوق</span>
            </div>
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <Icon name="chevron-down" size="sm" />
            </div>
          </div>
        ),
        content: (
          <div className="rounded-lg bg-green-50 p-4">
            <div className="mb-2 flex items-center gap-2">
              <Icon name="trending-up" size="sm" />
              <span className="font-semibold">مدارک مهم صندوق</span>
            </div>
            <ul className="list-inside list-disc space-y-1 text-gray-700">
              <li>اساسنامه صندوق سرمایه‌گذاری</li>
              <li>آخرین گزارش عملکرد ماهانه</li>
              <li>بیانیه ریسک و شرایط سرمایه‌گذاری</li>
            </ul>
          </div>
        ),
      },
    ],
    mode: 'b2c',
    allowMultiple: true,
  },
};

// Mixed Mode: Traditional + Custom
export const MixedMode: Story = {
  name: 'Mixed Traditional & Custom',
  args: {
    items: [
      {
        title: 'سوال متداول درباره صندوق',
        content:
          'این یک مورد استاندارد سوالات متداول است که از روش سنتی title و content استفاده می‌کند.',
      },
      {
        trigger: (isOpen: boolean) => (
          <div className="flex w-full items-center justify-between rounded-lg border border-yellow-200 bg-yellow-50 p-3">
            <div className="flex items-center gap-2">
              <Icon name="alert-triangle" size="md" />
              <span className="font-medium text-yellow-800">اطلاعیه مهم</span>
            </div>
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <Icon name="chevron-down" size="sm" />
            </div>
          </div>
        ),
        content: (
          <div className="rounded-lg border-l-4 border-yellow-400 bg-yellow-50 p-4">
            <p className="text-yellow-800">
              این یک پنل هشدار سفارشی با استایل و قالب‌بندی ویژه است که اطلاعات
              مهم را نمایش می‌دهد.
            </p>
          </div>
        ),
      },
      {
        title: 'سوال دیگر درباره سرمایه‌گذاری',
        content:
          'این مثال نشان‌دهنده ترکیب مداخل سنتی و سفارشی در یک آکوردیون است.',
      },
    ],
    mode: 'b2c',
    allowMultiple: true,
  },
};

// Advanced Features
export const AdvancedFeatures: Story = {
  name: 'Advanced Features & Styling',
  args: {
    items: [
      {
        title: 'مورد باز به صورت پیش‌فرض',
        content:
          'این مورد از ابتدا در حالت باز قرار دارد و اطلاعات مهم را نمایش می‌دهد.',
        defaultOpen: true,
        className: 'bg-blue-50 border-blue-200',
      },
      {
        title: 'مورد با استایل سفارشی',
        content:
          'این مورد دارای استایل سفارشی است که از className استفاده می‌کند.',
        className: 'bg-purple-50 border-purple-200',
      },
      {
        trigger: (isOpen: boolean) => (
          <div className="flex w-full items-center justify-between rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 p-4">
            <div className="flex items-center gap-2">
              <Icon name="heart" size="md" />
              <span className="bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text font-semibold text-transparent">
                تریگر گرادیانی
              </span>
            </div>
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <Icon name="chevron-down" size="sm" />
            </div>
          </div>
        ),
        content: (
          <div className="rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 p-4">
            <p className="text-gray-700">
              تریگر و محتوای سفارشی با استایل گرادیانی که حالت باز/بسته را نشان
              می‌دهد.
            </p>
          </div>
        ),
      },
    ],
    mode: 'b2c',
    allowMultiple: true,
    defaultOpenItems: [0],
  },
};

// B2B Mode
export const B2BMode: Story = {
  name: 'B2B Mode',
  args: {
    items: [
      {
        title: 'ویژگی سازمانی شماره ۱',
        content:
          'این آکوردیون از استایل B2B با حاشیه‌ها و فاصله‌بندی متفاوت استفاده می‌کند.',
      },
      {
        title: 'ویژگی سازمانی شماره ۲',
        content: 'حالت B2B ظاهری حرفه‌ای‌تر و ساختاریافته‌تر ارائه می‌دهد.',
      },
      {
        trigger: (isOpen: boolean) => (
          <div className="flex w-full items-center justify-between">
            <div className="flex items-center gap-3">
              <Icon name="building" size="md" />
              <span className="font-semibold">مورد سفارشی B2B</span>
            </div>
            <div
              className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
            >
              <Icon name="chevron-down" size="sm" />
            </div>
          </div>
        ),
        content: (
          <div className="rounded-lg bg-gray-50 p-4">
            <p>تریگر و محتوای سفارشی در حالت B2B نیز به خوبی کار می‌کند.</p>
          </div>
        ),
      },
    ],
    mode: 'b2b',
    singleOpen: true,
  },
};

// Single Open Mode
export const SingleOpenMode: Story = {
  name: 'Single Open Mode',
  args: {
    items: [
      {
        title: 'First Item',
        content: 'When you open this item, others will automatically close.',
      },
      {
        title: 'Second Item',
        content: 'Only one item can be open at a time in single open mode.',
      },
      {
        title: 'Third Item',
        content: 'This demonstrates the single open behavior.',
      },
    ],
    mode: 'b2c',
    singleOpen: true,
  },
};

// Multiple Open Mode
export const MultipleOpenMode: Story = {
  name: 'Multiple Open Mode',
  args: {
    items: [
      {
        title: 'First Item',
        content: 'You can have multiple items open simultaneously.',
        defaultOpen: true,
      },
      {
        title: 'Second Item',
        content: 'This item can be open at the same time as others.',
        defaultOpen: true,
      },
      {
        title: 'Third Item',
        content: 'All items can be expanded together.',
      },
    ],
    mode: 'b2c',
    allowMultiple: true,
    defaultOpenItems: [0, 1],
  },
};
