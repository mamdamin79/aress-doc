import type { Meta, StoryObj } from '@storybook/react';
import { FundsFilterSection } from './FundsFilterSection';

// Meta configuration for the FundsFilterSection component in Storybook
const meta: Meta<typeof FundsFilterSection> = {
  title: 'Components/FundsFilterSection', // Defines the title in Storybook's UI
  component: FundsFilterSection, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FundsFilterSection>;

// A default story for the FundsFilterSection component
export const Default: Story = {
  args: {
    title: 'متن نمونه تایتل',
    onToggle: (e) => {
      console.log(e);
    },
    options: ['متن نمونه 1', 'متن نمونه 2', 'متن نمونه 3', 'متن نمونه 4'],
    selectedColumns: {
      'متن نمونه 1': true,
      'متن نمونه 2': false,
      'متن نمونه 3': true,
    },
  },
};
