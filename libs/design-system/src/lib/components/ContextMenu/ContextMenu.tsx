import React, { ReactNode } from 'react';
import { ContextMenuItem } from './ContextMenu.types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '../Icon';

// this pulls out types of menuItem
type MenuItemsProps = React.ComponentProps<typeof MenuItems>;

type Props = {
  children?: ReactNode;
  items: ContextMenuItem[];
  anchor?: MenuItemsProps['anchor']; // using of anchor type of menuItem
};

export const ContextMenu: React.FC<Props> = ({
  items,
  anchor = 'bottom start',
  children,
}) => {
  return (
    <Menu>
      <MenuButton className="">
        {children ? (
          <div className="bg-gray-100  p-2 rounded-full shadow-md">
            {children}
          </div>
        ) : (
          <div className="inline-flex items-center p-2 w-40 rounded-sm bg-white text-sm gap-2 font-medium text-gray-1000 shadow-md">
            <Icon name={items[0].icon} size="md" />
            {items[0].title}
          </div>
        )}
      </MenuButton>
      <MenuItems
        transition
        anchor={anchor}
        className="w-[180px] [--anchor-gap:8px] shadow-7xl border-[1.5px]  rounded-xl border-gray-300 bg-white  text-sm  transition duration-200 ease-out focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {items.map((item) => (
          <MenuItem>
            <button
              onClick={item.onClick}
              className="group  hover:bg-brand-100 text-sm text-gray-1000 font-medium flex w-full items-center gap-2 p-2 pr-3"
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
