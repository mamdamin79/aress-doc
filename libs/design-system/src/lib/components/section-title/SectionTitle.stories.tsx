import { Meta, StoryObj } from '@storybook/react';
import { SectionTitle } from './SectionTitle';
const meta: Meta<typeof SectionTitle> = {
  component: SectionTitle,
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof SectionTitle>;

export const Default: Story = {
  args: {
    title: 'مصاحبات  با مدیر صندوق “سهم آشنا”',
    align: 'center',
  },
};
