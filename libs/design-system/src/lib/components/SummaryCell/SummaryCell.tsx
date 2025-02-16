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
    <div className="hover:shadow-3xl group relative w-60 cursor-pointer overflow-hidden rounded-3xl bg-gray-100 p-6 duration-500">
      <div className="absolute left-28 top-5 h-80 w-80 scale-0 rounded-full bg-gray-50 duration-500 group-hover:scale-[3]"></div>

      <div className="relative z-20 flex items-center gap-2">
        <div className="group-hover:text-brand-600 duration-300">
          <Icon size="lg" name={label.icon} />
        </div>
        <span className="text-sm font-medium group-hover:font-semibold">
          {label.title}
        </span>
      </div>
      <div className="relative z-20 mt-5 flex flex-col items-center">
        <span className="text-lg font-semibold group-hover:font-bold">
          {value}
        </span>
        <span className="text-sm text-gray-700 group-hover:font-medium">
          {subTitle}
        </span>
      </div>
    </div>
  );
}
