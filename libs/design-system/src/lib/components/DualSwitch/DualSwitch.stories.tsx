import { Meta, StoryObj } from '@storybook/react/*';
import { DualSwitch } from './DualSwitch';
import { useState } from 'react';
const meta: Meta<typeof DualSwitch> = {
  title: 'Components/DualSwitch',
  component: DualSwitch,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof DualSwitch>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="flex w-full justify-center mt-44">
        <DualSwitch {...args} />
      </div>
    );
  },
  args: {
    bgWhite: false,
    disabled: false,
    items: [
      {
        icon: { name: 'presentation' },
        tooltip: { title: 'tooltip', position: 'bottom' },
      },
      { icon: { name: 'layout-grid' } },
    ],
    size: 'sm',
    initialIndex: 0,
  },
};
