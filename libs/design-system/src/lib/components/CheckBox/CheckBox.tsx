import { Checkbox, Field, Label } from '@headlessui/react';
import { cn } from '../../../utils';
import { useId } from 'react';
import { Check } from 'lucide-react';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
}

export function CheckBoxComponent(props: CheckboxProps) {
  const unikId = useId();

  return (
    <Field className="flex items-center gap-2">
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        className="group"
        id={props.id ?? unikId}
      >
        <div className="group-data-[disabled]:cursor-default flex items-center border-2 justify-center cursor-pointer group-data-[checked]:bg-brand-600 group-data-[disabled]:border-gray-400 group-data-[checked]:border-brand-600 rounded-[3px] h-5 border-gray-600 w-5">
          <div className="hidden text-white group-data-[checked]:block">
            <Check strokeWidth={4} width={10} height={10} />
          </div>
        </div>
      </Checkbox>
      <Label
        htmlFor={props.id ?? unikId}
        className={cn(
          { 'text-gray-400 cursor-default': props.disabled },
          { 'text-gray-1000 cursor-pointer': props.checked && !props.disabled },
          { 'text-gray-600 cursor-pointer': !props.disabled && !props.checked },
          'text-sm'
        )}
      >
        {props.content}
      </Label>
    </Field>
  );
}
