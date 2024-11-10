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

export const Miladi: Story = {
    args: {
        mode: 'miladi',
        min: '1300-05-12',
        max: '1400-05-12',
        defaultValue: '',
    },
    render: function Success(args) {
        const [{ value }, updateArgs] = useArgs();
        const [{ error }, updateError] = useArgs();
        // change boolean state for show dialog
        function onChange(e: Date | string) {
            updateArgs({ value: e });
        }
        function setError(e: {
            minError: boolean,
            maxError: boolean,
            validError: boolean
        }) {
            updateError({error: e})
        }
        return <DateInput {...args} errors={error} errorHandler={setError} defaultValue={value} onChange={(e: string | Date) => onChange(e)} />;
    },
};

export const Jalali: Story = {
    args: {
        mode: 'jalali',
        min: '',
        max: '',
        defaultValue :'1400-12-05',
        // defaultValue: {
        //     day: 12,
        //     month: 5,
        //     year: 1395
        // },
    },
    render: function Success(args) {
        const [{ value }, updateArgs] = useArgs();
        const [{ error }, updateError] = useArgs();
        // change boolean state for show dialog
        function onChange(e: Date | string) {
            updateArgs({ value: e });
        }
        function setError(e: {
            minError: boolean,
            maxError: boolean,
            validError: boolean
        }) {
            updateError({error: e})
        }
        return <DateInput {...args} errors={error} errorHandler={setError} onChange={onChange} />;
    },
};
