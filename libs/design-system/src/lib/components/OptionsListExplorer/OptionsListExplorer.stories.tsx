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
        <div className="w-fit overflow-hidden rounded-l-2xl bg-red-700">
          <OptionsListExplorer {...args} />
        </div>
      </div>
    );
  },
  args: {
    title: 'انتخاب صندوق',
    search: {
      placeholder: 'جستجوی صنعت...',
    },
    categories: ['همه', 'سهام', 'اوراق', 'صندوق', 'اوراق آتی', 'شاخص'],
    items: [
      {
        title: 'اعتبار سهام ایرانیان',
        investmentTypes: 'سهامی',
        total: 11263,
        percentage: 6,
      },
      {
        title: 'آوای سهام کیان',
        investmentTypes: 'درآمد ثابت',
        total: 11263,
        percentage: -3,
      },
      {
        title: 'آسمان یکم',
        investmentTypes: 'مختلط',
        total: 11263,
        percentage: 0,
      },
      {
        title: 'مشترک افق روشن کارگذاری بانک خودرور و منش',
        investmentTypes: 'مختلط',
        total: 14935,
        percentage: -9,
      },
    ],
  },
};
