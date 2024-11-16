import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { cn } from '../../../utils/classNames.utils';

// Meta configuration for the Tabs component in Storybook
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs', // Defines the title in Storybook's UI
  component: Tabs, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
  argTypes: {
    style: {
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
    <div className={cn({ 'bg-gray-100 py-10 w-full': !args.bgWhite })}>
      <Tabs {...args} />
    </div>
  ),
  args: {
    tabs: [
      {
        content: (
          <div className="flex items-center justify-between p-3 rounded-md bg-brand-500 text-white">
            <p>خلاطه</p>
            <p>تحلیل بازدهی</p>
            <p>ارزیابی ریسک</p>
            <p>پرتفوی صندوق</p>
          </div>
        ),
        title: 'خلاصه',
      },
      {
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        content: 'ارزیابی ریسک',
        title: 'سلام',
      },
      { content: 'تحلیل عملکرد', title: 'تحلیل عملکرد' },
    ],
    bgWhite: false,
    style: 'lined',
  },
};
