// apps/b2c-app/eslint.config.js
import rootConfig from '../../eslint.config.js'; // <-- Import the root config
import tseslint from 'typescript-eslint';
import nextPlugin from '@next/eslint-plugin-next';
import storybookPlugin from 'eslint-plugin-storybook';

export default tseslint.config(
  // 1. THIS IS THE KEY: Include the root config settings first.
  // This provides the TypeScript parser to this project.
  ...rootConfig,

  // 2. Now add app-specific configurations
  {
    files: ['apps/b2c-app/**/*.{ts,tsx,js,jsx}'],
    plugins: {
      '@next/next': nextPlugin,
      storybook: storybookPlugin,
    },
    rules: {
      // Your app-specific rules here
      '@next/next/no-html-link-for-pages': ['error', 'apps/fe-app/pages'],
    },
  },
);
