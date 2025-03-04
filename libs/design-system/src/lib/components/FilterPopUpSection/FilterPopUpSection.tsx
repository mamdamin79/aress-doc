import { useState } from 'react';
import { Icon } from '../Icon';
import { RemovableLabel } from '../RemovableLabel';
import { Checkbox } from '../Checkbox';
import { cn } from 'libs/design-system/src/utils';

interface Prop {
  filterOptions: [];
}

type SelectedColumnsType = {
  [key: string]: boolean;
};

export function FilterPopUpSection({ filterOptions }: Prop) {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const toggleFilterOption = (category: string, option: string) => {
    setSelectedFilters((prev) => {
      const currentOptions = prev[category] || [];
      const updatedOptions = currentOptions.includes(option)
        ? currentOptions.filter((item) => item !== option) // حذف گزینه در صورت انتخاب بودن
        : [...currentOptions, option]; // اضافه کردن گزینه

      if (updatedOptions.length === 0) {
        const { [category]: _, ...rest } = prev;
        return rest;
      }

      return { ...prev, [category]: updatedOptions };
    });
  };

  return (
    <div
      className={cn('relative overflow-hidden', {
        'h-[400px]': activeFilter,
      })}
    >
      <div className="flex items-center justify-between px-6 py-4 text-xl font-medium">
        <span>فیلتر صندوق ها</span>
        {Object.entries(selectedFilters).length > 0 && (
          <span
            onClick={() => setSelectedFilters({})}
            className="cursor-pointer text-red-600"
          >
            بازنشانی فیلتر ها
          </span>
        )}
      </div>
      <hr className="h-0.5 bg-gray-100" />
      <div className="mt-4 flex flex-col gap-6 px-4">
        {filterOptions.map(
          (item: { title: string; options: string[] }, index: number) => (
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
                      {selectedFilters[item.title]?.map(
                        (option: string, index: number) => (
                          <div key={index}>
                            <RemovableLabel
                              label={option}
                              onClose={() =>
                                toggleFilterOption(item.title, option)
                              }
                            />
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ),
        )}
      </div>
      <div
        className={cn(
          'absolute right-0 top-0 h-full w-full translate-x-[100%] bg-white transition-all duration-500',
          {
            'translate-x-0': activeFilter,
          },
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
              .find(
                (item: { title: string; option: string[] }) =>
                  item.title === activeFilter,
              )
              ?.options.map((item: string, index: number) => (
                <div className="flex items-center gap-2 p-3" key={index}>
                  <Checkbox
                    checked={
                      selectedFilters[activeFilter]?.includes(item) || false
                    }
                    onChange={() => toggleFilterOption(activeFilter, item)}
                  />
                  <span>{item}</span>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}
