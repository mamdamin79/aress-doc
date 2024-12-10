import type { Meta, StoryObj } from '@storybook/react';
import { OptionsListExplorer } from './OptionsListExplorer';

// Meta configuration for the OptionsListExplorer component in Storybook
const meta: Meta<typeof OptionsListExplorer> = {
  title: 'Components/OptionsListExplorer', // Defines the title in Storybook's UI
  component: OptionsListExplorer, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};
export default meta;

type Story = StoryObj<typeof OptionsListExplorer>;

// A default story for the OptionsListExplorer component
export const Default: Story = {
  render: (args) => {
    return (
      <div className="bg-[#EFF0F2] p-10">
        <div className="w-fit overflow-hidden rounded-l-2xl">
          <OptionsListExplorer {...args} />
        </div>
      </div>
    );
  },
  args: {
    title: 'انتخاب صندوق',
    onSearch: (value: string) => console.log(value),
    search: {
      placeholder: 'جستجوی صنعت...',
    },
    onBackButtonClick: () => console.log('click to back'),
    items: {
      categories: [
        {
          id: 1,
          title: 'همه',
        },
        {
          id: 2,
          title: 'سهام',
        },
        {
          id: 3,
          title: 'اوراق',
        },
        {
          id: 4,
          title: 'صندوق',
        },
      ],
      items: [
        {
          title: 'ذغال سنگ',
          categoryId: 3,
          priceChangePercent: -5,
          priceRials: 11250,
          type: 'شرکتی',
        },
        {
          title: 'مس',
          categoryId: 1,
          priceChangePercent: 2.3,
          priceRials: 45000,
          type: 'شرکتی',
        },
        {
          title: 'آلومینیوم',
          categoryId: 2,
          priceChangePercent: -1.1,
          priceRials: 30000,
          type: 'شرکتی',
        },
        {
          title: 'پتروشیمی',
          categoryId: 4,
          priceChangePercent: 3.5,
          priceRials: 22000,
          type: 'دولتی',
        },
        {
          title: 'معدنی',
          categoryId: 5,
          priceChangePercent: 0.5,
          priceRials: 18000,
          type: 'خصوصی',
        },
        {
          title: 'گاز',
          categoryId: 6,
          priceChangePercent: -2.5,
          priceRials: 35000,
          type: 'دولتی',
        },
        {
          title: 'برق',
          categoryId: 7,
          priceChangePercent: 4.0,
          priceRials: 15000,
          type: 'شرکتی',
        },
        {
          title: 'کاشی',
          categoryId: 8,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'خصوصی',
        },
        {
          title: 'شیمیایی',
          categoryId: 9,
          priceChangePercent: 5.0,
          priceRials: 33000,
          type: 'دولتی',
        },
        {
          title: 'سنگ آهن',
          categoryId: 10,
          priceChangePercent: -0.8,
          priceRials: 42000,
          type: 'شرکتی',
        },
        {
          title: 'سرامیک',
          categoryId: 11,
          priceChangePercent: 3.3,
          priceRials: 21000,
          type: 'خصوصی',
        },
        {
          title: 'پلاستیک',
          categoryId: 12,
          priceChangePercent: 1.2,
          priceRials: 39000,
          type: 'شرکتی',
        },
        {
          title: 'فلزات',
          categoryId: 13,
          priceChangePercent: -3.0,
          priceRials: 28000,
          type: 'دولتی',
        },
        {
          title: 'صنعتی',
          categoryId: 14,
          priceChangePercent: 2.0,
          priceRials: 25000,
          type: 'خصوصی',
        },
        {
          title: 'تولیدی',
          categoryId: 15,
          priceChangePercent: -1.8,
          priceRials: 33000,
          type: 'شرکتی',
        },
        {
          title: 'نساجی',
          categoryId: 16,
          priceChangePercent: 0.0,
          priceRials: 19000,
          type: 'دولتی',
        },
        {
          title: 'ماشین آلات',
          categoryId: 17,
          priceChangePercent: -0.5,
          priceRials: 42000,
          type: 'خصوصی',
        },
        {
          title: 'چوب',
          categoryId: 18,
          priceChangePercent: 3.1,
          priceRials: 34000,
          type: 'شرکتی',
        },
        {
          title: 'پوشاک',
          categoryId: 19,
          priceChangePercent: 0.7,
          priceRials: 23000,
          type: 'دولتی',
        },
        {
          title: 'مبلمان',
          categoryId: 20,
          priceChangePercent: -2.2,
          priceRials: 31000,
          type: 'خصوصی',
        },
        {
          title: 'مواد غذایی',
          categoryId: 21,
          priceChangePercent: 1.5,
          priceRials: 27000,
          type: 'شرکتی',
        },
        {
          title: 'لوازم خانگی',
          categoryId: 22,
          priceChangePercent: 2.8,
          priceRials: 19000,
          type: 'دولتی',
        },
        {
          title: 'داروسازی',
          categoryId: 23,
          priceChangePercent: -4.0,
          priceRials: 32000,
          type: 'شرکتی',
        },
        {
          title: 'شیشه',
          categoryId: 24,
          priceChangePercent: 1.8,
          priceRials: 35000,
          type: 'خصوصی',
        },
        {
          title: 'فلزی',
          categoryId: 25,
          priceChangePercent: 4.2,
          priceRials: 38000,
          type: 'دولتی',
        },
        {
          title: 'الکترونیک',
          categoryId: 26,
          priceChangePercent: -0.9,
          priceRials: 20000,
          type: 'شرکتی',
        },
        {
          title: 'نفت',
          categoryId: 27,
          priceChangePercent: 5.5,
          priceRials: 45000,
          type: 'دولتی',
        },
        {
          title: 'کیمیا',
          categoryId: 28,
          priceChangePercent: -1.0,
          priceRials: 40000,
          type: 'خصوصی',
        },
        {
          title: 'بافتی',
          categoryId: 29,
          priceChangePercent: 0.3,
          priceRials: 31000,
          type: 'شرکتی',
        },
        {
          title: 'توسعه',
          categoryId: 30,
          priceChangePercent: 3.9,
          priceRials: 25000,
          type: 'دولتی',
        },
        {
          title: 'برند',
          categoryId: 31,
          priceChangePercent: 2.7,
          priceRials: 19000,
          type: 'خصوصی',
        },
        {
          title: 'فولاد',
          categoryId: 32,
          priceChangePercent: -2.4,
          priceRials: 35000,
          type: 'شرکتی',
        },
        {
          title: 'معدن',
          categoryId: 33,
          priceChangePercent: 4.8,
          priceRials: 42000,
          type: 'دولتی',
        },
        {
          title: 'گلابی',
          categoryId: 34,
          priceChangePercent: 0.1,
          priceRials: 37000,
          type: 'خصوصی',
        },
        {
          title: 'جو',
          categoryId: 35,
          priceChangePercent: -3.2,
          priceRials: 25000,
          type: 'شرکتی',
        },
        {
          title: 'رنگین',
          categoryId: 36,
          priceChangePercent: 5.0,
          priceRials: 33000,
          type: 'دولتی',
        },
      ],
    },
  },
};
