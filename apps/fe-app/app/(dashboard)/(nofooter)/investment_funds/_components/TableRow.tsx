import React, { useCallback, useState } from 'react';
import type { Row } from '@tanstack/react-table';
import { Bookmark } from 'libs/design-system/src/lib/components/Bookmark';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import { Icon, OptionsDropdown, Tooltip, cn, formatNumber } from 'design-system';
import { useFundsServicePostFundsTablePin, useFundsServicePostFundsTableUnpin } from '@openapi';
import { Toaster } from 'react-hot-toast';

interface FundRow {
  nameFund: string;
  investmentMethod: 'T' | 'I&C';
  logo: string;
  pinned: boolean;
  id: number;
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
  isRowHovered,
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
        {name.length > 21 ? (
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
                    if (prop.text === 'پین کردن' && canPin) pinedFunction();
                    if (prop.text === 'برداشتن پین') unPinedFunction();
                    if (prop.text === 'افزودن به دیده‌بان') {
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
  const [isHovered, setIsHovered] = useState(false);
  const handleToggleWatchList = useCallback(
    () => toggleWatchList({ id: row.id }),
    [row.id, toggleWatchList],
  );

  const { showProgressToast, showToast } = useCustomToast();

  const [pinnedList, setPinnedList] = useState<number[]>([]);


  const pinFundMutation = useFundsServicePostFundsTablePin();
  const unPinFundMutation = useFundsServicePostFundsTableUnpin();



  const handlePinFund = async (fundId: number, isShowToast: boolean) => {
    try {
      await pinFundMutation.mutateAsync({
        requestBody: {
          tab: activeIndexCategoryTab,
          fund: fundId,
        },
      });

      if (isShowToast) {
        showProgressToast({
          timeout: 5000,
          title: 'صندوق مورد نظر پین شد.',
        });
      }
    } catch (err) {
      showToast({
        message:
          'حداکثر میتوانید ۳ صندوق را در هر دسته بندی پین کنید.',
        type: 'warning',
      }); 
    }
  };

  const handleUnPinFund = async (fundId: number) => {
    try {
      await unPinFundMutation.mutateAsync({
        requestBody: {
          tab: activeIndexCategoryTab,
          fund: fundId,
        },
      });

      showProgressToast({
        title: 'صندوق از لیست پین شده‌ها خارج شد.',
        timeout: 3000,
        leadingAction: {
          iconProps: { name: 'undo-2', size: 'sm' },
          onClick: () => handlePinFund(row.original.id, false),
        },
      });
    } catch (err) {
      alert("خطا در unPin کردن صندوق");
      console.error(err);
    }
  };


  const handlePin = useCallback(
    () => (handlePinFund(row.original.id, true)),
    [isMainTab, pineWatchLis, row.id, setPineWatchList],
  );

  const handleUnPin = useCallback(
    () => (handleUnPinFund(row.original.id)),
    [isMainTab, row.id, setPineWatchList],
  );

  return (
    <tr
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
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
            canPin={true}
            toggleWatchList={handleToggleWatchList}
            pinedFunction={handlePin}
            unPinedFunction={handleUnPin}
            isScrolled={isScrollAtStart}
            investmentMethod={row.original?.investmentMethod}
            name={row.original?.nameFund}
            pined={row.original.pinned}
            selected={false}
            logo={row.original?.logo}
          />
        </div>
      </td>
      <Toaster position='bottom-center' />
      <td></td>
      {row?.getVisibleCells().map((item) => (
        <td
          dir='ltr'
          className={cn("bg-surface-neutral-primary text-text-neutral-primary group-hover:bg-surface-accent-blue-50", {
            'text-text-accent-red-contrast-700': item.getValue() as number < 0,
            'bg-surface-accent-blue-50 group-hover:surface-accent-blue-100': row.original.pinned
          })}
          key={item.id}
        >
          {formatNumber(item.getValue() as string, { decimals: 2, commaSeparated: false })}
        </td>
      ))}
    </tr>
  );
}

const TableRow = React.memo(TableRowInner) as typeof TableRowInner;

export default TableRow;
