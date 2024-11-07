import type { Meta, StoryObj } from '@storybook/react';
import { DateInput } from './DateInput';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the DateInput component in Storybook
const meta: Meta<typeof DateInput> = {
    title: 'Components/DateInput', // Defines the title in Storybook's UI
    component: DateInput, // Links to the actual component
    tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof DateInput>;

export const Miladi: Story = {
    args: {
        mode: 'miladi',
        min: '',
        max: '',
    },
    render: function Success(args) {
        const [{ value }, updateArgs] = useArgs();
        // change boolean state for show dialog
        function onChange(e: Date | string) {
            updateArgs({ value: e });
        }
        return <DateInput {...args} value={value} onChange={(e: string | Date) => onChange(e)} />;
    },
};
