import { Checkbox } from '@headlessui/react';
import { Icon } from '../Icon';
import { cn } from '../../../utils';

interface CheckboxProps extends React.InputHTMLAttributes<HTMLInputElement> {
  onChange: () => void;
}

export function CheckBoxComponent(props: CheckboxProps) {
  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={props.checked}
        onChange={props.onChange}
        disabled={props.disabled}
        className="group"
      >
        <div
          className={cn(
            `border group-data-[disabled]:cursor-default cursor-pointer group-data-[checked]:bg-brand-600 group-data-[disabled]:border-gray-400 group-data-[checked]:border-brand-600 rounded-sm w-fit border-gray-600 min-w-5 min-h-5`,
            'group-data-[disable]:bg-red-90'
          )}
        >
          <div className="hidden text-white group-data-[checked]:block">
            <Icon name="check" />
          </div>
        </div>
      </Checkbox>
      <p
        className={cn(
          { 'text-gray-400': props.disabled },
          { 'text-gray-1000': props.checked },
          { 'text-gray-600': !props.disabled && !props.checked },
          'text-sm'
        )}
      >
        {props.content}
      </p>
    </div>
  );
}
