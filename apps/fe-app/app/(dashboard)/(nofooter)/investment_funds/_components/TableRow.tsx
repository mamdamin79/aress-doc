import React, { useCallback, useState } from 'react';
import type { Row } from '@tanstack/react-table';
import { Bookmark } from 'design-system';
import { useCustomToast } from 'design-system';
import { Icon, OptionsDropdown, Tooltip, cn } from 'design-system';

interface FundRow {
  nameFund: string;
  investmentMethod: 'T' | 'I&C';
  logo: string;
}

interface TableRowProps<T extends FundRow> {
  row: Row<T>;
  logo: string;
  isMainTab: boolean;
  activeIndexCategoryTab: number;
  rowMarks: Record<number, Record<string, string>>;
  handleColorChange: (id: string, color: string) => void;
  toggleWatchList: (args: { id: string }) => void;
  setPineWatchList: React.Dispatch<React.SetStateAction<string[]>>;
  pineWatchLis: string[];
  watchList: string[];
  isScrollAtStart: boolean;
}

interface FundsInfoCellProps {
  name: string;
  logo: string;
  pined: boolean;
  selected: boolean;
  isScrolled: boolean;
  className?: string;
  investmentMethod: 'T' | 'I&C';
  pinedFunction: () => void;
  category: 'stocks' | 'watchlist';
  unPinedFunction: () => void;
  toggleWatchList: () => void;
  canPin: boolean;
  tag: boolean;
  isRowHovered: boolean;
}

function FundsInfoCell({
  name,
  investmentMethod,
  tag,
  toggleWatchList,
  unPinedFunction,
  category,
  pinedFunction,
  logo,
  canPin,
  pined,
  selected,
  isScrolled,
  className,
}: FundsInfoCellProps) {
  const { showProgressToast, showToast } = useCustomToast();
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  return (
    <div
      className={cn(
        'bg-surface-neutral-primary text-text-neutral-primary sticky right-0 top-0 m-0 flex h-[46px] w-[384px] items-center justify-between p-0 py-0',
        className,
        {
          'dark:shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrolled,
          'bg-surface-accent-blue-50 group-hover:surface-accent-blue-100':
            pined,
          'bg-blue-200': selected,
          'group-hover:bg-surface-accent-blue-50 bottom-0': !selected && !pined,
        },
      )}
    >
      <div className="relative flex h-full items-center gap-2 pl-2 pr-6">
        <span
          className={cn(
            'border-border-accent-vividgreen-200 text-text-onaccent-colored-onvividgreen-on200_100_50 bg-surface-accent-vividgreen-100 h-[25px] w-fit select-none rounded-sm border px-2 pt-0.5 text-xs font-medium',
            {
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]':
                investmentMethod === 'T',
            },
          )}
        >
          ETF
        </span>
        <span
          className={cn(
            'border-border-accent-vividgreen-200 text-text-onaccent-colored-onvividgreen-on200_100_50 bg-surface-accent-vividgreen-100 h-[25px] w-fit select-none whitespace-nowrap rounded-sm border px-2 text-xs font-medium',
            {
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]':
                investmentMethod === 'T',
            },
          )}
        >
          قابل خرید
        </span>
        <div
          className={cn(
            'bg-vividGreen-600 invisible box-content h-2.5 w-2.5 rounded-full border-2 border-white',
            {
              visible: tag,
            },
          )}
        ></div>
        <div className="group/img relative">
          <div className="h-8 w-8 overflow-hidden rounded-full">
            <img src={logo} alt="logo fund" />
          </div>
          {pined && (
            <div className="absolute -right-1 top-5">
              <div className="flex items-center justify-center text-black">
                <Icon name="CustomPin" size="sm" />
              </div>
            </div>
          )}
        </div>
        {name.length > 13 ? (
          <Tooltip offset={2} position="left" title={name}>
            <p className="text-gray-1000 hover:text-text-brand-contrast-700 w-[130px] truncate text-right text-sm font-medium">
              {name}
            </p>
          </Tooltip>
        ) : (
          <p className="text-gray-1000 hover:text-text-brand-contrast-700 w-[130px] truncate text-right text-sm font-medium">
            {name}
          </p>
        )}
        {!isShowDropDown && (
          <div
            onMouseEnter={() => setIsShowDropDown(true)}
            className={cn(
              'text-icon-neutral-primary hover:bg-surface-neutral-primary invisible ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-1.5 group-hover:visible',
              {
                'hover:border-border-brand-primary-600 border border-blue-200':
                  selected,
                'hover:border-border-brand-primary-600 border border-blue-100':
                  pined,
              },
            )}
          >
            <Icon name="ellipsis-vertical" />
          </div>
        )}
        {isShowDropDown && (
          <OptionsDropdown
            className="!border-border-neutral-primary shadow-7xl"
            dropDownStyles={{
              anchor: 'bottom start',
              size: 'md',
              bg: 'primary',
              emphasize: 'medium',
            }}
            dropDownList={[
              { text: 'مشاهده صندوق', icon: { name: 'eye', size: 'md' } },
              { text: 'مشاهده ویدیو', icon: { name: 'video', size: 'md' } },
              { text: 'نشان‌دار کردن', icon: { name: 'target', size: 'md' } },
              {
                text: pined ? 'برداشتن پین' : 'پین کردن',
                icon: { name: pined ? 'pin-off' : 'pin', size: 'md' },
              },
              {
                text:
                  category === 'stocks'
                    ? 'افزودن به دیده‌بان'
                    : 'حذف از دیده‌بان',
                icon: {
                  name: category === 'stocks' ? 'plus' : 'minus',
                  size: 'md',
                },
              },
            ]}
            customTriggerRender={(prop) => {
              return (
                <div
                  className={cn(
                    'text-icon-neutral-primary hover:bg-surface-neutral-primary invisible ml-1 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full p-1.5 group-hover:visible',
                    {
                      'hover:border-border-brand-primary-600 border border-blue-200':
                        selected,
                      'hover:border-border-brand-primary-600 border border-blue-100':
                        pined,
                      'border-border-brand-primary-600 visible border':
                        prop.isActive,
                    },
                  )}
                >
                  <Icon name="ellipsis-vertical" />
                </div>
              );
            }}
            customOptionRender={(prop) => {
              return (
                <div
                  onClick={() => {
                    if (!canPin && prop.text === 'پین کردن') {
                      showToast({
                        message:
                          'حداکثر میتوانید ۳ صندوق را در هر دسته بندی پین کنید.',
                        type: 'warning',
                      });
                    }
                    if (prop.text === 'پین کردن' && canPin) {
                      pinedFunction();
                      showProgressToast({
                        timeout: 5000,
                        title: 'صندوق مورد نظر پین شد.',
                      });
                    }
                    if (prop.text === 'برداشتن پین') {
                      unPinedFunction();
                      showProgressToast({
                        title: 'صندوق از لیست پین شده‌ها خارج شد.',
                        timeout: 3000,
                        leadingAction: {
                          iconProps: { name: 'undo-2', size: 'sm' },
                          onClick: () => pinedFunction(),
                        },
                      });
                    }

                    if (prop.text === 'افزودن به دیده‌بان') {
                      toggleWatchList();
                      showProgressToast({
                        title: 'صندوق مورد نظر به دیده بان اضافه شد.',
                        timeout: 3000,
                      });
                    }
                    if (prop.text === 'حذف از دیده‌بان') {
                      showProgressToast({
                        title: 'صندوق مورد نظر از دیده بان حذف شد.',
                        timeout: 3000,
                        leadingAction: {
                          iconProps: { name: 'undo-2', size: 'sm' },
                          onClick: () => toggleWatchList(),
                        },
                      });
                      toggleWatchList();
                    }
                  }}
                  className={cn(
                    'text-text-neutral-primary hover:text-text-brand-contrast-700 bg-surface-neutral-primary flex w-[168px] cursor-pointer items-center gap-2 py-2 pr-2 text-sm font-medium',
                    {
                      'hover:text-text-neutral-disable text-text-neutral-disable cursor-default hover:text-nowrap':
                        !canPin && prop.text === 'پین کردن',
                    },
                  )}
                >
                  {prop.icon?.name && (
                    <div
                      className={cn({
                        'rotate-[25deg]':
                          prop.icon.name === 'pin-off' ||
                          prop.icon.name === 'pin',
                      })}
                    >
                      <Icon name={prop.icon?.name} size={prop.icon?.size} />
                    </div>
                  )}
                  <span>{prop.text}</span>
                </div>
              );
            }}
          />
        )}
      </div>
    </div>
  );
}

