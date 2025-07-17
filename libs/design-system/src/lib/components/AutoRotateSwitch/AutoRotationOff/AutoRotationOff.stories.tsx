import { Meta, StoryObj } from '@storybook/nextjs';
import { AutoRotationOff } from './AutoRotationOff';
const meta: Meta<typeof AutoRotationOff> = {
  component: AutoRotationOff,

};

export default meta;

type Story = StoryObj<typeof AutoRotationOff>;

export const Default: Story = {
  args: {
  },
};