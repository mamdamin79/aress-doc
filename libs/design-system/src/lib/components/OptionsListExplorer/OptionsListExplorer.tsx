'use client';
import { useEffect, useState } from 'react';
import { OptionItem, CategoryItem } from './OptionsListExplorer.types';
import { cn, formatNumber } from '../../../utils';
import { PercentageLabel } from '../PercentageLabel';
import { TextField } from '../TextField';
import { Tabs } from '../Tabs';
import { Icon } from '../Icon/Icon';

interface Props {
  title: string;
  onSearch: (value: string) => void;
  onBackButtonClick: () => void;
  search?: {
    placeholder: string;
  };
  selectedItemId?: number | string;
  emptyStateMessage?: string;
  items: {
    categories?: CategoryItem[] | null;
    items: OptionItem[];
  };
}

export function OptionsListExplorer({
  title,
  onBackButtonClick,
  search,
  emptyStateMessage = 'صندوقی یافت نشد...',
  onSearch,
  selectedItemId,
  items,
}: Props) {
  const [checkedItem, setCheckedItem] = useState(0);
  const [filteredItems, setFilteredItems] = useState<OptionItem[]>(items.items);
  const [activeTab, setActiveTab] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const itemsToShow =
    items.items.length > 10 ? filteredItems.slice(0, 3) : filteredItems;

  const handleInputChange = (value: string) => {
    setInputValue(value);
    onSearch(value);
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
    if (activeTab === 1) {
      if (inputValue.trim()) {
        setFilteredItems(filterListByTitle(inputValue));
      } else {
        setFilteredItems(items.items);
      }
    } else if (activeTab > 1) {
      const listCategory = filterListByTab(activeTab);
      const filterItems = listCategory.filter((item) =>
        item.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase()),
      );
      setFilteredItems(filterItems);
    }
  }, [inputValue, activeTab, items.items]);

  const handleTabChange = (tabId: number) => {
    setActiveTab(tabId);
    setCheckedItem(0);
  };

  return (
    <div className={cn('bg-surface-neutral-primary h-full w-[500px]')}>
      <button
        aria-label="Go back"
        onClick={onBackButtonClick}
        className="text-text-neutral-primary flex w-fit cursor-pointer items-center gap-1 bg-transparent px-4 py-2.5"
      >
        <Icon name="chevron-right" />
        <span className="text-sm font-medium">{title}</span>
      </button>
      {!items.categories && items.items.length < 10 && (
        <div className="bg-border-neutral-primary my-4 h-0.5 w-full"></div>
      )}
      {items.items.length > 10 && (
        <div className="mx-4 pb-2">
          <TextField
            value={inputValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={search?.placeholder || 'جستجو کنید...'}
            mode="outline"
            leadingIcon={{
              name: 'search',
              size: 'md',
            }}
            mergeTitleAndPlaceholder={false}
            trailingIcons={[]}
            inputSize="sm"
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
            colorMode="neutral"
            variant="rounded"
            activeTab={activeTab}
            onClickTab={(id) => handleTabChange(id)}
          />
        </div>
      )}
      {filteredItems.length ? (
        <div
          className={cn('flex max-h-60 flex-col', {
            'custom-scrollbar h-3/5 overflow-y-scroll':
              items.items.length <= 10 &&
              items.items.length > 3 &&
              filteredItems.length > 3,
          })}
        >
          {itemsToShow.map((item: OptionItem, index: number) => (
            <div
              onClick={() => setCheckedItem(+item.id)}
              className={cn(
                'border-border-accent-gray-200 flex h-14 w-full cursor-pointer justify-between border-b px-4 py-3 last:border-b-0',
                { 'bg-surface-brand-100': checkedItem === item.id },
              )}
              key={item.id}
            >
              <div className="flex items-center gap-1">
                <div
                  className={cn('text-text-brand-contrast-700 invisible', {
                    visible: checkedItem === item.id,
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
          ))}
        </div>
      ) : (
        <p className="mt-3 px-4">{emptyStateMessage}</p>
      )}
    </div>
  );
}
