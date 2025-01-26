import { Meta, StoryObj } from '@storybook/react/*';
import { AutoRotateSwitch } from './AutoRotateSwitch';
import { AutoRotationOff } from './AutoRotationOff/AutoRotationOff';
import { useState } from 'react';

const meta: Meta<typeof AutoRotateSwitch> = {
  title: 'Components/AutoRotateSwitch',
  component: AutoRotateSwitch,
};

export default meta;

type Story = StoryObj<typeof AutoRotateSwitch>;
export const Default: Story = {
  render: () => {
    const [isActive, setIsActive] = useState<number | null>(null);

    return (
      <div className="mt-16 flex w-full justify-center">
        <AutoRotationOff onClick={() => setIsActive(null)} />
        <AutoRotateSwitch
          initialValue={isActive}
          onChange={(value) => setIsActive(value)}
          rotateOptions={[5, 10, 15]}
        />
      </div>
    );
  },
};
