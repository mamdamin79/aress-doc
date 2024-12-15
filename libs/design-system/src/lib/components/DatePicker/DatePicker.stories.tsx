import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the DatePicker component in Storybook
const meta: Meta<typeof DatePicker> = {
  title: 'Components/DatePicker', // Defines the title in Storybook's UI
  component: DatePicker, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DatePicker>;

// A default story for the DatePicker component
export const Default: Story = {
  args: {
    min: '1400-04-25',
    max: '1409-05-25',
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();
    const [{ dateRange }, updateArgsDateRange] = useArgs();

    function onCloseDatePicer() {
      updateArgs({ isOpen: false });
    }

    function setDateRange(start: string, end: string) {
      updateArgsDateRange({ dateRange: { start, end } });
    }

    return (
      <DatePicker
        dateRange={dateRange}
        setDateRange={(start, end) => setDateRange(start, end)}
        max="1500-05-12"
        min="1400-05-12"
        isOpen={isOpen}
        onClose={onCloseDatePicer}
      />
    );
  },
};
Default.args = {
  isOpen: true,
};
