'use client';
import { Field, Label } from '@headlessui/react';
import { cn } from '../../../utils';
import React, { ReactNode, useId } from 'react';

interface RadioProps {
  onChange: () => void;
  reactcontent?: string | ReactNode;
  content?: string;
  className?: string;
  checked?: boolean;
  disabled?: boolean;
  value?: string;
  name?: string;
  id?: string;
}

export function Radio({
  onChange,
  reactcontent,
  content,
  className,
  checked,
  disabled,
  value,
  name,
  id,
}: RadioProps) {
  const unikId = useId();

  return (
    <Field className="flex w-full items-center gap-2">
      <div
        className="group cursor-pointer"
        onClick={!disabled ? onChange : undefined}
      >
        <input
          type="radio"
          id={id ?? unikId}
          name={name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={onChange}
          className="sr-only"
        />
        <div
          className={cn(
            'border-button-brand-surface-default flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors duration-200',
            {
              'border-border-neutral-highcontrast': !checked && !disabled,
              'border-border-neutral-contrast': disabled && !checked,
              'border-button-brand-surface-disable': disabled && checked,
              'cursor-pointer': !disabled,
              'cursor-default': disabled,
            },
          )}
        >
          {checked && (
            <div
              className={cn(
                'bg-button-brand-surface-default h-2.5 w-2.5 rounded-full',
                {
                  'bg-button-brand-surface-disable': disabled,
                },
              )}
            ></div>
          )}
        </div>
      </div>
      <Label
        htmlFor={id ?? unikId}
        className={cn(
          'w-full',
          'text-sm',
          {
            'text-text-neutral-disable cursor-default': disabled,
            'text-text-neutral-secondary cursor-pointer': !disabled && !checked,
            'text-text-neutral-primary cursor-pointer': checked && !disabled,
            'text-text-neutral-disable': disabled,
          },
          className,
        )}
        onClick={!disabled ? onChange : undefined}
      >
        {reactcontent ? reactcontent : content}
      </Label>
    </Field>
  );
}
