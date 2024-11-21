import { Meta, StoryObj } from '@storybook/react';
import { SharePopUp } from './SharePopUp';
const meta: Meta<typeof SharePopUp> = {
  component: SharePopUp,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SharePopUp>;

export const Default: Story = {
  render: (args) => {
    return <SharePopUp {...args} />;
  },
  args: {
    message: 'لینک ویدیوی آموزشی',
    url: 'https://www.example.com/video/example/thishasmoretoit/wetypeandwetype',
    platformNames: [
      'Email',
      'Linkedin',
      'Instagram',
      'Telegram',
      'WhatsApp',
      'Sample 1',
      'Sample 2',
    ],
  },
};
