'use client'
import { useState } from 'react';
import { Icon } from '../Icon';
import { RemovableLabel } from '../RemovableLabel';
import { Checkbox } from '../Checkbox';
import { cn } from 'libs/design-system/src/utils';
import { TextField } from '../TextField';

interface FilterOption {
  title: string;
  options: string[];
  singleSelect: boolean;
}

interface Prop {
  filterOptions: FilterOption[];
  searchValue: string;
  onSearchChange: (value: string) => void;
  selectedFilters: Record<string, string[]>;
  onFilterChange: any;
}

export function FilterPopUpSection({
  filterOptions,
  searchValue,
  onFilterChange,
  selectedFilters,
  onSearchChange,
}: Prop) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);

  const toggleFilterOption = (
    category: string,
    option: string,
    singleSelect: boolean,
  ) => {
    onFilterChange((prev: Record<string, string[]>) => {
      const currentOptions = prev[category] || [];

      if (singleSelect) {
        if (currentOptions.includes(option)) {
          const { [category]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [category]: [option] };
      } else {
        const updatedOptions = currentOptions.includes(option)
          ? currentOptions.filter((item) => item !== option)
          : [...currentOptions, option];

        if (updatedOptions.length === 0) {
          const { [category]: _, ...rest } = prev;
          return rest;
        }
        return { ...prev, [category]: updatedOptions };
      }
    });
  };

  return (
    <div
      className={cn('relative overflow-hidden', { 'h-[400px]': activeFilter })}
    >
      <div className="flex items-center justify-between px-6 py-4 text-xl font-medium">
        <span>فیلتر صندوق‌ها</span>
        {(Object.entries(selectedFilters).length > 0 || searchValue) && (
          <span
            onClick={() => {
              onFilterChange({});
              onSearchChange('');
            }}
            className="cursor-pointer text-red-600"
          >
            بازنشانی فیلتر‌ها
          </span>
        )}
      </div>
      <hr className="h-0.5 bg-gray-100" />
      <div className="mt-4 px-4">
        <TextField
          mode="outline"
          placeholder=""
          trailingIcons={[{ name: 'x' }]}
          mergeTitleAndPlaceholder={false}
          label="نام صندوق"
          value={searchValue}
          onChange={(e) => onSearchChange(e.target.value)}
        />
      </div>
      <div className="mt flex flex-col gap-6 px-4">
        {filterOptions.map((item, index) => (
          <div key={index}>
            <div
              onClick={() => setActiveFilter(item.title)}
              className="rounded-lg border p-3"
            >
              <div className="flex cursor-pointer items-center justify-between">
                <span>{item.title}</span>
                <Icon name="chevron-left" size="lg" />
              </div>
              {selectedFilters[item.title] && (
                <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                  <hr className="h-0.5 bg-gray-100" />
                  <div className="flex flex-wrap gap-2 pt-2">
                    {selectedFilters[item.title]?.map((option, index) => (
                      <div key={index}>
                        <RemovableLabel
                          item={''}
                          label={option}
                          onClose={() =>
                            toggleFilterOption(
                              item.title,
                              option,
                              item.singleSelect,
                            )
                          }
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full translate-x-[100%] bg-white transition-all duration-500',
          { 'translate-x-0': activeFilter },
        )}
      >
        <div
          className="flex cursor-pointer items-center gap-1 px-6 py-6"
          onClick={() => setActiveFilter(null)}
        >
          <Icon name="chevron-right" size="lg" />
          <span>{activeFilter}</span>
        </div>
        <hr className="h-0.5 bg-gray-100" />
        <div className="flex flex-col">
          {activeFilter &&
            filterOptions
              .find((item) => item.title === activeFilter)
              ?.options.map((item, index) => (
                <div className="flex items-center gap-2 p-3" key={index}>
                  <Checkbox
                    checked={
                      selectedFilters[activeFilter]?.includes(item) || false
                    }
                    onChange={() =>
                      toggleFilterOption(
                        activeFilter,
                        item,
                        filterOptions.find(
                          (filter) => filter.title === activeFilter,
                        )?.singleSelect || false,
                      )
                    }
                  />
                  <span>{item}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
