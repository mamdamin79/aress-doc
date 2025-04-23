import { Meta, StoryObj } from '@storybook/react';
import { DualSwitch } from './DualSwitch';
import { DualSwitchItem } from './DualSwitch.types';

const meta: Meta<typeof DualSwitch> = {
  title: 'Components/DualSwitch',
  component: DualSwitch,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'changed' },
    size: {
      control: 'radio',
      options: ['sm', 'lg'],
    },
    disabled: {
      control: 'boolean',
    },
    bgWhite: {
      control: 'boolean',
    },
  },
};
export default meta;
type Story = StoryObj<typeof DualSwitch>;

const defaultItems = [
  {
    icon: { name: 'presentation' },
    tooltip: { title: 'Presentation Mode', position: 'bottom' },
  },
  {
    icon: { name: 'layout-grid' },
    tooltip: { title: 'Grid Layout', position: 'bottom' },
  },
];

export const Default: Story = {
  render: (args) => {
    return (
      <div className="mt-44 flex w-full justify-center">
        <DualSwitch {...args} />
      </div>
    );
  },
  args: {
    bgWhite: false,
    disabled: false,
    items: defaultItems as DualSwitchItem[],
    size: 'sm',
    initialIndex: 0,
    onChange: (index) => console.log('Selected index:', index),
  },
};

export const LargeSize: Story = {
  ...Default,
  args: {
    ...Default.args,
    size: 'lg',
  },
};

export const WithWhiteBackground: Story = {
  ...Default,
  args: {
    ...Default.args,
    bgWhite: true,
  },
  parameters: {
    backgrounds: { default: 'gray' },
  },
};

export const Disabled: Story = {
  ...Default,
  args: {
    ...Default.args,
    disabled: true,
  },
};

export const SecondOptionSelected: Story = {
  ...Default,
  args: {
    ...Default.args,
    initialIndex: 1,
  },
};
