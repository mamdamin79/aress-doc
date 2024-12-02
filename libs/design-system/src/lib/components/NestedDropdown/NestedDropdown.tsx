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
  const [childHasErr, setChildHasErr] = useState(false)
  const toggleDropdown = () => setIsOpen((prev) => !prev);
  useEffect(()=>{
    setChildHasErr(subFields.some((field) => field.status === 'error'));
  }, [subFields])
  return (
    <div className="flex w-[292px] h-fit gap-4 flex-col relative">
      {/* Main Dropdown Field */}
      <div className='cursor-pointer'>
      <Field
        icon={{ name: 'list-tree', size: 'sm' }}
        status={isOpen ? 'opened' : childHasErr ? 'error' : 'normal'}
        title={title}
        activeIcon={{ name: 'list-minus', size: 'sm' }}
        onClick={toggleDropdown}
        hasChildren={true}
      />
</div>
        <div className={cn('flex flex-col pr-6 gap-3 w-full transition-all', isOpen ? 'opacity-100 visible -translate-y-0' : 'opacity-0 invisible -translate-y-4')}>
         <div className='absolute -top-3 right-2'>
          {/* path connection */}
        {subFields[3] && (
            <div
              className={cn(
                'absolute top-0 right-0 border-b-2 border-r-2 rounded-br-md w-9 h-[188px]',
                subFields[3].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600'
              )}
            ></div>
          )}
          {subFields[2] && (
            <div
              className={cn(
                'absolute top-0 right-0 border-b-2 border-r-2 rounded-br-md w-7 h-[136px]',
                subFields[2].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600'
              )}
            ></div>
          )}
          {subFields[1] && (
            <div
              className={cn(
                'absolute top-0 right-0 border-b-2 border-r-2 rounded-br-md w-5 h-[84px]',
                subFields[1].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600'
              )}
            ></div>
          )}
          {subFields[0] && (
            <div
              className={cn(
                'absolute top-0 right-0 border-b-2 border-r-2 rounded-br-md w-3 h-8',
                subFields[0].status === 'normal'
                  ? 'border-brand-600'
                  : 'border-red-600'
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
