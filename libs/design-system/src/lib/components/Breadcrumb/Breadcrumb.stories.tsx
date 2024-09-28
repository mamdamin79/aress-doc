import { Meta, StoryObj } from '@storybook/react/*';
import { Breadcrumb } from './Breadcrumb';

// Meta configuration for the Breadcrumb component in Storybook
const meta: Meta<typeof Breadcrumb> = {
  title: 'Components/Breadcrumb', // Defines the title in Storybook's UI
  component: Breadcrumb, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof Breadcrumb>;

// A default story for the Breadcrumb component
export const Home: Story = {
  args: {
    items: [
      { icon: 'house', link: '/' },
      { title: 'صندوق های من', link: '/' },
      { title: 'صندوق سرمایه گذاری سهم آشنا', link: '/' },
    ],
  },
};
