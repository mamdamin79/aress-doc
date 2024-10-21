import { Meta, StoryObj } from '@storybook/react';
import { Icon } from './Icon';
import { CUSTOM_ICONS } from './CustomIcon/CustomIcon.constants';
import dynamicIconImports from 'lucide-react/dynamicIconImports';

const iconNames = [
  ...Object.keys(dynamicIconImports),
  ...Object.keys(CUSTOM_ICONS),
];

const meta: Meta<typeof Icon> = {
  component: Icon,
  tags: ['autodocs'],
  argTypes: {
    name: {
      control: { type: 'select' },
      options: iconNames,
    },
    size: {
      control: { type: 'radio' },
      options: ['sm', 'md', 'lg', 'xl'],
    },
  },
};

export default meta;

type Story = StoryObj<typeof Icon>;

export const icon: Story = {
  args: {
    name: 'CustomScalesOfJustice',
    size: 'lg',
  },
};