function TableRowInner<T extends FundRow>({
  row,
  isMainTab,
  activeIndexCategoryTab,
  rowMarks,
  handleColorChange,
  toggleWatchList,
  setPineWatchList,
  pineWatchLis,
  watchList,
  isScrollAtStart,
}: TableRowProps<T>) {
  const handleToggleWatchList = useCallback(
    () => toggleWatchList({ id: row.id }),
    [row.id, toggleWatchList],
  );

  const handlePin = useCallback(
    () =>
      isMainTab
        ? row.pin?.('top', true)
        : setPineWatchList([...pineWatchLis, row.id]),
    [isMainTab, pineWatchLis, row.id, setPineWatchList],
  );

  const handleUnPin = useCallback(
    () =>
      isMainTab
        ? row.pin?.(false)
        : setPineWatchList((prev) => prev.filter((id) => id !== row.id)),
    [isMainTab, row.id, setPineWatchList],
  );

  return (
    <tr
      key={row.id}
      className="border-border-neutral-secondary group h-[46px] border-b"
    >
      <td className="sticky right-0 top-0 z-40 m-0 flex items-center py-0">
        <div className="absolute z-50 pr-0">
          <Bookmark
            selectedColor={rowMarks[activeIndexCategoryTab]?.[row.id] || ''}
            onColorChange={(color) => handleColorChange(row.id, color)}
          />
        </div>
        <div>
          <FundsInfoCell
            isRowHovered
            tag={!isMainTab}
            category={
              isMainTab
                ? watchList.includes(row.id)
                  ? 'watchlist'
                  : 'stocks'
                : 'watchlist'
            }
            canPin={false}
            toggleWatchList={handleToggleWatchList}
            pinedFunction={handlePin}
            unPinedFunction={handleUnPin}
            isScrolled={isScrollAtStart}
            investmentMethod={row.original.investmentMethod}
            name={row.original.nameFund}
            pined={false}
            selected={false}
            logo={row.original.logo}
          />
        </div>
      </td>
      <td></td>
      {row.getVisibleCells().map((item) => (
        <td
          className="bg-surface-neutral-primary text-text-neutral-primary group-hover:bg-surface-accent-blue-50"
          key={item.id}
        >
          {item.getValue() as string}
        </td>
      ))}
    </tr>
  );
}

const TableRow = React.memo(TableRowInner) as typeof TableRowInner;

export default TableRow;
