import playwright from 'eslint-plugin-playwright';
import baseConfig from '../../eslint.config.js';

export default [
  {
    // Replaces "ignorePatterns"
    ignores: [],
  },
  {
    // Base config
    files: ['**/*'],
    plugins: {
      playwright,
    },
    rules: {
      ...baseConfig.rules,
    },
    settings: baseConfig.settings || {},
  },
  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    rules: {},
  },
  {
    files: ['src/**/*.{ts,js,tsx,jsx}'],
    rules: {},
  },
];
