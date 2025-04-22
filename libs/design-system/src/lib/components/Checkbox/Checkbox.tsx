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
        <div className="group-data-[checked]:bg-brand-600 group-data-[checked]:border-brand-600 flex h-5 w-5 cursor-pointer items-center justify-center rounded-[3px] border-2 border-gray-600 group-data-[disabled]:cursor-default group-data-[disabled]:border-gray-400">
          <div className="hidden text-white group-data-[checked]:block">
            <Check strokeWidth={4} width={10} height={10} />
          </div>
        </div>
      </CheckboxHeadlessUIProps>
      <Label
        htmlFor={props.id ?? unikId}
        className={cn(
          { 'cursor-default text-gray-400': props.disabled },
          { 'text-gray-1000 cursor-pointer': props.checked && !props.disabled },
          { 'cursor-pointer text-gray-600': !props.disabled && !props.checked },
          'text-sm',
        )}
      >
        {props.content}
      </Label>
    </Field>
  );
}
