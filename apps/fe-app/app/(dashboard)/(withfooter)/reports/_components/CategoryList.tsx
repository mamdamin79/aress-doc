'use client';

import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
import { cn } from 'design-system';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';

type Props = {
  categories: GetReportsCategoriesResponse;
  reports: GetReportsResponse;
  inModal?: boolean;
};

export const CategoryList: React.FC<Props> = ({
  categories,
  reports,
  inModal,
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname(); // <-- get current path

  const handleCategory = (title: string) => {
    const params = new URLSearchParams(searchParams);
    if (title === 'همه‌ی گزارش‌‌‌‌‌‌ها') {
      params.delete('category');
      router.replace(`${pathname}?${params.toString()}`); // <-- use current path
      return;
    }
    params.set('category', title);
    params.set('page', '1');
    router.replace(`${pathname}?${params.toString()}`); // <-- use current path
  };
  return (
    <ul className={cn({ 'flex flex-wrap gap-x-4 gap-y-1': inModal })}>
      <li
        onClick={() => handleCategory('همه‌ی گزارش‌‌‌‌‌‌ها')}
        className={cn(
          'text-text-neutral-secondary hover:text-text-neutral-secondarycontrast group mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium',
          { 'text-text-neutral-disable': !searchParams.get('category') },
        )}
      >
        <div
          className={cn(
            'bg-border-neutral-contrast h-4 w-0.5 rounded-md transition-all duration-300 group-hover:h-5 group-hover:w-1',
            {
              'bg-border-brand-primary-600 text-text-neutral-primary h-5 w-1':
                !searchParams.get('category'),
            },
          )}
        />
        <span
          className={cn({
            'border-border-brand-primary-600 text-text-neutral-primary border-b':
              !searchParams.get('category'),
          })}
        >
          همه‌ی گزارش‌‌‌‌‌‌ها ({reports.length})
        </span>
      </li>
      {categories.map((category) => (
        <li
          onClick={() => handleCategory(category.title)}
          key={category.identifier}
          className={cn(
            'text-text-neutral-secondary group mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium',
            {
              'text-text-neutral-primary':
                category.title === searchParams.get('category'),
              'hover:text-text-neutral-secondarycontrast':
                category.title !== searchParams.get('category'),
            },
          )}
        >
          <div
            className={cn(
              'bg-text-neutral-secondary h-4 w-0.5 rounded-md transition-all duration-300',
              {
                'bg-border-brand-primary-600 h-5 w-1':
                  category.title === searchParams.get('category'),
                'group-hover:bg-text-neutral-secondarycontrast group-hover:h-5 group-hover:w-1':
                  category.title !== searchParams.get('category'),
              },
            )}
          />
          <span
            className={cn({
              'border-border-brand-primary-600 border-b transition-colors':
                category.title === searchParams.get('category'),
              'group-hover:border-b-0':
                category.title !== searchParams.get('category'),
            })}
          >
            {category.title}
          </span>
          (
          {
            reports.filter((report) => report.category.title === category.title)
              .length
          }
          )
        </li>
      ))}
    </ul>
  );
};
