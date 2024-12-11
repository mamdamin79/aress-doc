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
          title: 'سهامی',
        },
        {
          id: 3,
          title: 'درآمد ثابت',
        },
        {
          id: 4,
          title: 'کالایی',
        },
        {
          id: 5,
          title: 'مختلط',
        },
        {
          id: 6,
          title: 'دیده بان',
        },
      ],
      items: [
        {
          title: 'ذغال سنگ',
          categoryId: 2,
          priceChangePercent: -5,
          priceRials: 11250,
          type: 'سهامی',
        },
        {
          title: 'مس',
          categoryId: 4,
          priceChangePercent: 2.3,
          priceRials: 45000,
          type: 'کالایی',
        },
        {
          title: 'آلومینیوم',
          categoryId: 5,
          priceChangePercent: -1.1,
          priceRials: 30000,
          type: 'مختلط',
        },
        {
          title: 'پتروشیمی',
          categoryId: 6,
          priceChangePercent: 3.5,
          priceRials: 22000,
          type: 'دیده بان',
        },
        {
          title: 'معدنی',
          categoryId: 2,
          priceChangePercent: 0.5,
          priceRials: 18000,
          type: 'سهامی',
        },
        {
          title: 'گاز',
          categoryId: 3,
          priceChangePercent: -2.5,
          priceRials: 35000,
          type: 'درآمد ثابت',
        },
        {
          title: 'برق',
          categoryId: 3,
          priceChangePercent: 4.0,
          priceRials: 15000,
          type: 'درآمد ثابت',
        },
        {
          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -1.5,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          title: 'شیمیایی',
          categoryId: 4,
          priceChangePercent: 5.0,
          priceRials: 33000,
          type: 'کالایی',
        },
        {
          title: 'سنگ آهن',
          categoryId: 2,
          priceChangePercent: -0.8,
          priceRials: 42000,
          type: 'سهامی',
        },
        {
          title: 'پلاستیک',
          categoryId: 5,
          priceChangePercent: 2.0,
          priceRials: 15000,
          type: 'مختلط',
        },
        {
          title: 'فلزات',
          categoryId: 6,
          priceChangePercent: 1.8,
          priceRials: 25000,
          type: 'دیده بان',
        },
        {
          title: 'صنعتی',
          categoryId: 6,
          priceChangePercent: 3.2,
          priceRials: 19000,
          type: 'دیده بان',
        },
        {
          title: 'گلابی',
          categoryId: 2,
          priceChangePercent: -0.5,
          priceRials: 21000,
          type: 'سهامی',
        },
        {
          title: 'شیشه',
          categoryId: 3,
          priceChangePercent: 3.4,
          priceRials: 27000,
          type: 'درآمد ثابت',
        },
        {
          title: 'داروسازی',
          categoryId: 4,
          priceChangePercent: 4.7,
          priceRials: 22000,
          type: 'کالایی',
        },
        {
          title: 'ماشین آلات',
          categoryId: 3,
          priceChangePercent: -1.0,
          priceRials: 33000,
          type: 'درآمد ثابت',
        },
        {
          title: 'نساجی',
          categoryId: 5,
          priceChangePercent: 0.9,
          priceRials: 30000,
          type: 'مختلط',
        },
        {
          title: 'کیمیا',
          categoryId: 3,
          priceChangePercent: 3.2,
          priceRials: 41000,
          type: 'درآمد ثابت',
        },
        {
          title: 'بافتی',
          categoryId: 3,
          priceChangePercent: 2.0,
          priceRials: 37000,
          type: 'درآمد ثابت',
        },
        {
          title: 'معدن',
          categoryId: 6,
          priceChangePercent: -3.0,
          priceRials: 26000,
          type: 'دیده بان',
        },
        {
          title: 'برند',
          categoryId: 4,
          priceChangePercent: 1.4,
          priceRials: 25000,
          type: 'کالایی',
        },
        {
          title: 'سرامیک',
          categoryId: 3,
          priceChangePercent: 0.6,
          priceRials: 34000,
          type: 'درآمد ثابت',
        },
        {
          title: 'الکترونیک',
          categoryId: 3,
          priceChangePercent: 2.5,
          priceRials: 36000,
          type: 'درآمد ثابت',
        },
        {
          title: 'نفت',
          categoryId: 3,
          priceChangePercent: 3.5,
          priceRials: 42000,
          type: 'درآمد ثابت',
        },
        {
          title: 'چوب',
          categoryId: 2,
          priceChangePercent: -2.0,
          priceRials: 25000,
          type: 'سهامی',
        },
        {
          title: 'توسعه',

          priceChangePercent: 4.8,
          priceRials: 19000,
          type: 'شرکتی',
        },
        {
          title: 'لوازم خانگی',
          categoryId: 4,
          priceChangePercent: 1.1,
          priceRials: 22000,
          type: 'کالایی',
        },
        {
          title: 'مبلمان',
          categoryId: 6,
          priceChangePercent: 3.3,
          priceRials: 33000,
          type: 'دیده بان',
        },
        {
          title: 'برق',
          categoryId: 5,
          priceChangePercent: 2.9,
          priceRials: 31000,
          type: 'مختلط',
        },
        {
          title: 'کاشی',
          categoryId: 3,
          priceChangePercent: -0.3,
          priceRials: 23000,
          type: 'خصوصی',
        },
        {
          title: 'فولاد',
          categoryId: 4,
          priceChangePercent: 2.4,
          priceRials: 37000,
          type: 'کالایی',
        },
        {
          title: 'گلابی',
          categoryId: 2,
          priceChangePercent: 1.2,
          priceRials: 38000,
          type: 'سهامی',
        },
      ],
    },
  },
};
