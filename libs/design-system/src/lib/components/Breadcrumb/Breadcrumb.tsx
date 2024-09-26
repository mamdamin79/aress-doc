import { cn } from '../../../utils';
import { Icon } from '../IconComponent';
import { BreadcrumbItem } from './Breadcrumb.types';

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <div dir="rtl" className="flex items-center gap-1">
      {items.map((item: BreadcrumbItem, index: number) => (
        <div
          className={cn(
            'cursor-pointer font-semibold flex items-center',
            `${
              index + 1 === items.length
                ? 'text-gray-1000'
                : 'text-gray-600 hover:text-gray-700'
            }`
          )}
          key={index}
        >
          <div className="flex items-center">
            <Icon name="house" size="sm" />
            <span className="text-xs pb-1 mr-0.5 ml-0.5">{item.title}</span>
            {index + 1 !== items.length && (
              <Icon name="chevron-left" size="sm" />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
