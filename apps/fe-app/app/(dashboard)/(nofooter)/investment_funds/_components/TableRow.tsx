import React, { useCallback, useState } from 'react';
import {
  FundsLogo,
  Icon,
  OptionsDropdown,
  Tooltip,
  cn,
  Bookmark,
  useCustomToast,
  FundsTag,
} from 'design-system';
import {
  useFundsServicePostFundsTableTabByTabPin,
  useFundsServicePostFundsTableTabByTabUnpin,
  useFundsServicePostFundsTableTabByTabMark,
  useFundsServicePostFundsTableTabByTabUnmark,
  useFundsServicePutFundsByFundIdWatchlist,
  useFundsServiceDeleteFundsByFundIdWatchlist,
} from '@openapi';
import { FundRow, FundsInfoCellProps, TableRowProps } from '../types';

// Define the allowed colors as a type for easier use
type FundsTagColor =
  | 'purple'
  | 'blue'
  | 'green'
  | 'yellow'
  | 'pink'
  | 'neutral';

function FundsInfoCell({
  tabs,
  name,
  isEtf,
  unPinedFunction,
  pinedFunction,
  addToWatchlist,
  deleteToWatchlist,
  logo,
  canPin,
  pined,
  selected,
  isScrolled,
  className,
  isTradable,
  isWatchList,
  fundType,
}: FundsInfoCellProps) {
  const [isShowDropDown, setIsShowDropDown] = useState(false);

  return (
    <div
      className={cn(
        'bg-surface-neutral-primary text-text-neutral-primary sticky right-0 top-0 m-0 flex h-[46px] w-[384px] items-center justify-between p-0 py-0',
        className,
        {
          'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrolled,
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
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': !isEtf,
            },
          )}
        >
          ETF
        </span>
        <span
          className={cn(
            'border-border-accent-vividgreen-200 text-text-onaccent-colored-onvividgreen-on200_100_50 bg-surface-accent-vividgreen-100 h-[25px] w-fit select-none whitespace-nowrap rounded-sm border px-2 text-xs font-medium',
            {
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': !isTradable,
            },
          )}
        >
          قابل خرید
        </span>
        {isWatchList ? (
          <FundsTag
            color={
              tabs?.find((tab) => tab.identifier === fundType)
                ?.color as FundsTagColor
            }
          />
        ) : (
          <div className="h-2.5 w-2.5" />
        )}
        <div className="group/img relative">
          <FundsLogo
            size="sm"
            hasTag={false}
            isPin={pined}
            color="green"
            src={`http://185.236.36.153:8000${logo}`}
          />
        </div>
        {name.length > 19 ? (
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
              {
                text: pined ? 'برداشتن پین' : 'پین کردن',
                icon: { name: pined ? 'pin-off' : 'pin', size: 'md' },
              },
              {
                text: isWatchList ? 'حذف از دیده‌بان' : 'افزودن به دیده‌بان',
                icon: { name: isWatchList ? 'minus' : 'plus' },
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
                    if (prop.text === 'افزودن به دیده‌بان') addToWatchlist();
                    if (prop.text === 'حذف از دیده‌بان') deleteToWatchlist();
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
  isScrollAtStart,
  handlerPinned,
  handlerUnPinned,
  handlerMarkFund,
  rowMarks,
  handlerDeleteWatchList,
  handlerAddToWatchList,
  tabs,
}: TableRowProps<T>) {
  const { showProgressToast, showToast } = useCustomToast();

  const [showMark, setShowMark] = useState(false);
  const pinFundMutation = useFundsServicePostFundsTableTabByTabPin();
  const unPinFundMutation = useFundsServicePostFundsTableTabByTabUnpin();
  const markFundMutation = useFundsServicePostFundsTableTabByTabMark();
  const unMarkFundMutation = useFundsServicePostFundsTableTabByTabUnmark();
  const addToWathcList = useFundsServicePutFundsByFundIdWatchlist();
  const deleteToWatchList = useFundsServiceDeleteFundsByFundIdWatchlist();

  const handlePinFund = async (fundId: number, isShowToast: boolean) => {
    try {
      await pinFundMutation.mutateAsync({
        tab: activeIndexCategoryTab,
        requestBody: {
          fund: fundId,
        },
      });
      handlerPinned(fundId);
      if (isShowToast) {
        showProgressToast({
          timeout: 5000,
          title: 'صندوق مورد نظر پین شد.',
        });
      }
    } catch {
      showToast({
        message: 'حداکثر میتوانید ۳ صندوق را در هر دسته بندی پین کنید.',
        type: 'warning',
      });
    }
  };

  const handleUnPinFund = async (fundId: number) => {
    try {
      await unPinFundMutation.mutateAsync({
        tab: activeIndexCategoryTab,
        requestBody: {
          fund: fundId,
        },
      });
      handlerUnPinned(fundId);
      showProgressToast({
        title: 'صندوق از لیست پین شده‌ها خارج شد.',
        timeout: 3000,
        leadingAction: {
          iconProps: { name: 'undo-2', size: 'sm' },
          onClick: () => handlePinFund(fundId, false),
        },
      });
    } catch (err) {
      alert('خطا در unPin کردن صندوق');
      console.error(err);
    }
  };

  const handlePin = useCallback(
    () => handlePinFund(row.original.id, true),
    [isMainTab, row.original.id],
  );

  const handleUnPin = () => {
    if (row.original.pinned) {
      handleUnPinFund(row.original.id);
    }
  };

  const markFund = async (fundId: number, color: string) => {
    const existingMark = rowMarks.find((mark) => mark.id === fundId);
    try {
      if (existingMark && existingMark.color === color) {
        // Call unmark API
        await unMarkFundMutation.mutateAsync({
          tab: activeIndexCategoryTab,
          requestBody: { fund: fundId },
        });
        // Update local state
        handlerMarkFund(fundId, color); // This will remove the mark as per your handler
      } else {
        // Call mark API
        await markFundMutation.mutateAsync({
          tab: activeIndexCategoryTab,
          requestBody: { fund: fundId, color },
        });
        // Update local state
        handlerMarkFund(fundId, color);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlerAddWatchList = async (showToast?: boolean) => {
    try {
      await addToWathcList.mutateAsync({
        fundId: row.original.id,
      });
      handlerAddToWatchList(row.original.id);
      if (showToast) {
        showProgressToast({
          timeout: 5000,
          title: 'صندوق مورد نظر به دیده‌بان اضافه شد.',
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handlerDeleteInWatchList = async () => {
    try {
      await deleteToWatchList.mutateAsync({
        fundId: row.original.id,
      });
      handlerDeleteWatchList(row.original.id);

      // A flag to ensure undo is only called once
      let hasBeenUndone = false;

      showProgressToast({
        timeout: 5000,
        title: 'صندوق مورد نظر از دیده‌بان حذف شد.',
        leadingAction: {
          iconProps: { name: 'undo-2', size: 'sm' },
          onClick: () => {
            // If it has already been undone, do nothing.
            if (hasBeenUndone) {
              return;
            }
            // Set the flag to true and then add the item back.
            hasBeenUndone = true;
            handlerAddWatchList(false);
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <tr
      onMouseEnter={() => setShowMark(true)}
      key={row.id}
      className="border-border-neutral-secondary group h-[46px] border-b"
    >
      <td className="sticky right-0 top-0 z-40 m-0 flex items-center py-0">
        <div className="absolute z-50 pr-0">
          {(showMark ||
            rowMarks.find((item) => item.id === row.original.id)) && (
            <Bookmark
              selectedColor={
                rowMarks.find((item) => item.id === row.original.id)?.color ??
                ''
              }
              onColorChange={(color) => markFund(row.original.id, color)}
            />
          )}
        </div>
        <div>
          <FundsInfoCell
            tabs={tabs}
            isRowHovered={true}
            tag={!isMainTab}
            canPin={true}
            pinedFunction={handlePin}
            unPinedFunction={handleUnPin}
            isScrolled={isScrollAtStart}
            isEtf={!!row.original?.isEtf}
            isTradable={row.original?.isTradable}
            name={row.original?.nameFund}
            isWatchList={activeIndexCategoryTab === 1000 ? true : false}
            pined={row.original.pinned}
            fundType={row.original.fundType}
            selected={false}
            addToWatchlist={() => handlerAddWatchList(true)}
            deleteToWatchlist={handlerDeleteInWatchList}
            logo={row.original?.logo}
            investmentMethod={row.original?.investmentMethod}
          />
        </div>
      </td>
      <td></td>
      {row?.getVisibleCells().map((item) => (
        <td
          dir="ltr"
          className={cn(
            'bg-surface-neutral-primary text-text-neutral-primary group-hover:bg-surface-accent-blue-50',
            {
              'text-text-accent-red-contrast-700':
                (item.getValue() as number) < 0,
              'bg-surface-accent-blue-50 group-hover:surface-accent-blue-100':
                row.original.pinned,
            },
          )}
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
