/* eslint-disable */
import type { Preview } from '@storybook/nextjs';
import type { Decorator } from '@storybook/react';
import React from 'react'; // required for JSX
import './tailwind-imports.css';

export const globalTypes: Preview['globalTypes'] = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'light',
    toolbar: {
      icon: 'circlehollow',
      items: ['light', 'dark'],
      showName: true,
    },
  },
};

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme;

  // Toggle Tailwind dark class
  document.documentElement.classList.remove('dark');
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  }

  document.documentElement.style.colorScheme = theme;

  return (
    <div className="bg-surface-neutral-background text-text-neutral-primary h-screen p-4">
      <Story />
    </div>
  );
};

export const decorators = [withTheme];
