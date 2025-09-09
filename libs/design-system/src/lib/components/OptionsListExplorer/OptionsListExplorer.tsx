'use client';
import { useEffect, useRef, useState } from 'react';
import { OptionItem, CategoryItem } from './OptionsListExplorer.types';
import { cn, formatNumber } from '../../../utils';
import { PercentageLabel } from '../PercentageLabel';
import { TextField } from '../TextField';
import { Tabs } from '../Tabs';
import { Icon } from '../Icon/Icon';
import { TextFieldInputSize } from '../TextField/TextField.types';
import { useVirtualizer } from '@tanstack/react-virtual';

export interface OptionsListExplorerProps {
  title?: string;
  fullWidthTextField?: boolean;
  inputClasses?: string;
  onSearch?: (value: string) => void;
  onBackButtonClick?: () => void;
  search?: {
    placeholder: string;
  };
  searchable?: boolean;
  selectedItemId?: number | string;
  emptyStateMessage?: string;
  items: {
    categories?: CategoryItem[] | null;
    items: OptionItem[];
  };
  onChange?: (item: OptionItem | OptionItem[]) => void;
  className?: string;
  inputSize?: TextFieldInputSize;
  multiple?: boolean;
  selectedIds?: (string | number)[];
}

export function OptionsListExplorer({
  title,
  onBackButtonClick,
  search,
  searchable = false,
  emptyStateMessage = 'صندوقی یافت نشد...',
  onSearch,
  selectedItemId,
  items,
  onChange,
  className,
  fullWidthTextField,
  inputClasses,
  inputSize,
  multiple,
  selectedIds,
}: OptionsListExplorerProps) {
  const [checkedItem, setCheckedItem] = useState(0);
  const [checkedItems, setCheckedItems] = useState<(string | number)[]>([]);

  useEffect(() => {
    if (multiple && selectedIds) {
      setCheckedItems(selectedIds);
    }
  }, [selectedIds, multiple]);
  const [filteredItems, setFilteredItems] = useState<OptionItem[]>(items.items);
  const [activeTab, setActiveTab] = useState(0);
  const [inputValue, setInputValue] = useState('');

  const parentRef = useRef<HTMLDivElement>(null);

  // virtualizer setup
  const rowVirtualizer = useVirtualizer({
    count: filteredItems.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 60, // هر آیتم حدود 60px ارتفاع
    overscan: 3, // آیتم‌های اضافه برای روان بودن اسکرول
  });

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onSearch?.(value);
  };

  useEffect(() => {
    if (selectedItemId) {
      const item = items.items.find(
        (item: OptionItem) => item.id === selectedItemId,
      );
      if (item) {
        setCheckedItem(+item.id);
      }
    }
  }, [items.items, selectedItemId]);

  useEffect(() => {
    const filterListByTitle = (title: string) => {
      return items.items.filter((item: OptionItem) =>
        item.title.toLocaleLowerCase().includes(title.toLocaleLowerCase()),
      );
    };

    const filterListByTab = (tab: number) => {
      return items.items.filter((item: OptionItem) => item.categoryId === tab);
    };

    if (activeTab === 0) {
      setFilteredItems(
        inputValue.trim() ? filterListByTitle(inputValue) : items.items,
      );
    } else {
      const listCategory = filterListByTab(activeTab);
      setFilteredItems(
        inputValue.trim()
          ? listCategory.filter((item) =>
              item.title
                .toLocaleLowerCase()
                .includes(inputValue.toLocaleLowerCase()),
            )
          : listCategory,
      );
    }
  }, [inputValue, activeTab, items.items]);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    setCheckedItem(0);
  };

  return (
    <div
      className={cn(
        'bg-surface-neutral-primary text-text-neutral-primary h-full min-w-[350px]',
        { 'pt-4': !title },
        { 'pt-0': fullWidthTextField },
        className,
      )}
    >
      {onBackButtonClick && (
        <button
          aria-label="Go back"
          onClick={onBackButtonClick}
          className="text-text-neutral-primary flex w-fit cursor-pointer items-center gap-1 bg-transparent px-4 py-2.5"
        >
          <Icon name="chevron-right" />
        </button>
      )}
      {title && <span className="text-sm font-medium">{title}</span>}
      {!searchable && (
        <div className="border-border-neutral-primary mb-4 w-full border"></div>
      )}
      {searchable && (
        <div
          className={cn('mx-4 pb-2', {
            'mx-0': fullWidthTextField,
          })}
        >
          <TextField
            inputClasses={inputClasses}
            value={inputValue}
            className="w-full rounded-none"
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={search?.placeholder || 'جستجو کنید...'}
            mode="outline"
            leadingIcon={{
              name: 'search',
              size: 'md',
            }}
            mergeTitleAndPlaceholder={false}
            trailingIcons={[]}
            inputSize={inputSize}
          />
        </div>
      )}

      {items.categories && (
        <div className="mx-4 mt-2">
          <Tabs
            tabs={items.categories.map((category) => ({
              title: category.title,
              id: String(category.id),
            }))}
            variant="rounded"
            activeTab={activeTab}
            onClickTab={(id) => handleTabChange(id)}
          />
        </div>
      )}

      {filteredItems.length ? (
        <div
          ref={parentRef}
          className={cn('relative flex max-h-60 flex-col overflow-auto')}
        >
          <div
            style={{
              height: rowVirtualizer.getTotalSize(),
              width: '100%',
              position: 'relative',
            }}
          >
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const item = filteredItems[virtualRow.index];
              return (
                <div
                  key={item.id}
                  ref={rowVirtualizer.measureElement}
                  data-index={virtualRow.index}
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${virtualRow.start}px)`,
                  }}
                  onClick={() => {
                    if (multiple) {
                      setCheckedItems((prev) => {
                        if (prev.includes(item.id)) {
                          const newList = prev.filter((id) => id !== item.id);
                          onChange?.(
                            items.items.filter((f) => newList.includes(f.id)),
                          );
                          return newList;
                        } else {
                          const newList = [...prev, item.id];
                          onChange?.(
                            items.items.filter((f) => newList.includes(f.id)),
                          );
                          return newList;
                        }
                      });
                    } else {
                      setCheckedItem(+item.id);
                      onChange?.(item);
                    }
                  }}
                  className={cn(
                    'border-border-accent-gray-200 flex h-[60px] w-full cursor-pointer justify-between border-b px-4 py-3 last:border-b-0',
                    multiple
                      ? checkedItems.includes(item.id) && 'bg-surface-brand-100'
                      : checkedItem === item.id && 'bg-surface-brand-100',
                  )}
                >
                  <div className="flex items-center gap-1">
                    <div
                      className={cn('text-text-brand-contrast-700 invisible', {
                        visible: multiple
                          ? checkedItems.includes(item.id)
                          : checkedItem === item.id,
                      })}
                    >
                      <Icon name="check" />
                    </div>

                    <span className="max-w-52 truncate text-sm font-normal">
                      {item.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    {item.categoryId !== activeTab && (
                      <p className="w-20 text-center text-xs font-normal">
                        {item?.type}
                      </p>
                    )}
                    {item.priceRials && (
                      <span className="px-4 text-center text-xs font-medium">
                        {formatNumber(item.priceRials, {
                          commaSeparated: true,
                        })}
                        ریال
                      </span>
                    )}
                    {typeof item.priceChangePercent === 'number' && (
                      <PercentageLabel
                        value={item.priceChangePercent}
                        key={`${item.id}-percentage`}
                        size="small"
                      />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="text-text-neutral-primary text-md my-4 px-6 font-normal">
          {emptyStateMessage}
        </p>
      )}
    </div>
  );
}
