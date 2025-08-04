import type { Meta, StoryObj } from '@storybook/nextjs';
import { TradePopup } from './TradePopup';
import { useState } from 'react';
import { Button } from 'design-system';

const meta: Meta<typeof TradePopup> = {
  title: 'Components/TradePopup',
  component: TradePopup,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isOpen: {
      control: 'boolean',
    },
    fundName: {
      control: 'text',
    },
    estismatedBuyPrice: {
      control: 'number',
    },
    estismatedUnit: {
      control: 'number',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

// Interactive story with state management
const TradePopupWithState = (args: React.ComponentProps<typeof TradePopup>) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Open Trade Popup</Button>
      <TradePopup {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export const Default: Story = {
  render: TradePopupWithState,
  args: {
    fundName: 'مشترک افق روشن کارگزاری بانک خاورمیانه',
    estismatedBuyPrice: 15000000,
    estismatedUnit: 1000,
  },
};

export const WithCustomValues: Story = {
  render: TradePopupWithState,
  args: {
    fundName: 'صندوق سرمایه‌گذاری نمونه',
    estismatedBuyPrice: 20000000,
    estismatedUnit: 2000,
  },
};

export const AlwaysOpen: Story = {
  args: {
    isOpen: true,
    onClose: () => {},
    fundName: 'مشترک افق روشن کارگزاری بانک خاورمیانه',
    estismatedBuyPrice: 15000000,
    estismatedUnit: 1000,
  },
};
