'use client';
import { useState } from 'react';
import { Icon } from '../Icon';
import { RemovableLabel } from '../RemovableLabel';
import { Checkbox } from '../Checkbox';
import { cn } from 'libs/design-system/src/utils';
import { TextField } from '../TextField';
import { Button } from '../Button';

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
  onFilterChange: (filters: Record<string, string[]>) => void;
}

function areFiltersEqual(
  a: Record<string, string[]>,
  b: Record<string, string[]>,
): boolean {
  const aKeys = Object.keys(a);
  const bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) return false;

  for (const key of aKeys) {
    const aVals = a[key] || [];
    const bVals = b[key] || [];
    if (aVals.length !== bVals.length) return false;
    const sortedA = [...aVals].sort();
    const sortedB = [...bVals].sort();
    for (let i = 0; i < sortedA.length; i++) {
      if (sortedA[i] !== sortedB[i]) return false;
    }
  }
  return true;
}

export function FilterPopUpSection({
  filterOptions,
  searchValue,
  onFilterChange,
  selectedFilters,
  onSearchChange,
}: Prop) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [tempSelectedFilters, setTempSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const openFilter = (title: string) => {
    setActiveFilter(title);
    setTempSelectedFilters(selectedFilters);
  };

  const toggleFilterOption = (
    category: string,
    option: string,
    singleSelect: boolean,
  ) => {
    setTempSelectedFilters((prev) => {
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

  const handleConfirm = () => {
    onFilterChange(tempSelectedFilters);
    setActiveFilter(null);
  };

  const handleClearAll = () => {
    onFilterChange({});
    onSearchChange('');
  };

  const hasChanged = !areFiltersEqual(tempSelectedFilters, selectedFilters);

  return (
    <div
      className={cn(
        'bg-surface-neutral-primary relative h-[696px] overflow-hidden',
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-6 pb-4 pt-6 text-xl font-medium">
        <span className="text-text-neutral-primary">فیلتر صندوق‌ها</span>
        {(Object.keys(selectedFilters).length > 0 || searchValue) && (
          <span
            onClick={handleClearAll}
            className="text-button-error-label-plain-default cursor-pointer text-base font-medium"
          >
            بازنشانی به پیش‌فرض
          </span>
        )}
      </div>
      <div className="bg-border-neutral-primary h-[2px] w-full" />
      <div className="scrollbar-sm h-[580px] overflow-y-auto pt-4">
        {/* Search Input */}
        <div className="px-4">
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

        {/* Filter Categories */}
        <div className="mt-6 flex flex-col gap-6 px-4">
          {filterOptions.map((item, index) => (
            <div key={index}>
              <div
                onClick={() => openFilter(item.title)}
                className="rounded-lg border-border-neutral-primary border p-3">
                <div className="text-text-neutral-primary flex cursor-pointer items-center justify-between text-sm font-medium">
                  <span>{item.title}</span>
                  <Icon name="chevron-left" size="lg" />
                </div>

                {selectedFilters[item.title] && (
                  <div className="pt-2" onClick={(e) => e.stopPropagation()}>
                    <div className="bg-border-neutral-primary h-[2px] w-full" />
                    <div className="flex flex-wrap gap-2 pt-2">
                      {selectedFilters[item.title]?.map((option, i) => (
                        <RemovableLabel
                          key={i}
                          item=""
                          label={option}
                          onClose={() => {
                            const currentOptions =
                              selectedFilters[item.title] || [];
                            const updatedOptions = currentOptions.filter(
                              (o) => o !== option,
                            );
                            if (updatedOptions.length === 0) {
                              const { [item.title]: _, ...rest } =
                                selectedFilters;
                              onFilterChange(rest);
                            } else {
                              onFilterChange({
                                ...selectedFilters,
                                [item.title]: updatedOptions,
                              });
                            }
                          }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Filter Options List */}
      <div
        className={cn(
          'bg-surface-neutral-primary absolute right-0 top-0 z-0 h-[695px] w-full translate-x-full transition-all duration-500',
          { 'translate-x-0': activeFilter },
        )}
      >
        <div
          className="text-text-neutral-primary mx-6 mb-4 mt-6 flex w-fit cursor-pointer items-center gap-1"
          onClick={() => setActiveFilter(null)}
        >
          <Icon name="chevron-right" size="lg" />
          <span className="font-medium">{activeFilter}</span>
        </div>
        <div className="bg-border-neutral-primary h-[2px] w-full" />
        {/* Options */}
        <div className="flex flex-col">
          {activeFilter &&
            filterOptions
              .find((f) => f.title === activeFilter)
              ?.options.map((option, index) => (
                <div key={index} className="flex items-center gap-2 py-3 pr-6">
                  <Checkbox
                    content={option}
                    disabled={false}
                    checked={
                      tempSelectedFilters[activeFilter]?.includes(option) ||
                      false
                    }
                    onChange={() => {
                      const filter = filterOptions.find(
                        (f) => f.title === activeFilter,
                      );
                      toggleFilterOption(
                        activeFilter,
                        option,
                        filter?.singleSelect || false,
                      );
                    }}
                  />
                </div>
              ))}
        </div>

        {/* Confirm Buttons */}
        <div className="absolute bottom-1.5 left-2.5 flex items-center gap-2 p-4">
          <Button
            theme="brand"
            onClick={() => setActiveFilter(null)}
            size="sm"
            mode="secondary"
            align="center"
            isLoading={false}
          >
            بازگشت
          </Button>
          <Button
            theme="brand"
            className="whitespace-nowrap"
            onClick={handleConfirm}
            align="center"
            disabled={!hasChanged}
            isLoading={false}
            mode="primary"
            size="sm"
          >
            تایید و انتخاب
          </Button>
        </div>
      </div>
    </div>
  );
}
