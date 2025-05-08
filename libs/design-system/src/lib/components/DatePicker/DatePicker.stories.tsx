import type { Meta, StoryObj } from '@storybook/react';
import { DatePicker } from './DatePicker';
import { useArgs } from '@storybook/preview-api';
import { DateType } from './DatePicker.types';

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
    min: '1300-05-25',
    max: '1400-05-25',
  },
  argTypes: {
    min: {
      control: { type: 'text' },
    }
  },
  render: function Success(args) {
    const [{ isOpen }, updateArgs] = useArgs();
    const [{ dateRange }, updateArgsDateRange] = useArgs();

    function onCloseDatePicer() {
      updateArgs({ isOpen: false });
    }

    
    
    function setDateRange(start: DateType, end: DateType) {
      updateArgsDateRange({ dateRange: { start, end } });
    }

    return (
      <DatePicker
        dateRange={dateRange}
        setDateRange={(start, end) => setDateRange(start, end)}
        max="1400-12-25"
        min="1300-01-25"
        isOpen={isOpen}
        onClose={onCloseDatePicer}
      />
    );
  },
};
Default.args = {
  isOpen: true,
};
