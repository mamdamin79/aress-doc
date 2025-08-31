import { cn } from 'design-system';
import { DatePickerState } from '../DatePickerState';
import { DatePickerText } from '../DatePickerText';
import { dateType } from './DatePicker.types';

interface DatePickerTriggerProps {
  title: string[];
  startDate?: dateType;
  endDate?: dateType;
  mode: 'single' | 'range';
  onClick?: () => void;
  className?: string;
}

export function DatePickerTrigger({
  title,
  endDate,
  startDate,
  onClick,
  mode,
  className,
}: DatePickerTriggerProps) {
  return (
    <div className={cn('flex items-end gap-16', className)}>
      {mode === 'range' ? (
        <div className="flex gap-8">
          <DatePickerText title={title[0]} date={startDate} />
          <DatePickerText title={title[1]} date={endDate} />
        </div>
      ) : (
        <DatePickerText title={title[0]} date={startDate} />
      )}
      <div onClick={onClick}>
        <DatePickerState active={!!startDate} size="large" theme="default" />
      </div>
    </div>
  );
}
