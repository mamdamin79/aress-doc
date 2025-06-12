'use client';
import { GetReportsCategoriesResponse, GetReportsResponse } from '@openapi';
import { cn } from 'design-system';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  categories: GetReportsCategoriesResponse;
  reports: GetReportsResponse;
};

export const CategoryList: React.FC<Props> = ({ categories, reports }) => {
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
          'mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium text-gray-700',
          { 'text-gray-900': !searchParams.get('category') },
        )}
      >
        <div
          className={cn('h-4 w-[2px] rounded-md bg-gray-300', {
            'bg-brand-600 h-5 w-1 text-gray-900': !searchParams.get('category'),
          })}
        ></div>
        <span
          className={cn({
            'border-brand-600 border-b-[1.5px]': !searchParams.get('category'),
          })}
        >
          همه‌ی گزارش‌‌‌‌‌‌ها ({reports.length})
        </span>
      </li>
      {categories.map((category, index) => (
        <>
          <li
            onClick={() => handleCategory(category.title)}
            key={category.identifier + index}
            className={cn(
              'group mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium text-gray-600 hover:text-gray-700',
              {
                'text-gray-1000':
                  category.title === searchParams.get('category'),
              },
            )}
          >
            <div
              className={cn(
                'h-4 w-[2px] rounded-md bg-gray-400 transition-all duration-300 group-hover:h-5 group-hover:w-1 group-hover:bg-gray-500',
                {
                  'bg-brand-600 h-5 w-1':
                    category.title === searchParams.get('category'),
                },
              )}
            ></div>
            <span
              className={cn({
                'border-brand-600 border-b-[1.5px] transition-colors group-hover:text-gray-700':
                  category.title === searchParams.get('category'),
              })}
            >
              {category.title}
            </span>
            (
            {
              reports.filter(
                (report) => report.category.title === category.title,
              ).length
            }
            )
          </li>
        </>
      ))}
    </ul>
  );
};
