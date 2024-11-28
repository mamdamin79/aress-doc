import type { Meta, StoryObj } from '@storybook/react';
import { Field } from './Field';

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof Field> = {
  title: 'Components/NestedDropdownField', // Defines the title in Storybook's UI
  component: Field, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof Field>;

// A default story for the Header component
export const normal: Story = {
  render: (args) =>  <div className="w-[292px]">
<Field {...args}/></div>,
  args: {
     title:"مبنای ارزش معاملات",
    icon:{ name: 'list-tree', size: 'sm' },
    status:"normal",
    activeIcon:{ name: 'list-minus', size: 'md' }
  }
};

export const opened: Story = {
  render: (args) =>  <div className="w-[292px]">
<Field {...args}/></div>,
  args: {
     title:"مبنای ارزش معاملات",
    icon:{ name: 'list-tree', size: 'sm' },
    status:"opened",
    activeIcon:{ name: 'list-minus', size: 'md' }
  }
};
export const selectedOption: Story = {
  render: (args) =>  <div className="w-[292px]">
<Field {...args}/></div>,
  args: {
     title:"صنعت:",
     selectedOption: "کل صنایع",
    icon:{ name: 'square-mouse-pointer', size: 'sm' },
    status:"normal",
  }
};
export const error: Story = {
  render: (args) =>  <div className="w-[292px]">
<Field {...args}/></div>,
  args: {
     title:"ابزار مالی:",
     placeHolder: "یک مورد را انتخاب کنید...",
     icon:{ name: 'square-mouse-pointer', size: 'sm' },
     status:"error",
  }
};