import type { Meta, StoryObj } from '@storybook/nextjs';
import { MultiLineChart } from './MultiLineChart';

const meta: Meta<typeof MultiLineChart> = {
  title: 'Charts/MultiLineChart', // Defines the title in Storybook's UI
  component: MultiLineChart, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof MultiLineChart>;

export const Default: Story = {
  render: () => <MultiLineChart data={[]} />,
};
