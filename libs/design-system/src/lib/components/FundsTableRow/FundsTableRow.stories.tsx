import type { Meta, StoryObj } from '@storybook/react';
import { FundsTableRow } from './FundsTableRow';

// Meta configuration for the FundsTableRow component in Storybook
const meta: Meta<typeof FundsTableRow> = {
  title: 'Components/FundsTableRow', // Defines the title in Storybook's UI
  component: FundsTableRow, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FundsTableRow>;

// A default story for the FundsTableRow component
export const Default: Story = {
  args: {
    data: [
      '9,450',
      '25,900',
      '+45',
      '8,145,144',
      '344444',
      '4444444',
      '233333',
    ],
    logo: 'https://s.cafebazaar.ir/images/icons/com.dotin.wepod-36b7a6e5-ed88-4590-ab3e-8811ed799168_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize',
    name: 'نام صندوق',
    pined: false,
    selected: false,
    shadow: true,
  },
  render: (args) => {
    return (
      <div className="flex flex-col">
        <FundsTableRow {...args} />
        <FundsTableRow {...args} />
        <FundsTableRow {...args} />
      </div>
    );
  },
};
