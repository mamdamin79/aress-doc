'use client';
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from '@headlessui/react';
import React, { useState } from 'react';
import { OptionsDropdownOption } from './OptionsDropdownOption';
import {
  DropDownStyle,
  DropdownCell,
  TriggerProps,
} from './OptionsDropdown.types';
import { OptionsDropdownTrigger } from './OptionsDropdownTrigger';
import { cn } from '../../../utils/classNames.utils';

export interface OptionsDropdownProps {
  dropDownStyles?: DropDownStyle;
  dropDownList: DropdownCell[];
  customTriggerRender?: (props: TriggerProps) => React.ReactElement;
  customOptionRender?: (props: DropdownCell) => React.ReactElement;
  onChange?: (selectedText: string) => void;
  initialSelectedIndex?: number;
}

export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropDownList,
  dropDownStyles = {
    anchor: 'bottom start',
    bg: 'primary',
    checkSelected: false,
    emphasize: 'medium',
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
      onChange(item.text);
    }
  };

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
      <ListboxOptions
        anchor={dropDownStyles.anchor}
        className={cn(
          'bg-baseBackground shadow-7xl mt-1 gap-1 rounded-lg border border-gray-300 p-1 outline-none',
          !dropDownStyles.fixedWidth && 'w-fit',
        )}
        style={
          dropDownStyles.fixedWidth
            ? { width: `${dropDownStyles.fixedWidth}px` }
            : undefined
        }
      >
        {dropDownList.map((item, index) => (
          <ListboxOption value={item} key={`listBox option-${index}`}>
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
    </Listbox>
  );
};
