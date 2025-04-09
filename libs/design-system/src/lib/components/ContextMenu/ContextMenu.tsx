import React, { ReactNode } from 'react';
import { ContextMenuItem } from './ContextMenu.types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

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
      <MenuButton>
        {/* if user provide a children we use it else we use the first item */}
        {children ? (
          <div className="rounded-full bg-gray-100 p-2 shadow-md">
            {children}
          </div>
        ) : (
          <div className="text-gray-1000 inline-flex w-40 items-center gap-2 rounded-sm bg-white p-2 text-sm font-medium shadow-md">
            <Icon name={items[0].icon} size="md" />
            {items[0].title}
          </div>
        )}
      </MenuButton>
      <MenuItems
        transition
        anchor={anchor}
        className="shadow-7xl w-[180px] rounded-xl border border-gray-300 bg-white text-sm transition duration-200 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
      >
        {items.map((item) => (
          <>
            {item.dividerBefore && (
              <div className="w-full border border-gray-200"></div>
            )}
            <MenuItem>
              <button
                disabled={item.disabled}
                onClick={item.onClick}
                className={cn(
                  'hover:bg-brand-100 text-gray-1000 group flex w-full items-center gap-2 p-2 pr-3 text-sm font-medium',
                  item.isActive && 'bg-brand-50 text-brand-800',
                  item.disabled && 'pointer-events-none text-gray-400',
                )}
              >
                <Icon name={item.icon} size="md" />
                {item.title}
              </button>
            </MenuItem>
          </>
        ))}
      </MenuItems>
    </Menu>
  );
};
