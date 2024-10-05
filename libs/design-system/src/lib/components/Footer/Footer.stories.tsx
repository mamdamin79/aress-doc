import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

// Meta configuration for the Footer component in Storybook
const meta: Meta<typeof Footer> = {
  title: 'Components/Footer', // Defines the title in Storybook's UI
  component: Footer, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Footer>;

// A default story for the Header component
export const Default: Story = {
  render: () => <Footer />, // Rendering the Footer component
};
