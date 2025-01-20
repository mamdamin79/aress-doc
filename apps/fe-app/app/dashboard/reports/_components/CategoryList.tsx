'use client';
import { cn } from 'design-system';
import { useRouter, useSearchParams } from 'next/navigation';

export const CategoryList: React.FC = ({ categories }: any) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const handleCategory = (title) => {
    const params = new URLSearchParams();
    if (title === 'همه ی گزارش ها') {
      params.delete('category');
      router.replace(`/dashboard/reports?${params.toString()}`);
      return;
    }
    params.set('category', title);
    params.set('page', '1');
    router.replace(`/dashboard/reports?${params.toString()}`);
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
        همه ی گزارش ها (100)
      </li>
      {categories.map((category) => (
        <>
          <li
            onClick={() => handleCategory(category.title)}
            key={category.id}
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
            {category.title} ({category.quantity})
          </li>
        </>
      ))}
    </ul>
  );
};
