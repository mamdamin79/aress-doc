import type { Meta, StoryObj } from '@storybook/react';
import { ReportSettings } from './ReportSettings';
import { useState } from 'react';

// Meta configuration for the ReportSettings component in Storybook
const meta: Meta<typeof ReportSettings> = {
  title: 'Components/ReportSettings', // Defines the title in Storybook's UI
  component: ReportSettings, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof ReportSettings>;

// A default story for the ReportSettings component
export const Default: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <div onClick={() => setIsOpen(!isOpen)}>
        <ReportSettings {...args} isOpen={isOpen} />
        <span>open</span>
      </div>
    );
  },
  args: {
    options: [
      {
        type: 'nestedDropdown',
        props: {
          title: 'مبنای ارزش معاملات',
          subFields: [
            {
              title: 'نوع بازار:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کل بازار',
              onClick: () => console.log('نوع بازار clicked'),
            },
            {
              title: 'صنعت:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کانی‌ های فلزی',
              onClick: () => console.log('صنعت clicked'),
            },
            {
              title: 'صنعت:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کانی‌ های فلزی',
              onClick: () => console.log('صنعت clicked'),
            },
            {
              title: 'ابزار مالی:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'error',
              placeHolder: 'یک مورد را انتخاب کنید...',
              onClick: () => console.log('ابزار مالی clicked'),
            },
          ],
        },
      },
      {
        type: 'basicSelection',
        props: {
          title: 'نوع نمودار:',
          icon: { name: 'square-mouse-pointer', size: 'sm' },
          status: 'normal',
          selectedOption: 'خطی',
          onClick: () => console.log('hi'),
        },
      },
      {
        type: 'basicSelection',
        props: {
          title: 'صندوق:',
          icon: { name: 'square-mouse-pointer', size: 'sm' },
          status: 'normal',
          selectedOption: 'مشترک افق روشن سرمایه‌گذاری بانک نوین',
          onClick: () => console.log('hi'),
        },
      },
      {
        type: 'basicSelection',
        props: {
          title: 'دسته‌بندی اوراق:',
          icon: { name: 'square-mouse-pointer', size: 'sm' },
          status: 'normal',
          selectedOption: 'کل اوراق',
          onClick: () => console.log('hi'),
        },
      },
    ],
  },
};
