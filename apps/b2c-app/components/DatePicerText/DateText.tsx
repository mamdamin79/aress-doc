import { cn } from 'design-system';
interface Porps {
  title: string;
  date?: {
    day: number;
    month: number;
    year: number;
  };
}

export function DateText({ title, date }: Porps) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-text-neutral-primary text-sm">{title}</span>
      <div
        className={cn('text-text-neutral-disable flex items-center gap-1', {
          'text-text-neutral-primary': date,
        })}
      >
        <div>{date?.day ? date.day.toString().padStart(2, '0') : '--'}</div>
        <span className="mt-1">/</span>
        <div>{date?.month ? date.month.toString().padStart(2, '0') : '--'}</div>
        <span className="mt-1">/</span>
        <div>{date?.year ? date.year.toString().padStart(4, '0') : '----'}</div>
      </div>
    </div>
  );
}
