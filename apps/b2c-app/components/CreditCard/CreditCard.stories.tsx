import type { Meta, StoryObj } from '@storybook/nextjs';
import { CreditCard } from './CreditCard';

// Meta configuration for the CreditCard component in Storybook
const meta: Meta<typeof CreditCard> = {
  title: 'Components/CreditCard', // Defines the title in Storybook's UI
  component: CreditCard,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof CreditCard>;

// A default story for the CreditCard component
export const Default: Story = {
  args: {
    shabaNumber: ['25', '0560', '2137', '8880', '4958', '0960', '01'],
    accountNumber: ['2137', '888', '4958069', '1'],
    userName: 'علی علوی',
    bankIconName: 'Sepah',
  },
};
