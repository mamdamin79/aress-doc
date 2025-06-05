import React, { useCallback, useState } from 'react';
import type { Row } from '@tanstack/react-table';
import { Bookmark } from 'libs/design-system/src/lib/components/Bookmark';
import { useCustomToast } from 'libs/design-system/src/hooks/CustomToast/CustomToast';
import { Icon, cn } from 'design-system';

interface FundRow {
  nameFund: string;
  investmentMethod: 'T' | 'I&C';
  logo: string;
}

interface TableRowProps<T extends FundRow> {
  row: Row<T>;
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
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const { showProgressToast, showToast } = useCustomToast();

  return (
    <div
      className={cn(
        'sticky right-0 top-0 py-0 m-0 flex bg-white h-[45px] w-[384px] items-center justify-between p-0',
        className,
        {
          'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrolled,
          'bg-blue-50 group-hover:bg-blue-100': pined,
          'bg-blue-200': selected,
          'bottom-0 group-hover:bg-blue-50': !selected && !pined,
        },
      )}
    >
      <div className="relative pr-6 pl-2 h-full flex items-center gap-2">
        <span
          className={cn(
            'border-[#ACF1C7] select-none w-fit text-[#058F3C] bg-[#D2FEE4] rounded-sm border px-2 pt-0.5 h-[25px] text-xs font-medium',
            {
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': investmentMethod === 'T',
            }
          )}
        >
          ETF
        </span>
        <span
          className={cn(
            'border-[#ACF1C7] whitespace-nowrap select-none w-fit text-[#058F3C] bg-[#D2FEE4] rounded-sm border px-2 h-[25px] text-xs font-medium',
            {
              'border-[#B3B6BD] bg-[#F3F4F6] text-[#74777C]': investmentMethod === 'T',
            }
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
    [row.id, toggleWatchList]
  );

  const handlePin = useCallback(
    () =>
      isMainTab
        ? row.pin?.('top', true)
        : setPineWatchList([...pineWatchLis, row.id]),
    [isMainTab, pineWatchLis, row.id, setPineWatchList]
  );

  const handleUnPin = useCallback(
    () =>
      isMainTab
        ? row.pin?.(false)
        : setPineWatchList((prev) => prev.filter((id) => id !== row.id)),
    [isMainTab, row.id, setPineWatchList]
  );

  return (
    <tr key={row.id} className="group h-[48px] border-b border-[#E1E2E5]">
      <td className="sticky right-0 top-0 z-40 m-0 flex items-center py-0">
        <div className="absolute z-50 pr-0">
          <Bookmark
            selectedColor={rowMarks[activeIndexCategoryTab]?.[row.id] || ''}
            onColorChange={(color) => handleColorChange(row.id, color)}
          />
        </div>
        <div>
          <FundsInfoCell
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

      {row.getVisibleCells().map((item) => (
        <td key={item.id}>{item.getValue() as string}</td>
      ))}
    </tr>
  );
}

const TableRow = React.memo(TableRowInner) as typeof TableRowInner;

export default TableRow;
