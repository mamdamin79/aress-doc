import { Meta, StoryObj } from '@storybook/nextjs';
import { SquaredButton } from './SquaredButton';
const meta: Meta<typeof SquaredButton> = {
  component: SquaredButton,
};

export default meta;

type Story = StoryObj<typeof SquaredButton>;

export const lightDarkSwitch: Story = {
  args: {
    icons: [{ name: 'sun' }, { name: 'moon' }],
    badge: {
      enabled: false,
    },
  },
};
export const notification: Story = {
  args: {
    icons: [{ name: 'bell' }],
    badge: {
      enabled: true,
      text: '3',
    },
  },
};
