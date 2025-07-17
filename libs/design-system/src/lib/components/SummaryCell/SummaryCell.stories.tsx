import type { Meta, StoryObj } from '@storybook/nextjs';
import { SummaryCell } from './SummaryCell';

// Meta configuration for the SummaryCell component in Storybook
const meta: Meta<typeof SummaryCell> = {
  title: 'Components/SummaryCell', // Defines the title in Storybook's UI
  component: SummaryCell, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof SummaryCell>;

export const BasicCell: Story = {
  args: {
    label: { title: 'ارزش خالص دارایی', icon: 'database' },
    value: '3.8 میلیارد تومن',
  },
};

export const SubTitleCell: Story = {
  args: {
    label: { title: 'ارزش خالص دارایی', icon: 'database' },
    value: '3.8 میلیارد تومن',
    subTitle: 'از ابتدای فعالیت',
  },
};
