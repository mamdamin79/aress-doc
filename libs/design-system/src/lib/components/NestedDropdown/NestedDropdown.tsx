'use client';
import React, { useEffect, useState } from 'react';
import { NestedDropdownItem } from './NestedDropdownItem';
import {
  NestedDropdownProps,
  NestedDropdownItemProps,
} from './NestedDropdown.types';
import { cn } from 'libs/design-system/src/utils';

export const NestedDropdown: React.FC<NestedDropdownProps> = ({
  title,
  items,
  onChildClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [childHasErr, setChildHasErr] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    setChildHasErr(items.some((field) => field.status === 'error'));
  }, [items]);
  return (
    <div className="relative flex h-fit w-[292px] flex-col gap-4">
      {/* Main Dropdown Field */}
      <div className="cursor-pointer">
        <NestedDropdownItem
          icon={{ name: 'list-tree', size: 'sm' }}
          status={isOpen ? 'opened' : childHasErr ? 'error' : 'normal'}
          title={title}
          activeIcon={{ name: 'list-minus', size: 'sm' }}
          onClick={toggleDropdown}
          optionsListProps={{
            items: {
              items: [],
            },
            title: '',
          }}
          hasChildren
        />
      </div>
      <div
        className={cn(
          'flex w-full flex-col gap-3 pr-6 transition-all',
          isOpen
            ? 'visible mb-3 -translate-y-0 opacity-100'
            : 'invisible h-0 -translate-y-4 opacity-0',
        )}
      >
        <div className="absolute -top-3 right-2">
          {/* path connection */}
          {items.map((item, index) => (
            <div
              key={index}
              className={cn(
                'absolute right-0 top-0 rounded-br-md border-b-2 border-r-2',
                index === 0 && 'h-8 w-3',
                index === 1 && 'h-[84px] w-5',
                index === 2 && 'h-[136px] w-7',
                index === 3 && 'h-[188px] w-9',
                item.status === 'normal'
                  ? 'border-border-brand-primary-600'
                  : 'border-border-accent-red-600',
              )}
            />
          ))}
        </div>
        {/* Render dynamic children */}
        {items?.map((child: NestedDropdownItemProps, index) => (
          <div
            key={index}
            style={{
              paddingRight: `${index * 8}px`,
            }}
          >
            <NestedDropdownItem
              icon={child.icon}
              status={child.status}
              title={child.title}
              onClick={(list) => onChildClick?.(list)}
              selectedOption={child.selectedOption}
              placeHolder={child.placeHolder}
              optionsListProps={child.optionsListProps}
              disabled={child.disabled}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
