import Link from 'next/link';
import { cn } from '../../../utils';
import { Icon } from '../Icon';
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
              'flex cursor-pointer items-center font-semibold',
              index + 1 === items.length
                ? 'text-text-neutral-primary'
                : 'text-text-neutral-secondary hover:text-text-neutral-secondarycontrast',
            )}
            key={index}
          >
            <div className="flex items-center">
              {item.icon && <Icon name={item?.icon} size="sm" />}
              {item.link ? (
                <Link className="mx-0.5 pb-0.5 text-xs" href={item.link}>
                  {item.title}
                </Link>
              ) : (
                <span className="mx-0.5 pb-0.5 text-xs">{item.title}</span>
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
