'use client';
import React, { ReactNode, useEffect, useRef } from 'react';
import { ContextMenuItem } from './ContextMenu.types';
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Icon } from '../Icon';
import { cn } from '../../../utils/classNames.utils';

type MenuItemsProps = React.ComponentProps<typeof MenuItems>;

export type Props = {
  children?: ReactNode;
  items: ContextMenuItem[];
  anchor?: MenuItemsProps['anchor'];
  onOpenChange?: (open: boolean) => void;
};

export const ContextMenu: React.FC<Props> = ({
  items,
  anchor = 'bottom start',
  children,
  onOpenChange,
}) => {
  const lastOpen = useRef<boolean | null>(null);

  return (
    <Menu>
      {({ open }) => {
        // Track open state change and call onOpenChange when it changes
        if (onOpenChange && lastOpen.current !== open) {
          lastOpen.current = open;
          onOpenChange(open);
        }

        return (
          <div>
            <MenuButton className="text-icon-neutral-primary outline-none">
              {children ? (
                <div
                  className={cn(
                    'bg-surface-neutral-secondary flex h-8 w-8 items-center justify-center rounded-full shadow-md',
                    open && 'border-border-brand-primary-600 border',
                  )}
                >
                  {children}
                </div>
              ) : (
                <div className="text-icon-neutral-primary bg-surface-neutral-primary inline-flex w-40 items-center gap-2 rounded-sm p-2 text-sm font-medium shadow-md">
                  <Icon name={items[0].icon} size="md" />
                  {items[0].title}
                </div>
              )}
            </MenuButton>

            <MenuItems
              modal={false}
              transition
              anchor={anchor}
              className="shadow-7xl border-border-neutral-primary bg-surface-neutral-primary w-[180px] rounded-xl border text-sm transition duration-200 ease-out [--anchor-gap:8px] focus:outline-none data-[closed]:scale-95 data-[closed]:opacity-0"
            >
              {items.map((item, index) => (
                <React.Fragment key={index}>
                  {item.dividerBefore && (
                    <hr className="border-border-neutral-secondary w-full border" />
                  )}
                  <MenuItem>
                    <button
                      disabled={item.disabled}
                      onClick={item.onClick}
                      className={cn(
                        'hover:bg-surface-brand-100 text-text-neutral-primary group flex w-full items-center gap-2 p-2 pr-3 text-sm font-medium',
                        item.isActive &&
                          'bg-surface-brand-50 text-text-onbrand-colored-primary-on200_100_50',
                        item.disabled &&
                          'text-text-neutral-disable pointer-events-none',
                      )}
                    >
                      <Icon name={item.icon} size="md" />
                      {item.title}
                    </button>
                  </MenuItem>
                </React.Fragment>
              ))}
            </MenuItems>
          </div>
        );
      }}
    </Menu>
  );
};
