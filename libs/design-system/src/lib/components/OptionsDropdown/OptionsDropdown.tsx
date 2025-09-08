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
  triggerClassName?: string;
  optionClassName?: string;
}

export const OptionsDropdown: React.FC<OptionsDropdownProps> = ({
  dropDownList,
  className,
  dropDownStyles = {
    scrollable: false,
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
  triggerClassName,
  optionClassName,
}) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
      e.stopPropagation();
    }
  };

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
  }, [initialSelectedIndex]);
  return (
    <Listbox value={selectedItem} onChange={handleSelectionChange}>
      <ListboxButton
        onKeyDown={handleKeyDown}
        className={cn(
          'text-text-neutral-primary outline-none',
          !dropDownStyles.fixedWidth && 'w-fit',
        )}
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
              className={triggerClassName}
            />
          )
        }
      </ListboxButton>
      <ListboxOptions
        modal={false}
        anchor={dropDownStyles.anchor}
        className={cn(
          'border-border-neutral-primary bg-surface-neutral-primary text-text-neutral-primary z-50 mt-1 gap-1 rounded-lg border outline-none',
          dropDownStyles.shadow && 'shadow-7xl',
          dropDownStyles.scrollable || 'hidescrollbar',
          !dropDownStyles.fixedWidth && 'w-fit',
          className,
        )}
        style={{
          width: dropDownStyles.fixedWidth
            ? `${dropDownStyles.fixedWidth}px`
            : undefined,

        }}
      >
        <div className={cn('my-2 max-h-[265px] overflow-y-scroll', {
          'scrollbar-sm': dropDownStyles.scrollable,
        })}>

        {dropDownList.map((item, index) => (
          <ListboxOption
            className="!z-50"
            value={item}
            key={`listBox option-${index}`}
          >
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
                  className={optionClassName}
                  {...item}
                  withCheck={dropDownStyles.checkSelected ? selected : false}
                  isActive={selected}
                />
              )
            }
          </ListboxOption>
        ))}
        </div>

      </ListboxOptions>
    </Listbox>
  );
};
