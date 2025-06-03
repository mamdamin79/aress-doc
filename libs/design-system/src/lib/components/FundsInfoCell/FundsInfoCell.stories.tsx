import type { Meta, StoryObj } from '@storybook/react';
import { FundsInfoCell } from './FundsInfoCell';

// Meta configuration for the FundsInfoCell component in Storybook
const meta: Meta<typeof FundsInfoCell> = {
  title: 'Components/FundsInfoCell', // Defines the title in Storybook's UI
  component: FundsInfoCell, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FundsInfoCell>;

// A default story for the FundsInfoCell component
export const Default: Story = {
  args: {
    logo: 'https://s.cafebazaar.ir/images/icons/com.dotin.wepod-36b7a6e5-ed88-4590-ab3e-8811ed799168_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize',
    name: 'نام صندوق',
    pined: false,
    selected: false,
    shadow: true,
  },
  render: (args) => {
    return (
      <div className="flex flex-col">
        <FundsInfoCell {...args} />
        <FundsInfoCell {...args} />
        <FundsInfoCell {...args} />
      </div>
    );
  },
};
