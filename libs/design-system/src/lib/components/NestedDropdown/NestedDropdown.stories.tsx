import type { Meta, StoryObj } from '@storybook/react';
import { NestedDropdown } from './NestedDropdown';

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof NestedDropdown> = {
  title: 'Components/NestedDropdown', // Defines the title in Storybook's UI
  component: NestedDropdown, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof NestedDropdown>;

// A default story for the Header component
export const Default: Story = {
  render: (args) => (
    <div className="mt-24 flex w-full items-center justify-center">
      <NestedDropdown {...args} />
    </div>
  ),
  args: {
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
        optionsListProps: {
          items: {
            items: [],
          },
          title: '',
        },
      },
    ],
  },
};
