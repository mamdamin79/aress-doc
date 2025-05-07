import type { Meta, StoryObj } from '@storybook/react';
import { FilterPopUpSection } from './FilterPopUpSection';

// Meta configuration for the FilterPopUpSection component in Storybook
const meta: Meta<typeof FilterPopUpSection> = {
  title: 'Components/FilterPopUpSection', // Defines the title in Storybook's UI
  component: FilterPopUpSection, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof FilterPopUpSection>;

// A default story for the FilterPopUpSection component
export const Default: Story = {
  args: {
    name: 'بازده یک ساله',
    options: [
      'بازده منفی',
      'از صفر تا 30 درصد',
      'از 30 تا 50 درصد',
      'از 50 تا 100 درصد',
      'از 100 تا 200 درصد',
      'بیشتر از 200 درصد',
    ],
  },
};
