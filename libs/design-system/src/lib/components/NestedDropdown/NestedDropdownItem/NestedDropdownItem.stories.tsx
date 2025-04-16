import type { Meta, StoryObj } from '@storybook/react';
import { NestedDropdownItem } from './NestedDropdownItem';

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof NestedDropdownItem> = {
  title: 'Components/NestedDropdownItem', // Defines the title in Storybook's UI
  component: NestedDropdownItem, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof NestedDropdownItem>;

// A default story for the Header component
export const Normal: Story = {
  render: (args) => (
    <div className="w-[292px]">
      <NestedDropdownItem {...args} />
    </div>
  ),
  args: {
    title: 'مبنای ارزش معاملات',
    icon: { name: 'list-tree', size: 'sm' },
    status: 'normal',
    activeIcon: { name: 'list-minus', size: 'md' },
  },
};

export const Opened: Story = {
  render: (args) => (
    <div className="w-[292px]">
      <NestedDropdownItem {...args} />
    </div>
  ),
  args: {
    title: 'مبنای ارزش معاملات',
    icon: { name: 'list-tree', size: 'sm' },
    status: 'opened',
    activeIcon: { name: 'list-minus', size: 'md' },
  },
};
export const SelectedOption: Story = {
  render: (args) => (
    <div className="w-[292px]">
      <NestedDropdownItem {...args} />
    </div>
  ),
  args: {
    title: 'صنعت:',
    selectedOption: 'کل صنایع',
    icon: { name: 'square-mouse-pointer', size: 'sm' },
    status: 'normal',
    hasTooltip: true,
  },
};
export const Error: Story = {
  render: (args) => (
    <div className="w-[292px]">
      <NestedDropdownItem {...args} />
    </div>
  ),
  args: {
    title: 'ابزار مالی:',
    placeHolder: 'یک مورد را انتخاب کنید...',
    icon: { name: 'square-mouse-pointer', size: 'sm' },
    status: 'error',
  },
};
