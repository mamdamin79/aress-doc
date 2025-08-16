import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/nextjs';
import { Tabs } from './Tabs';

const meta: Meta<typeof Tabs> = {
  title: 'Components/Tabs',
  component: Tabs,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'radio',
      options: [
        'shaped',
        'lined',
        'rounded',
        'rounded-full',
        'shaped-color',
        'sliding',
      ],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => {
    const [activeTab, setActiveTab] = useState<number>(1);

    return (
      <div>
        <Tabs
          {...args}
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
        />
      </div>
    );
  },
  args: {
    size: 'small',
    fullWidthDivider: false,
    tabs: [
      {
        id: '1',
        title: 'خلاصه',
        tag: 'green',
        content: (
          <div className="flex items-center justify-between rounded-md p-3">
            <p>خلاصه</p>
            <p>تحلیل بازدهی</p>
            <p>ارزیابی ریسک</p>
          </div>
        ),
      },
      {
        id: '2',
        title: 'تحلیل بازدهی',
        content: 'تحلیل بازدهی',
      },
      {
        id: '4',
        title: 'تحلیل بازدهی',
        content: 'تحلیل بازدهی',
      },
      {
        id: '5',
        title: 'تحلیل بازدهی',
        content: 'تحلیل بازدهی',
      },
    ],
    variant: 'lined',
  },
};
