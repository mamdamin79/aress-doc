import { Meta, StoryObj } from '@storybook/react/*';
import { AutoRotateSwitch } from './AutoRotateSwitch';

const meta: Meta<typeof AutoRotateSwitch> = {
  title: 'Components/AutoRotateSwitch',
  component: AutoRotateSwitch,
};

export default meta;

type Story = StoryObj<typeof AutoRotateSwitch>;

export const Default: Story = {
  render: (args) => (
    <div className="mt-16 flex w-full justify-center">
      <AutoRotateSwitch {...args} />
    </div>
  ),
  args: {
    onChange: () => console.log('onChange'),
    rotateOptions: [5, 10, 15],
  },
};
