import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { cn } from '../../../utils/classNames.utils';

// Meta configuration for the Tabs component in Storybook
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs', // Defines the title in Storybook's UI
  component: Tabs, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
  argTypes: {
    mode: {
      control: 'radio',
      options: ['shaped', 'lined', 'divided', 'rounded', 'rounded-full'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

// examples story for the Tabs component
export const Default: Story = {
  render: (args) => (
    <div className={cn({ 'w-max bg-gray-100 py-10': !args.bgWhite })}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    onClickTab: (e) => console.log(e),

    tabs: [
      {
        content: (
          <div className="bg-brand-500 flex items-center justify-between rounded-md p-3 text-white">
            <p>خلاطه</p>
            <p>تحلیل بازدهی</p>
            <p>ارزیابی ریسک</p>
            <p>پرتفوی صندوق</p>
          </div>
        ),
        id: 1,
        title: 'خلاصه',
      },
      {
        id: 2,
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: 3,
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: 4,
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: 5,
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: 6,
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: 7,
        content: 'ارزیابی ریسک',
        title: 'سلام',
      },
      {
        id: 8,
        content: 'تحلیل عملکرد',
        title: 'تحلیل عملکرد',
      },
    ],
    bgWhite: false,
    mode: 'lined',
  },
};
