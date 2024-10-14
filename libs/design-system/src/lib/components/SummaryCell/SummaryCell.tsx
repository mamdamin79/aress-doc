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
    <div className="rounded-3xl overflow-hidden cursor-pointer hover:shadow-3xl w-60 relative duration-500 font-vazirmatn group bg-gray-100 p-6">
      <div className="bg-gray-50 rounded-full scale-0 duration-500 h-80 w-80 group-hover:scale-[2] absolute top-5 left-28"></div>

      <div className="flex items-center relative z-20 gap-2">
        <div className="group-hover:text-brand-600 duration-300">
          <Icon size="lg" name={label.icon} />
        </div>
        <span className="text-sm font-medium group-hover:font-semibold">
          {label.title}
        </span>
      </div>
      <div className="mt-5 relative z-20 flex flex-col items-center">
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
