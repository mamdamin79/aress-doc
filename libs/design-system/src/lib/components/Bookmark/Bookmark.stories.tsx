import type { Meta, StoryObj } from '@storybook/react';
import { Bookmark } from './Bookmark';

// Meta configuration for the Bookmark component in Storybook
const meta: Meta<typeof Bookmark> = {
  title: 'Components/Bookmark', // Defines the title in Storybook's UI
  component: Bookmark, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Bookmark>;

// A default story for the Bookmark component
export const Default: Story = {
  render: () => <Bookmark />, // Rendering the Bookmark component
};
