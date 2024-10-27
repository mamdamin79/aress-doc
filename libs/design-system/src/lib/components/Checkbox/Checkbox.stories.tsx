import type { Meta, StoryObj } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the Checkbox component in Storybook
const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox', // Defines the title in Storybook's UI
  component: Checkbox, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Checkbox>;

// A default story for the Checkbox component

export const Example: Story = {
  args: {
    disabled: true,
    content: 'تنظیم این ۱۰ صندوق به‌عنوان پیش‌فرض برای تمام مقایسه‌های سایت.',
    checked: false,
  },
  render: function Success(args) {
    const [{ checked }, updateArgs] = useArgs();

    // change boolean state for show dialog
    function onChange() {
      updateArgs({ checked: !checked });
    }

    return <Checkbox {...args} onChange={onChange} value={checked} />;
  },
};
