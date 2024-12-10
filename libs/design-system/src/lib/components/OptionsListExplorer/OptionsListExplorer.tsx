import { useState } from 'react';
import { OptionItem, CategoryItem } from './OptionsListExplorer.types';
import { Icon } from '../Icon';
import { cn } from '../../../utils';
import { PercentageLabel } from '../PercentageLabel';
import { TextField } from '../TextField';

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
  const itemsToShow =
    items.items.length > 10 ? filteredItems.slice(0, 3) : filteredItems;

  const handlerInput = (value: string) => {
    onSearch(value);
    if (value) {
      const filtredList: OptionItem[] = items.items.filter((item: OptionItem) =>
        item.title
          .toLocaleLowerCase()
          .includes(value.trim().toLocaleLowerCase()),
      );
      setFilteredItems(filtredList);
    } else setFilteredItems(items.items);
  };

  return (
    <div className="w-[500px] bg-white py-2.5">
      <div
        onClick={() => onBackButtonClick}
        className="text-gray-1000 flex w-fit cursor-pointer items-center gap-1 px-4 py-2.5"
      >
        <Icon name="chevron-right" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {!search?.placeholder && <p className="h-0.5 w-full bg-gray-300"></p>}
      {items.items.length > 10 && (
        <div className="mx-4 h-20 pb-1">
          <TextField
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
        <div className="mx-4 mb-2 mt-4 flex items-center gap-2">
          {items.categories.map((item: CategoryItem) => (
            <span
              className="cursor-pointer px-3 text-xs font-medium"
              key={item.title}
            >
              {item.title}
            </span>
          ))}
        </div>
      )}
      {filteredItems.length ? (
        <div
          className={cn('flex max-h-56 flex-col', {
            'custom-scrollbar overflow-y-scroll': items.items.length <= 10,
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
                <p className="w-20 text-center">{item.type}</p>
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
