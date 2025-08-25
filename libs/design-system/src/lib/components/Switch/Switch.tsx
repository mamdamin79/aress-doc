import { Switch } from '@headlessui/react';
import { cn } from '../../../utils/classNames.utils';
import React, { useState } from 'react';

export interface SwitchComponentProps {
  isDisabled: boolean;
  defaultValue: boolean;
}

export const SwitchComponent: React.FC<SwitchComponentProps> = ({
  isDisabled,
  defaultValue,
}) => {
  const [enabled, setEnabled] = useState(defaultValue);

  return (
    <Switch
      disabled={isDisabled}
      checked={!enabled}
      onChange={(value) => setEnabled(!value)}
      className={cn(
        'group relative flex h-[18px] w-[32px] cursor-pointer rounded-full p-1 ease-in-out focus:outline-none data-[focus]:outline data-[focus]:outline-black',
        !isDisabled &&
          'bg-surface-brand-600-primary data-[checked]:bg-button-neutral-surface-default',
        isDisabled && !enabled && 'bg-button-neutral-surface-disable',
        isDisabled && enabled && 'bg-button-brand-surface-disable',
      )}
    >
      <span
        aria-hidden="true"
        className="bg-button-neutral-label-onsurface pointer-events-none absolute left-[2px] top-[2px] inline-block size-[14px] rounded-full shadow-lg ring-0 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
      />
    </Switch>
  );
};
