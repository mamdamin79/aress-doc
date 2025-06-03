'use client';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { Button, Checkbox, Icon } from 'design-system';
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
    const params = new URLSearchParams(searchParams.toString());
    if (newFilter.onlyFavorite) params.set('onlyFavorite', 'true');
    else params.delete('onlyFavorite');

    if (newFilter.onlyNew) params.set('onlyNew', 'true');
    else params.delete('onlyNew');

    if (newFilter.onlyHavingVideo) params.set('onlyHavingVideo', 'true');
    else params.delete('onlyHavingVideo');

    params.set('page', '1');

    router.push(`?${params.toString()}`, { scroll: false });
  };

  // handle filter change
  const handleFilterChange = (key: keyof typeof filter) => {
    const newFilter = { ...filter, [key]: !filter[key] };
    setFilter(newFilter);
    updateURL(newFilter);
  };

  return (
    <Popover className="text-text-neutral-primary">
      <PopoverButton className="outline-none">
        <Button
          align="center"
          isLoading={false}
          mode="secondary"
          size="md"
          className="h-12 w-12 rounded-xl"
        >
          <Icon name="filter" size="lg" />
        </Button>
      </PopoverButton>
      <PopoverPanel
        transition
        anchor="bottom start"
        className="shadow-8xl border-border-neutral-primary bg-surface-neutral-primary z-20 mt-2 w-[204px] rounded-xl border py-2 transition duration-300 ease-in-out [--anchor-gap:var(--spacing-10)] data-[closed]:-translate-y-1 data-[closed]:opacity-0"
      >
        <h4 className="text-md text-text-neutral-primary mb-1 py-1 pr-4 font-medium">
          فیلتر ها
        </h4>
        <h5 className="text-text-neutral-primary pr-4 pt-2 text-sm font-medium">
          ویژگی‌های‌گزارش
        </h5>
        <div className="pr-4">
          <div className="py-2">
            <Checkbox
              checked={filter.onlyNew}
              onChange={() => handleFilterChange('onlyNew')}
              content="جدید"
              className="text-text-neutral-primary"
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
