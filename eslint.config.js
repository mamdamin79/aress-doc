// E:/xampp/htdocs/aress-frontend/eslint.config.js
import tseslint from 'typescript-eslint';
import nxEslintPlugin from '@nx/eslint-plugin';

export default tseslint.config(
  {
    // THIS IS THE FIX: Ignore node_modules, build artifacts, AND all config files.

    // Ignore all common build/cache/config directories across the entire monorepo
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/.nx/',
      '**/coverage/',
      '**/.next/',
      '**/storybook-static/',
      '**/*.config.js',
      '**/*.config.ts',
    ],
  },

  // Base configuration from typescript-eslint
  ...tseslint.configs.recommended,

  // Configuration for Nx plugin and module boundary rules
  {
    plugins: {
      '@nx': nxEslintPlugin,
    },
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
);
