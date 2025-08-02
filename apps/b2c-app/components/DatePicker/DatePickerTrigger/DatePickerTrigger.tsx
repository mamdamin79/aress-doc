import { cn, Icon } from 'design-system';
import { DateText } from '../index';

interface DatePickerTriggerProps {
  title: string[];
  date?: {
    day: number;
    month: number;
    year: number;
  };
  mode: 'single' | 'range';
  onClick?: () => void;
}

export function DatePickerTrigger({
  title,
  date,
  onClick,
  mode,
}: DatePickerTriggerProps) {
  return (
    <div className="flex gap-[72px]">
      {mode === 'range' ? (
        <div className="flex gap-8">
          <DateText title={title[0]} date={date} />
          <DateText title={title[1]} date={date} />
        </div>
      ) : (
        <DateText title={title[0]} date={date} />
      )}
      <div
        onClick={onClick}
        className={cn(
          'border-border-neutral-primary bg-surface-neutral-primary flex h-12 w-12 items-center justify-center rounded-full border p-3',
        )}
      >
        <Icon name="calendar-range" size="lg" />
      </div>
    </div>
  );
}
