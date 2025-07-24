import type { Decorator, Preview } from '@storybook/nextjs';
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

  // Let browser handle background and native widgets with system default
  document.documentElement.style.colorScheme = theme;

  // Optional: clear manual background styles if any
  const previewWrapper = document.getElementById('storybook-preview-wrapper');
  if (previewWrapper) {
    previewWrapper.style.backgroundColor = '';
  }

  return Story();
};

export const decorators = [withTheme];
