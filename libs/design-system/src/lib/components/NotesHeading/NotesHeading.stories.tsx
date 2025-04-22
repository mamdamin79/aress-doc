import type { Meta, StoryObj } from '@storybook/react';

import { NotesHeading } from './NotesHeading';

// Meta configuration for the NotesHeading component in Storybook
const meta: Meta<typeof NotesHeading> = {
  title: 'Components/NotesHeading', // Defines the title in Storybook's UI
  component: NotesHeading, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof NotesHeading>;

export const security: Story = {
  args: {
    icon: { name: 'shield-alert', size: 'lg' },
    title: 'نکات امنیتی',
  },
};
export const info: Story = {
  args: {
    icon: { name: 'info', size: 'lg' },
    title: 'فرایند بازنشانی رمز عبور',
  },
};
