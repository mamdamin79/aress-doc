import type { Meta, StoryObj } from '@storybook/react';
import {Header} from './Header'

// Meta configuration for the Header component in Storybook
const meta: Meta<typeof Header> = {
  title: 'Components/Header', // Defines the title in Storybook's UI
  component: Header, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Header>;

// A default story for the Header component
export const Default: Story = {
  render: () => <Header />, // Rendering the Header component
};
