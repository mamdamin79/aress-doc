import Link from 'next/link';
import { cn } from '../../../utils';
import { Icon } from '../IconComponent';
import { BreadcrumbItem } from './Breadcrumb.types';

interface Props {
  items: BreadcrumbItem[];
}

export function Breadcrumb({ items }: Props) {
  return (
    <nav aria-label="Breadcrumbs" dir="rtl">
      <ul className="flex items-center gap-1">
        {items.map((item: BreadcrumbItem, index: number) => (
          <li
            className={cn(
              'cursor-pointer font-semibold flex items-center',
              index + 1 === items.length
                ? 'text-gray-1000'
                : 'text-gray-600 hover:text-gray-700'
            )}
            key={index}
          >
            <div className="flex items-center">
              {item.icon && <Icon name={item?.icon} size="sm" />}
              {item.link ? (
                <Link className="text-xs pb-0.5 mx-0.5" href={item.link}>
                  {item.title}
                </Link>
              ) : (
                <span className="text-xs pb-0.5 mx-0.5">{item.title}</span>
              )}
              {index + 1 !== items.length && (
                <Icon name="chevron-left" size="sm" />
              )}
            </div>
          </li>
        ))}
      </ul>
    </nav>
  );
}
