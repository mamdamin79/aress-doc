import { Meta, StoryObj } from '@storybook/nextjs';
import { SwitchComponent } from './Switch';
const meta: Meta<typeof SwitchComponent> = {
  component: SwitchComponent,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SwitchComponent>;

export const Default: Story = {
  args: {
    isDisabled: false,
    defaultValue: false,
  },
};
