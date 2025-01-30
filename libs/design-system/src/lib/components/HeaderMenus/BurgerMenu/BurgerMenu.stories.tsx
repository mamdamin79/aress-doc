import { Meta, StoryObj } from '@storybook/react';
import { BurgerMenu } from './BurgerMenu';
import { menu } from '../HeaderMenus.constants';
const meta: Meta<typeof BurgerMenu> = {
  component: BurgerMenu,
};

export default meta;

type Story = StoryObj<typeof BurgerMenu>;

export const Default: Story = {
  args: {
    menuItems: menu,
  },
};
