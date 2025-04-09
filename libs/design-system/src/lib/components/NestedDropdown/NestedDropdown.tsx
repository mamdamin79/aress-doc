import React, { useEffect, useState } from 'react';
import { NestedDropdownItem } from './NestedDropdownItem';
import {
  NestedDropDownProps,
  NestedDropdownItemProps,
} from './NestedDropdown.types';
import { cn } from 'libs/design-system/src/utils';

export const NestedDropdown: React.FC<NestedDropDownProps> = ({
  title,
  items,
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
          hasChildren={true}
        />
      </div>
      <div
        className={cn(
          'flex w-full flex-col gap-3 pr-6 transition-all',
          isOpen
            ? 'visible -translate-y-0 opacity-100'
            : 'invisible -translate-y-4 opacity-0',
        )}
      >
        <div className="absolute -top-3 right-2">
          {/* path connection */}
          {items[3] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[188px] w-9 rounded-br-md border-b-2 border-r-2',
                items[3].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {items[2] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[136px] w-7 rounded-br-md border-b-2 border-r-2',
                items[2].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {items[1] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[84px] w-5 rounded-br-md border-b-2 border-r-2',
                items[1].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {items[0] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-8 w-3 rounded-br-md border-b-2 border-r-2',
                items[0].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
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
              onClick={()=> child.onClick}
              selectedOption={child.selectedOption}
              placeHolder={child.placeHolder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
