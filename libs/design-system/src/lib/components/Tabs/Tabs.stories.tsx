import type { Meta, StoryObj } from '@storybook/react';
import { Tabs } from './Tabs';
import { cn } from '../../../utils/classNames.utils';

// Meta configuration for the Tabs component in Storybook
const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs', // Defines the title in Storybook's UI
  component: Tabs, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
  argTypes: {
    variant: {
      control: 'radio',
      options: ['shaped', 'lined', 'divided', 'rounded', 'rounded-full'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

// examples story for the Tabs component
export const Default: Story = {
  argTypes: {
    colorMode: {
      control: 'radio',
      options: ['neutral', 'inverse'],
    },
  },
  render: (args) => (
    <div
      className={cn({ 'w-max bg-gray-100 p-10': args.colorMode === 'inverse' })}
    >
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
        id: '1',
        tag: 'green',
        title: 'خلاصه',
      },
      {
        id: '2',
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
      {
        id: '3',
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
        tag: 'blue',
      },
      {
        id: '4',
        content: 'تحلیل بازدهی',
        title: 'تحلیل بازدهی',
      },
    ],
    colorMode: 'inverse',
    variant: 'lined',
    activeTab: 1,
  },
};
