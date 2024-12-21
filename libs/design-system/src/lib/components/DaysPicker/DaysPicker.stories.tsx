import type { Meta, StoryObj } from '@storybook/react';
import { DaysPicker } from './DaysPicker';

// Meta configuration for the DaysPicker component in Storybook
const meta: Meta<typeof DaysPicker> = {
  title: 'Components/DaysPicker', // Defines the title in Storybook's UI
  component: DaysPicker, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DaysPicker>;

// A default story for the DaysPicker component
export const Default: Story = {
    args: {
        date: '1403-05-05', // Example date for the DaysPicker
    },
};
