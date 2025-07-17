import { Meta, StoryObj } from '@storybook/nextjs';
import { PrimarySection } from './PrimarySection';
const meta: Meta<typeof PrimarySection> = {
  component: PrimarySection,
};

export default meta;

type Story = StoryObj<typeof PrimarySection>;

export const Default: Story = {
  args: {
    iconMode: 'negative',
    primaryText: {
      mode: 'positive',
      text: 'متن پرایمری',
    },
    secondaryText: {
      mode: 'negative',
      text: 'متن سکندری',
    },
  },
};
