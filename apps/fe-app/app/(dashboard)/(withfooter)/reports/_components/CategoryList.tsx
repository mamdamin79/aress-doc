'use client';
import {
  GetDashboardReportsCategoriesResponse,
  GetDashboardReportsResponse,
} from '@openapi';
import { cn } from 'design-system';
import { useRouter, useSearchParams } from 'next/navigation';

type Props = {
  categories: GetDashboardReportsCategoriesResponse;
  reports: GetDashboardReportsResponse;
};

export const CategoryList: React.FC<Props> = ({ categories, reports }) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleCategory = (title: string) => {
    const params = new URLSearchParams(searchParams);
    if (title === 'همه ی گزارش ها') {
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
        onClick={() => handleCategory('همه ی گزارش ها')}
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
            'border-brand-600 border-b': !searchParams.get('category'),
          })}
        >
          همه ی گزارش ها ({reports.length})
        </span>
      </li>
      {categories.map((category) => (
        <>
          <li
            onClick={() => handleCategory(category.title)}
            key={category.identifier}
            className={cn(
              'mb-4 flex cursor-pointer items-center gap-2 rounded-md text-sm font-medium text-gray-700',
              {
                'text-gray-900':
                  category.title === searchParams.get('category'),
              },
            )}
          >
            <div
              className={cn('h-4 w-[2px] rounded-md bg-gray-300', {
                'bg-brand-600 h-5 w-1':
                  category.title === searchParams.get('category'),
              })}
            ></div>
            <span
              className={cn({
                'border-brand-600 border-b':
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
