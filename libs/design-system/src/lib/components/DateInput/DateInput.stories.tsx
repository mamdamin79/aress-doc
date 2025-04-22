import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the DateInput component in Storybook
const meta: Meta<typeof DateInput> = {
  title: 'Components/DateInput', // Defines the title in Storybook's UI
  component: DateInput, // Links to the actual component
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const ControlledDateInput: Story = {
  args: {
    min: '1400-12-10',
    max: '1500-12-10',
    clearDate: () => console.log('clearDate'),
    focus: true,
    active: true,
    defaultValue: '1400-12-10',
  },
  render: function Success(args) {
    const [{ value }, updateArgs] = useArgs();
    const [{ error }, updateError] = useArgs();
    // change boolean state for show dialog
    function onChange(e: Date | string) {
      updateArgs({ value: e });
    }
    function setError(e: { minError: boolean; maxError: boolean }) {
      updateError({ error: e });
    }
    return (
      <DateInput
        {...args}
        errors={error}
        errorHandler={setError}
        onChange={onChange}
      />
    );
  },
};
