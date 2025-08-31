import type { Meta, StoryObj } from '@storybook/nextjs';
import { Radio } from './Radio';
import { useArgs } from 'storybook/preview-api';
import React from 'react';

// Meta configuration for the Radio component in Storybook
const meta: Meta<typeof Radio> = {
  title: 'Components/Radio', // Defines the title in Storybook's UI
  component: Radio, // Links to the actual component
  tags: ['autodocs'], // Optional: Add any additional tags for better categorization
};

export default meta;

type Story = StoryObj<typeof Radio>;

// A default story for the Radio component

export const Example: Story = {
  args: {
    disabled: false,
    content: 'هفته گذشته',
    checked: false,
  },
  render: function RadioExample(args) {
    const [{ checked }, updateArgs] = useArgs();

    // change boolean state for show dialog
    function onChange() {
      updateArgs({ checked: !checked });
    }

    return <Radio {...args} onChange={onChange} checked={checked} />;
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    content: '30 روز گذشته',
    checked: false,
  },
  render: function DisabledRadio(args) {
    const [{ checked }, updateArgs] = useArgs();

    function onChange() {
      updateArgs({ checked: !checked });
    }

    return <Radio {...args} onChange={onChange} checked={checked} />;
  },
};

export const RadioGroup: Story = {
  render: function RadioGroupExample() {
    const [selectedValue, setSelectedValue] = React.useState('all');

    return (
      <div className="flex flex-col gap-3">
        <Radio
          content="همه"
          checked={selectedValue === 'all'}
          onChange={() => setSelectedValue('all')}
        />
        <Radio
          content="هفته گذشته"
          checked={selectedValue === 'last-week'}
          onChange={() => setSelectedValue('last-week')}
        />
        <Radio
          content="30 روز گذشته"
          checked={selectedValue === 'last-30-days'}
          onChange={() => setSelectedValue('last-30-days')}
        />
        <Radio
          content="60 روز گذشته"
          checked={selectedValue === 'last-60-days'}
          onChange={() => setSelectedValue('last-60-days')}
        />
      </div>
    );
  },
};
