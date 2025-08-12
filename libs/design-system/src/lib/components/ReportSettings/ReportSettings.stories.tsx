import type { Meta, StoryObj } from '@storybook/nextjs';
import { ReportSettings } from './ReportSettings';

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
  render: function Render(args) {
    return <ReportSettings {...args} />;
  },
  args: {
    options: [
      {
        type: 'nestedDropdown',
        props: {
          title: 'مبنای ارزش معاملات',
          items: [
            {
              title: 'نوع بازار:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کل بازار',
              onClick: () => console.log('نوع بازار clicked'),
              optionsListProps: {
                items: {
                  items: [],
                },
                title: '',
              },
            },
            {
              title: 'صنعت:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کانی‌ های فلزی',
              onClick: () => console.log('صنعت clicked'),
              optionsListProps: {
                items: {
                  items: [],
                },
                title: '',
              },
            },
            {
              title: 'صنعت:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'normal',
              selectedOption: 'کانی‌ های فلزی',
              onClick: () => console.log('صنعت clicked'),
              optionsListProps: {
                items: {
                  items: [],
                },
                title: '',
              },
            },
            {
              title: 'ابزار مالی:',
              icon: { name: 'square-mouse-pointer', size: 'sm' },
              status: 'error',
              placeHolder: 'یک مورد را انتخاب کنید...',
              onClick: () => console.log('ابزار مالی clicked'),
              optionsListProps: {
                items: {
                  items: [],
                },
                title: '',
              },
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
          optionsListProps: {
            items: {
              items: [],
            },
            title: '',
          },
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
          optionsListProps: {
            items: {
              items: [],
            },
            title: '',
          },
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
          optionsListProps: {
            items: {
              items: [],
            },
            title: '',
          },
        },
      },
    ],
  },
};
