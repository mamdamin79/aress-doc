'use client';
import { Switch } from '@headlessui/react';
import { cn } from '../../../utils/classNames.utils';
import React from 'react';

export interface SwitchComponentProps {
  isDisabled?: boolean;
  checked: boolean;
  onChange: (value: boolean) => void;
}

export const SwitchComponent: React.FC<SwitchComponentProps> = ({
  isDisabled = false,
  checked,
  onChange,
}) => {
  // checked=true: thumb left, bg brand
  // checked=false: thumb right, bg default
  return (
    <Switch
      disabled={isDisabled}
      checked={checked}
      onChange={onChange}
      className={cn(
        'group relative flex h-[18px] w-[32px] cursor-pointer rounded-full p-1 ease-in-out focus:outline-none',
        checked && 'bg-surface-brand-600-primary', // left (true)
        !checked && 'bg-button-neutral-surface-default', // right (false)
        isDisabled && !checked && 'bg-button-neutral-surface-disable',
        isDisabled && checked && 'bg-button-brand-surface-disable',
      )}
    >
      <span
        aria-hidden="true"
        className={cn(
          'bg-button-neutral-label-onsurface pointer-events-none absolute left-[2px] top-[2px] inline-block h-[14px] w-[14px] rounded-full shadow-lg ring-0 transition duration-200 ease-in-out',
          checked ? 'translate-x-0' : 'translate-x-3.5', // left (true), right (false)
        )}
      />
    </Switch>
  );
};
