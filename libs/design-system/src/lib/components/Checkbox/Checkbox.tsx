'use client';
import {
  Checkbox as CheckboxHeadlessUIProps,
  Field,
  Label,
} from '@headlessui/react';
import { cn } from '../../../utils';
import React, { ReactNode, useId } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
  reactcontent?: string | ReactNode;
  className?: string;
}

export function Checkbox(props: CheckboxProps) {
  const unikId = useId();

  return (
    <Field className="flex w-full items-center gap-2">
      <CheckboxHeadlessUIProps
        aria-roledescription="checkbox"
        {...props}
        className="group focus:stroke-none focus:outline-none active:stroke-none active:outline-none"
        id={props.id ?? unikId}
      >
        <div className="group-data-[checked]:bg-icon-brand-primary-600 group-data-[checked]:border-icon-brand-primary-600 border-icon-neutral-secondary group-data-[disabled]:border-text-neutral-disable flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border-2 group-data-[disabled]:cursor-default">
          <div className="text-icon-onbrand-neutral-on600 hidden group-data-[checked]:block">
            <Check strokeWidth={4} width={10} height={10} />
          </div>
        </div>
      </CheckboxHeadlessUIProps>
      <Label
        htmlFor={props.id ?? unikId}
        className={cn(
          'w-full',
          { 'text-text-neutral-disable cursor-default': props.disabled },
          {
            'text-text-neutral-secondary cursor-pointer':
              !props.disabled && !props.checked,
          },
          {
            'text-text-neutral-primary cursor-pointer':
              props.checked && !props.disabled,
          },
          'text-sm',
          props.className,
        )}
      >
        {props.reactcontent ? props.reactcontent : props.content}
      </Label>
    </Field>
  );
}
