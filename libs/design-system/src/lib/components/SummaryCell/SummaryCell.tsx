import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.types';

export interface SummaryCellProps {
  label: {
    icon: IconName;
    title: string;
  };
  value: string;
}

export function SummaryCell({ label, value }: SummaryCellProps) {
  return (
    <div className="hover:bg-surface-neutral-tertiary border-border-neutral-secondary bg-surface-neutral-primary group flex h-[132px] w-52 cursor-pointer items-center justify-center overflow-hidden rounded-3xl border p-5">
      <div className="w-full">
        <div className="relative z-20 flex items-center gap-2">
          <div className="group-hover:text-text-brand-highcontrast-800 text-text-neutral-primary">
            <Icon size="lg" name={label.icon} />
          </div>
          <span className="text-text-neutral-primary text-sm font-medium">
            {label.title}
          </span>
        </div>
        <div className="bg-border-neutral-tertiary my-2 h-[1px] w-full" />
        <div className="text-text-brand-highcontrast-800 text-center text-lg font-semibold">
          {value}
        </div>
      </div>
    </div>
  );
}
