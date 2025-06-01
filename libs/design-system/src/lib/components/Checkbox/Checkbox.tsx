'use client';
import {
  Checkbox as CheckboxHeadlessUIProps,
  Field,
  Label,
} from '@headlessui/react';
import { cn } from '../../../utils';
import { useId } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
}

export function Checkbox(props: CheckboxProps) {
  const unikId = useId();

  return (
    <Field className="flex items-center gap-2">
      <CheckboxHeadlessUIProps
        aria-roledescription="checkbox"
        {...props}
        className="group"
        id={props.id ?? unikId}
      >
        <div className="group-data-[checked]:bg-icon-brand-primary-600 group-data-[checked]:border-icon-brand-primary-600 flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border-2 border-icon-neutral-secondary group-data-[disabled]:cursor-default group-data-[disabled]:border-text-neutral-disable">
          <div className="hidden text-icon-onbrand-neutral-on600 group-data-[checked]:block">
            <Check strokeWidth={4} width={10} height={10} />
          </div>
        </div>
      </CheckboxHeadlessUIProps>
      <Label
        htmlFor={props.id ?? unikId}
        className={cn(
          { 'cursor-default text-text-neutral-disable': props.disabled },
          { 'cursor-pointer text-text-neutral-secondary': !props.disabled && !props.checked },
          { 'text-text-neutral-primary cursor-pointer': props.checked && !props.disabled },
          'text-sm',
        )}
      >
        {props.content}
      </Label>
    </Field>
  );
}
