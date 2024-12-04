import { Meta, StoryObj } from '@storybook/react/*';
import { DualSwitch } from './DualSwitch';
import { useState } from 'react';
const meta: Meta<typeof DualSwitch> = {
  title: 'Components/DualSwitch',
  component: DualSwitch,
};

export default meta;

type Story = StoryObj<typeof DualSwitch>;

export const bgWhite: Story = {
  render: (args) => {
    const [activeIndex, setActiveIndex] = useState(0);
    return (
      <div className="flex w-full justify-center mt-44">
        <DualSwitch
          {...args}
          activeIndex={activeIndex}
          setActiveIndex={setActiveIndex}
        />
      </div>
    );
  },
  args: {
    bgWhite: false,
    disabled: true,
  },
};
