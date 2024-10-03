import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/lib/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  // adding svgr addon - it is needed for storybook to have ability to render svgs as a react component
  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
    '@newhighsco/storybook-addon-svgr',
  ],
  framework: {
    name: '@storybook/nextjs',
    options: {
      builder: {
        viteConfigPath: 'vite.config.ts',
      },
    },
  },
};

export default config;

// To customize your Vite configuration you can use the viteFinal field.
// Check https://storybook.js.org/docs/react/builders/vite#configuration
// and https://nx.dev/recipes/storybook/custom-builder-configs
