import React from 'react';
import { ContextMenuItem } from './ContextMenu.types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '../Icon';

type Props = {
  items: ContextMenuItem[];
};

export const ContextMenu: React.FC<Props> = ({ items }) => {
  return (
    <Menu>
      <MenuButton className="inline-flex items-center gap-2 rounded-sm w-40 p-2 text-sm hover:bg-brand-100 bg-white font-medium text-gray-1000 shadow-md">
        <Icon name={items[0].icon} size="md" />
        {items[0].title}
      </MenuButton>
      <MenuItems
        transition
        anchor="bottom start"
        className="w-48 mt-2 shadow-7xl border-[1.5px]  rounded-xl border-gray-300 bg-white p-1 text-sm  transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {items.map((item) => (
          <MenuItem>
            <button
              onClick={item.onClick}
              className="group text-sm text-gray-1000 font-medium flex w-full items-center gap-2 p-2 data-[focus]:bg-white/10"
            >
              <Icon name={item.icon} size="md" />
              {item.title}
            </button>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
};
