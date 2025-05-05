'use client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React, { useEffect, useState } from 'react';
import { OptionsDropdownOption } from './OptionsDropdownOption';
import {
  DropDownStyle,
  DropdownCell,
  TriggerProps,
} from './OptionsDropdown.types';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
import { cn } from '../../../utils/classNames.utils';

export interface OptionsDropdownProps {
  shadow?: boolean;
  className?: string;
  dropDownStyles?: DropDownStyle;
  dropDownList: DropdownCell[];
  customTriggerRender?: (props: TriggerProps) => React.ReactElement;
  customOptionRender?: (props: DropdownCell) => React.ReactElement;
  onChange?: (selectedText: string, id?: number) => void;
  initialSelectedIndex?: number;
}

export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropDownList,
  className,
  shadow,
  dropDownStyles = {
    anchor: 'bottom start',
    bg: 'primary',
    checkSelected: false,
    emphasize: 'medium',
    shadow,
    size: 'md',
  },
  customTriggerRender,
  customOptionRender,
  onChange,
  initialSelectedIndex = 0,
}) => {
  const [selectedItem, setSelectedItem] = useState<DropdownCell>(
    dropDownList[initialSelectedIndex],
  );

  // Handle selection change
  const handleSelectionChange = (item: DropdownCell) => {
    setSelectedItem(item);
    if (onChange) {
      if (item.id) {
        onChange(item.text, item.id);
      } else {
        onChange(item.text);
      }
    }
  };
  useEffect(() => {
    setSelectedItem(dropDownList[initialSelectedIndex]);
  }, [dropDownList, initialSelectedIndex]);
  return (
    <Listbox value={selectedItem} onChange={handleSelectionChange}>
      <ListboxButton
        className={cn('outline-none', !dropDownStyles.fixedWidth && 'w-fit')}
        style={
          dropDownStyles.fixedWidth
            ? { width: `${dropDownStyles.fixedWidth}px` }
            : undefined
        }
      >
        {({ open }) =>
          customTriggerRender ? (
            customTriggerRender({
              isActive: open,
              selectedItem,
              dropDownStyles,
            })
          ) : (
            <OptionsDropdownTrigger
              {...dropDownStyles}
              {...selectedItem}
              isActive={open}
            />
          )
        }
      </ListboxButton>
      <div className='max-h-[280px] mt-1 overflow-y-scroll hidescrollbar'>
        <ListboxOptions
          anchor={dropDownStyles.anchor}
          className={cn(
            className,
            'mt-1 gap-1 rounded-lg z-50 border border-gray-300  outline-none bg-white',
            dropDownStyles.shadow && 'shadow-7xl',
            !dropDownStyles.fixedWidth && 'w-fit',
          )}
          style={
            dropDownStyles.fixedWidth
              ? { width: `${dropDownStyles.fixedWidth}px` }
              : undefined
          }
        >
          {dropDownList.map((item, index) => (
            <ListboxOption className="!z-50" value={item} key={`listBox option-${index}`}>
              {({ selected }) =>
                customOptionRender ? (
                  (customOptionRender({
                    text: item.text,
                    icon: item.icon,
                    isActive: selected,
                    tag: item.tag,
                    withCheck: dropDownStyles.checkSelected ? selected : false,
                  }) as React.ReactElement)
                ) : (
                  <OptionsDropdownOption
                    {...item}
                    withCheck={dropDownStyles.checkSelected ? selected : false}
                    isActive={selected}
                  />
                )
              }
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>

    </Listbox>
  );
};
