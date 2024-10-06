import type { Meta, StoryObj } from '@storybook/react';
import { CheckBoxComponent } from './CheckBox';
import { useArgs } from '@storybook/preview-api';

// Meta configuration for the CheckBoxComponent component in Storybook
const meta: Meta<typeof CheckBoxComponent> = {
  title: 'Components/CheckBoxComponent', // Defines the title in Storybook's UI
  component: CheckBoxComponent, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof CheckBoxComponent>;

// A default story for the CheckBoxComponent component

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

    return <CheckBoxComponent {...args} onChange={onChange} value={checked} />;
  },
};
