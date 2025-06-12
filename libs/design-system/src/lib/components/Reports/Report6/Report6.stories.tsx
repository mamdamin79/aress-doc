import { Meta, StoryObj } from '@storybook/react';
import { Report6 } from './Report6';

const meta: Meta<typeof Report6> = {
  component: Report6,
};

export default meta;

type Story = StoryObj<typeof Report6>;

export const Default: Story = {
  args: {
    indexData: [
      { y: -2.5, unit: 'میلیون واحد' },
      { y: 2.5, unit: 'میلیون واحد' },
      { y: -2.5, unit: 'میلیون واحد' },
      { y: -2, unit: 'میلیون واحد' },
      { y: -1.5, unit: 'میلیون واحد' },
      { y: -4, unit: 'میلیون واحد' },
      { y: 2, unit: 'میلیون واحد' },
      { y: 5.5, unit: 'میلیون واحد' },
      { y: 3.5, unit: 'میلیون واحد' },
      { y: -4.5, unit: 'میلیون واحد' },
      { y: 0.5, unit: 'میلیون واحد' },
      { y: 3.5, unit: 'میلیون واحد' },
    ],
    inFlowData: [
      { y: 115, unit: 'میلیارد ریال' },
      { y: 105, unit: 'میلیارد ریال' },
      null,
      null,
      { y: 85, unit: 'میلیارد ریال' },
      null,
      { y: 115, unit: 'میلیارد ریال' },
      { y: 95, unit: 'میلیارد ریال' },
      null,
      null,
      { y: 85, unit: 'میلیارد ریال' },
      { y: 105, unit: 'میلیارد ریال' },
    ],
    outFlowData: [
      null,
      null,
      { y: -55, unit: 'میلیارد ریال' },
      { y: -45, unit: 'میلیارد ریال' },
      null,
      { y: -90, unit: 'میلیارد ریال' },
      null,
      null,
      { y: -10, unit: 'میلیارد ریال' },
      { y: -75, unit: 'میلیارد ریال' },
      null,
      null,
    ],
  },
};
