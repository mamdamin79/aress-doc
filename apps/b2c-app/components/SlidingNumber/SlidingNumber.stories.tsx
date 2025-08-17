import { Meta, StoryObj } from '@storybook/nextjs';
import { SlidingNumber } from './SlidingNumber';
const meta: Meta<typeof SlidingNumber> = {
  title: 'Components/SlidingNumber',
  component: SlidingNumber,
};

export default meta;

type Story = StoryObj<typeof SlidingNumber>;

export const Default: Story = {
  args: {
    quantity: 50000388,
  },
};
