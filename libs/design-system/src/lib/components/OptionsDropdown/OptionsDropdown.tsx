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
  shadow,
  dropDownStyles = {
    scrollable: false,
    anchor: 'bottom start',
    bg: 'primary',
    checkSelected: false,
    emphasize: 'medium',
    shadow: true,
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
  }, [dropDownList, initialSelectedIndex]);
  return (
<div></div>
  );
};
