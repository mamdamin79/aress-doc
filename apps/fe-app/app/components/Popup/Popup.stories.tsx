import { Meta, StoryObj } from '@storybook/react';
import { Popup } from './Popup';
import { useState } from 'react';
import { Button } from 'design-system';
const meta: Meta<typeof Popup> = {
  component: Popup,
};

export default meta;

type Story = StoryObj<typeof Popup>;

export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div>
        <Button
          align="center"
          isLoading={false}
          mode="primary"
          size="md"
          onClick={() => setIsOpen(true)}
        >
          open
        </Button>
        <Popup isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
  args: {},
};
