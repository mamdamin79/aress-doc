import React, { useEffect, useState } from 'react';
import { Field } from './Field/Field';
import {
  NestedDropDownProps,
  NestedDropdownItem,
} from './NestedDropdown.types';
import { cn } from 'libs/design-system/src/utils';

export const NestedDropdown: React.FC<NestedDropDownProps> = ({
  title,
  subFields,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [childHasErr, setChildHasErr] = useState(false);
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect(() => {
    setChildHasErr(subFields.some((field) => field.status === 'error'));
  }, [subFields]);
  return (
    <div className="relative flex h-fit w-full max-w-[292px] flex-col gap-4">
      {/* Main Dropdown Field */}
      <div className="cursor-pointer">
        <Field
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
            ? 'visible mb-4 -translate-y-0 opacity-100'
            : 'invisible h-0 -translate-y-1 opacity-0',
        )}
      >
        <div className="absolute -top-3 right-2">
          {/* path connection */}
          {subFields[3] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[188px] w-9 rounded-br-md border-b-2 border-r-2',
                subFields[3].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {subFields[2] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[136px] w-7 rounded-br-md border-b-2 border-r-2',
                subFields[2].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {subFields[1] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-[84px] w-5 rounded-br-md border-b-2 border-r-2',
                subFields[1].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
          {subFields[0] && (
            <div
              className={cn(
                'absolute right-0 top-0 h-8 w-3 rounded-br-md border-b-2 border-r-2',
                subFields[0].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600',
              )}
            ></div>
          )}
        </div>
        {/* Render dynamic children */}
        {subFields?.map((child: NestedDropdownItem, index) => (
          <div key={index} className={`pr-${index * 2}`}>
            <Field
              icon={child.icon}
              status={child.status}
              title={child.title}
              onClick={child.onClick}
              selectedOption={child.selectedOption}
              placeHolder={child.placeHolder}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
