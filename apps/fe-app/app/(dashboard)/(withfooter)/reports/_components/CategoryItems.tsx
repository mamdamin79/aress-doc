'use client';

import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
import { useRouter, useSearchParams } from 'next/navigation';
import { cn } from 'design-system';

type Props = {
  categories: GetReportsCategoriesResponse;
  reports: GetReportsResponse;
};

export const CategoryItems: React.FC<Props> = ({ categories, reports }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCategory = (title: string) => {
    const params = new URLSearchParams(searchParams);
    if (title === 'همه‌ی گزارش‌‌‌‌‌‌ها') {
      params.delete('category');
      router.replace(`/reports?${params.toString()}`);
      return;
    }
    params.set('category', title);
    params.set('page', '1');
    router.replace(`/reports?${params.toString()}`);
  };

  return (
    <ul>
      <li
        onClick={() => handleCategory('همه‌ی گزارش‌‌‌‌‌‌ها')}
        className={cn(
          'text-text-neutral-secondary group mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium',
          { 'text-text-neutral-primary': !searchParams.get('category') },
        )}
      >
        <div
          className={cn(
            'bg-border-neutral-contrast h-4 w-[2px] rounded-md transition-all duration-300 group-hover:h-5 group-hover:w-1',
            {
              'bg-surface-brand-600-primary text-text-neutral-secondary h-5 w-1':
                !searchParams.get('category'),
            },
          )}
        ></div>
        <span
          className={cn({
            'border-border-brand-primary-600 border-b-[1.5px]':
              !searchParams.get('category'),
          })}
        >
          همه‌ی گزارش‌‌‌‌‌‌ها ({reports.length})
        </span>
      </li>
      {categories.map((category, index) => (
        <li
          onClick={() => handleCategory(category.title)}
          key={category.identifier + index}
          className={cn(
            'text-text-neutral-secondary hover:text-text-neutral-secondarycontrast group mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium',
            {
              'text-text-neutral-primary':
                category.title === searchParams.get('category'),
            },
          )}
        >
          <div
            className={cn(
              'bg-border-neutral-contrast group-hover:bg-border-neutral-highcontrast h-4 w-[2px] rounded-md transition-all duration-300 group-hover:h-5 group-hover:w-1',
              {
                'bg-border-brand-primary-600 h-5 w-1':
                  category.title === searchParams.get('category'),
              },
            )}
          ></div>
          <span
            className={cn({
              'border-border-brand-primary-600 group-hover:text-text-neutral-secondarycontrast border-b-[1.5px] transition-colors':
                category.title === searchParams.get('category'),
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
