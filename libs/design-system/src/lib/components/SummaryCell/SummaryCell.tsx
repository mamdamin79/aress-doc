import { Icon } from '../Icon';
import { IconName } from '../Icon/Icon.types';

interface Props {
  label: {
    icon: IconName;
    title: string;
  };
  value: string;
  subTitle?: string;
}

export function SummaryCell({ label, value, subTitle }: Props) {
  return (
    <div className="hover:bg-surface-neutral-tertiary border-border-neutral-secondary bg-surface-neutral-primary group w-60 cursor-pointer overflow-hidden rounded-3xl border p-6">
      <div className="relative z-20 flex items-center gap-2">
        <div className="group-hover:text-text-brand-highcontrast-800 duration-300">
          <Icon size="lg" name={label.icon} />
        </div>
        <span className="text-sm font-medium group-hover:font-semibold">
          {label.title}
        </span>
      </div>
      <div className="bg-border-neutral-tertiary my-2 h-[1px] w-full" />
      <div className="relative z-20 mt-5 flex flex-col items-center">
        <span className="text-text-brand-highcontrast-800 text-lg font-semibold group-hover:font-bold">
          {value}
        </span>
        <span className="text-text-neutral-secondarycontrast text-sm group-hover:font-medium">
          {subTitle}
        </span>
      </div>
    </div>
  );
}
