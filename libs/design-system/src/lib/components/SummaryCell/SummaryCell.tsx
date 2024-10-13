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
    <div className="rounded-3xl cursor-pointer hover:shadow-3xl hover:bg-gray-50 w-60 duration-300 font-vazirmatn group bg-gray-100 p-6">
      <div className="flex items-center gap-2">
        <div className="group-hover:text-brand-600 duration-300">
          <Icon size="lg" name={label.icon} />
        </div>
        <span className="text-sm font-medium group-hover:font-semibold">
          {label.title}
        </span>
      </div>
      <div className="mt-5 flex flex-col items-center">
        <span className="font-semibold text-lg group-hover:font-bold">
          {value}
        </span>
        <span className="text-sm group-hover:font-medium text-gray-700">
          {subTitle}
        </span>
      </div>
    </div>
  );
}
