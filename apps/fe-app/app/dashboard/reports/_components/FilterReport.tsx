'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Checkbox, Icon } from 'design-system';
import { useSearchParams, useRouter } from 'next/navigation';
import { useState } from 'react';

export const FilterReport = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  //initial filter state based on search params
  const getInitialFilter = () => ({
    onlyFavorite: searchParams.get('onlyFavorite') === 'true',
    onlyNew: searchParams.get('onlyNew') === 'true',
    onlyHavingVideo: searchParams.get('onlyHavingVideo') === 'true',
  });

  // state to manage filter
  const [filter, setFilter] = useState(getInitialFilter);

  // update url based on filter state
  const updateURL = (newFilter: typeof filter) => {
    const params = new URLSearchParams();
    if (newFilter.onlyFavorite) params.set('onlyFavorite', 'true');
    if (newFilter.onlyNew) params.set('onlyNew', 'true');
    if (newFilter.onlyHavingVideo) params.set('onlyHavingVideo', 'true');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // handle filter change
  const handleFilterChange = (key: keyof typeof filter) => {
    const newFilter = { ...filter, [key]: !filter[key] };
    setFilter(newFilter);
    updateURL(newFilter);
  };

  return (
    <Popover>
      <PopoverButton className="bg-brand-600 flex h-14 w-14 items-center justify-center rounded-xl text-white outline-none">
        <Icon name="filter" size="lg" />
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom start"
        className="z-20 mt-1 w-[204px] rounded-xl border border-gray-200 bg-white py-2 transition duration-300 ease-in-out [--anchor-gap:var(--spacing-10)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <h4 className="text-md mb-1 py-1 pr-4 font-medium">فیلتر ها</h4>
        <h5 className="pr-4 pt-2 text-sm font-medium">ویژگی های گزارش</h5>
        <div className="pr-4">
          <div className="py-2">
            <Checkbox
              checked={filter.onlyNew}
              onChange={() => handleFilterChange('onlyNew')}
              content="جدید"
            />
          </div>
          <div className="py-2">
            <Checkbox
              checked={filter.onlyFavorite}
              onChange={() => handleFilterChange('onlyFavorite')}
              content="مورد علاقه"
            />
          </div>
          <div className="py-2">
            <Checkbox
              checked={filter.onlyHavingVideo}
              onChange={() => handleFilterChange('onlyHavingVideo')}
              content="با ویدیو بررسی"
            />
          </div>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
