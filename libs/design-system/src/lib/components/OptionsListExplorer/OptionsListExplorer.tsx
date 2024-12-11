import { useEffect, useState } from 'react';
import { OptionItem, CategoryItem } from './OptionsListExplorer.types';
import { Icon } from '../Icon';
import { cn } from '../../../utils';
import { PercentageLabel } from '../PercentageLabel';
import { TextField } from '../TextField';
import { Tabs } from '../Tabs';

interface Props {
  title: string;
  onSearch: (value: string) => void;
  onBackButtonClick: () => void;
  search?: {
    placeholder: string;
  };
  items: {
    categories: CategoryItem[] | null;
    items: OptionItem[];
  };
}

export function OptionsListExplorer({
  title,
  onBackButtonClick,
  search,
  onSearch,
  items,
}: Props) {
  const [checkedItem, setCheckedItem] = useState(0);
  const [filteredItems, setFilteredItems] = useState<OptionItem[]>(items.items);
  const [activeTab, setActiveTab] = useState(1);
  const [inputValue, setInputValue] = useState('');
  const itemsToShow =
    items.items.length > 10 ? filteredItems.slice(0, 3) : filteredItems;

  const handlerInput = (value: string) => {
    setInputValue(value);
  };

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

  const handlerActiveTab = (tabId: number) => {
    setActiveTab(tabId);
    setCheckedItem(0);
  };

  return (
    <div
      className={cn(
        items.items.length > 10 ? 'h-[340px]' : 'h-[290px]',
        'w-[500px] bg-white',
      )}
    >
      <div
        onClick={() => onBackButtonClick}
        className="text-gray-1000 flex w-fit cursor-pointer items-center gap-1 px-4 py-2.5"
      >
        <Icon name="chevron-right" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {!search?.placeholder && <p className="h-0.5 w-full bg-gray-300"></p>}
      {items.items.length > 10 && (
        <div className="mx-4 h-12 pb-1">
          <TextField
            value={inputValue}
            onSearchInput={handlerInput}
            placeholder={search?.placeholder}
            mode="outline"
            leadingIcon="search"
            mergeTitleAndPlaceholder={false}
            trailingIcons={[]}
          />
        </div>
      )}
      {items.categories && (
        <div className="mx-4 mt-4">
          <Tabs
            tabs={items.categories}
            bgWhite
            mode="rounded"
            onClickTab={(id) => handlerActiveTab(id)}
          />
        </div>
      )}
      {filteredItems.length ? (
        <div
          className={cn('flex max-h-56 flex-col', {
            'custom-scrollbar h-[60%] overflow-y-scroll':
              items.items.length <= 10 &&
              items.items.length > 3 &&
              filteredItems.length > 3,
          })}
        >
          {itemsToShow.map((item: OptionItem, index: number) => (
            <div
              onClick={() => setCheckedItem(index + 1)}
              className={cn(
                'flex w-full cursor-pointer justify-between border-b border-gray-200 px-4 py-3 last:border-b-0',
                { 'bg-brand-100': checkedItem === index + 1 },
              )}
              key={index}
            >
              <div className="flex items-center gap-1">
                <div
                  className={cn('text-brand-700 invisible', {
                    visible: checkedItem === index + 1,
                  })}
                >
                  <Icon name="check" />
                </div>
                <span className="max-w-52 truncate">{item.title}</span>
              </div>
              <div className="flex items-center gap-1">
                {item.categoryId !== activeTab && (
                  <p className="w-20 text-center">{item.type}</p>
                )}
                <span className="px-4 text-center">{item.priceRials} ریال</span>
                {typeof item.priceChangePercent === 'number' && (
                  <PercentageLabel
                    value={item.priceChangePercent}
                    key={index}
                    size="normal"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="mt-3 px-4">صندوقی یافت نشد...</p>
      )}
    </div>
  );
}
