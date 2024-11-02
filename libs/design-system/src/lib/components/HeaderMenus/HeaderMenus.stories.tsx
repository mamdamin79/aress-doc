import type { Meta, StoryObj } from '@storybook/react';
import { menu } from './HeaderMenus.constants';
import { HeaderMenus } from './HeaderMenus';
const meta: Meta<typeof HeaderMenus> = {
  title: 'Components/HeaderMenus',
  component: HeaderMenus,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HeaderMenus>;

export const Default: Story = {
  render: (args) => {
    return (
      <div className="p-5">
        <HeaderMenus {...args} />
      </div>
    );
  },
  args: {
    menuItems: menu,
  },
};
