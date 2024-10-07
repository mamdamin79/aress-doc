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
        <div className="border group-data-[disabled]:cursor-default flex items-center justify-center cursor-pointer group-data-[checked]:bg-brand-600 group-data-[disabled]:border-gray-400 group-data-[checked]:border-brand-600 rounded-sm w-fit border-gray-600 min-w-6 min-h-6">
          <div className="hidden text-white group-data-[checked]:block">
            <Icon name="check" />
          </div>
        </div>
      </Checkbox>
      <p
        className={cn(
          { 'text-gray-400 cursor-default': props.disabled },
          { 'text-gray-1000': props.checked && !props.disabled },
          { 'text-gray-600': !props.disabled && !props.checked },
          'text-sm font-vazirmatn'
        )}
      >
        {props.content}
      </p>
    </div>
  );
}
