// eslint.config.js
import tseslint from 'typescript-eslint';
import nxEslintPlugin from '@nx/eslint-plugin';

export default tseslint.config(
  {
    // Ignore build artifacts, cache dirs, and generated code — but not your actual source files!
    ignores: [
      '**/node_modules/',
      '**/dist/',
      '**/.nx/',
      '**/coverage/',
      '**/.next/',
      '**/storybook-static/',
      '**/*.config.js',
      '**/*.config.ts',
      '**/libs/openapi/**', // Ignore only the generated OpenAPI code
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
