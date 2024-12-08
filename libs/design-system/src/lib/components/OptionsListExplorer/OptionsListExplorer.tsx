import { useState } from 'react';
import { OptionItem } from './OptionsListExplorer.types';
import { Icon } from '../Icon';
import { cn } from '../../../utils';
import { PercentageLabel } from '../PercentageLabel';
import { TextField } from '../TextField';

interface Props {
  title: string;
  onBackButtonClick: () => void;
  search?: {
    placeholder: string;
  };
  categories: string[];
  items: OptionItem[];
}

export function OptionsListExplorer({
  title,
  onBackButtonClick,
  search,
  categories,
  items,
}: Props) {
  const [focuseInput, setFocuseInput] = useState(false);
  const [checkedItem, setCheckedItem] = useState(0);

  return (
    <div className="w-max min-w-80 bg-white py-2.5">
      <div
        onClick={() => onBackButtonClick}
        className="text-gray-1000 flex w-fit cursor-pointer items-center gap-1 px-4 py-2.5"
      >
        <Icon name="chevron-right" />
        <span className="text-sm font-medium">{title}</span>
      </div>
      {!search?.placeholder && <p className="h-0.5 w-full bg-gray-300"></p>}
      {search && (
        <div className="mx-4 h-20 pb-1">
          <TextField
            placeholder={search.placeholder}
            mode="outline"
            leadingIcon="search"
            mergeTitleAndPlaceholder={false}
            trailingIcons={[]}
          />
        </div>
      )}
      {categories && (
        <div className="mx-4 mb-2 mt-4 flex items-center gap-2">
          {categories.map((title: string) => (
            <span className="cursor-pointer px-3" key={title}>
              {title}
            </span>
          ))}
        </div>
      )}
      {items && (
        <div className="flex flex-col">
          {items.map((item: OptionItem, index: number) => (
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
                <p className="w-20 text-center">{item.investmentTypes}</p>
                <span className="px-4 text-center">{item.total} ریال</span>
                {typeof item.percentage === 'number' && (
                  <PercentageLabel
                    value={item.percentage}
                    key={index}
                    size="normal"
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
