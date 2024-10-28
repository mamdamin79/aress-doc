import { Meta, StoryObj } from '@storybook/react';
import { CircleXIcon } from './CircleXIcon';

const meta: Meta<typeof CircleXIcon> = {
  component: CircleXIcon,
  tags: ['autodocs'],
  title: 'Components/CircleXIcon',
};

export default meta;

type Story = StoryObj<typeof CircleXIcon>;

// A default story for the CircleXIcon component
export const Default: Story = {
  render: () => <CircleXIcon />, // Rendering the CircleXIcon component
};
