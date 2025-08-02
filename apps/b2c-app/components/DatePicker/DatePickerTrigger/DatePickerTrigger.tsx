import { DatePickerState } from '../DatePickerState';
import { DateText } from '../DatePickerText';

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
      <div onClick={onClick}>
        <DatePickerState
          active={date ? true : false}
          size="larg"
          theme="default"
        />
      </div>
    </div>
  );
}
