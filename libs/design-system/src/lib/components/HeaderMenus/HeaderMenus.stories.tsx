import type { Meta, StoryObj } from '@storybook/react';

import { HeaderMenus } from './HeaderMenus';

const meta: Meta<typeof HeaderMenus> = {
  title: 'Components/HeaderMenus',
  component: HeaderMenus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderMenus>;

export const Default: Story = {};
