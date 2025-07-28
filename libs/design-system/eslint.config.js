import nxPlugin from '@nx/eslint-plugin';
import storybookPlugin from 'eslint-plugin-storybook';
// eslint-disable-next-line @nx/enforce-module-boundaries
import baseConfig from '../../eslint.config.js';

export default [
  {
    ignores: [
      'storybook-static',
      'node_modules',
      '**/vite.config.*.timestamp*',
      '**/vitest.config.*.timestamp*',
    ],
  },
  {
    files: ['**/*'],
    plugins: {
      '@nx': nxPlugin,
      storybook: storybookPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          allow: ['moment', 'jalali-moment'],
        },
      ],
      ...baseConfig.rules,
    },
    settings: baseConfig.settings || {},
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {},
  },
];
