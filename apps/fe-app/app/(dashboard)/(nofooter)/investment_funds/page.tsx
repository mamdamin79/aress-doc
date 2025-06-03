'use client';
import React, {
  startTransition,
  TableHTMLAttributes,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHeaderVisibility } from '../../../../hooks/useHeaderVisiblity';
import {
  cn,
  Icon,
  Tabs,
  DatePicker,
  Tooltip,
  formatNumber,
  OptionsDropdown,
  FundsTableRow,
  FilterPopUpSection,
  FundsColumn,
  Dialog,
  Checkbox,
} from 'design-system';
import {
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { makeData } from './_components/makeData';
import { columns, columnVisibility, filterList } from './FundsTable.constants';
import { ExportExel } from './_components/ExportExel';
import { Bookmark } from 'libs/design-system/src/lib/components/Bookmark';
import { useSmartTableScroll } from 'apps/fe-app/hooks/useSmartTableScroll';
import { Toaster } from 'react-hot-toast';
const Funds = () => {
  const [sortIndex, setSortIndex] = useState(0);
  const { isHeaderVisible, setIsHeaderVisible } = useHeaderVisibility();
  const [rowMarks, setRowMarks] = useState<{
    [tabIndex: number]: { [id: string]: string };
  }>({});
  const [canScrollVertical, setCanScrollVertical] = useState(false);
  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data] = useState(() => makeData(500));
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [pineWatchLis, setPineWatchList] = useState<string[]>([]);
  const [isActiveDropdownPageCount, setIsActiveDropdownPageCount] =
    useState(false);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const headerRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);
  const [sortIndicator, setSortIndicator] = useState({
    right: headerRefs.current[0]?.offsetLeft,
    width: 0,
  });

  const [customColl, setCustomColl] = useState<{
    active: boolean;
    date: string;
  }>({ active: false, date: '' });

  const { handleScrollRight, handleScrollLeft } = useSmartTableScroll(
    headerRefs,
    tableRef,
  );

  const table = useReactTable({
    data,
    columns: columns,
    state: { columnFilters },
    initialState: {
      columnVisibility,
      sorting: [
        {
          id: 'nameFund',
          desc: false,
        },
      ],
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const [updateTableHeaders, setUpdateTableHeaders] = useState(
    table.getHeaderGroups()[1].headers,
  );

  const columnVisibilityHeader = table.getState().columnVisibility;

  useEffect(() => {
    setUpdateTableHeaders([...table.getHeaderGroups()[1].headers]);
  }, [columnVisibilityHeader, table]);

  const moveColumn = (
    accessorKey: string,
    direction: 'left' | 'right' | 'start' | 'end',
  ) => {
    setUpdateTableHeaders((prevHeaders) => {
      const index = prevHeaders.findIndex(
        (header) => header.column.id === accessorKey,
      );
      if (index === -1) return prevHeaders;

      const newHeaders = [...prevHeaders];

      if (direction === 'right' && index > 0) {
        [newHeaders[index], newHeaders[index - 1]] = [
          newHeaders[index - 1],
          newHeaders[index],
        ];
      } else if (direction === 'left' && index < newHeaders.length - 1) {
        [newHeaders[index], newHeaders[index + 1]] = [
          newHeaders[index + 1],
          newHeaders[index],
        ];
      } else if (direction === 'start' && index > 0) {
        newHeaders.splice(1, 0, newHeaders.splice(index, 1)[0]);
      } else if (direction === 'end' && index < newHeaders.length - 1) {
        newHeaders.push(newHeaders.splice(index, 1)[0]);
      }

      table.setColumnOrder(newHeaders.map((header) => header.column.id));

      return newHeaders;
    });
  };

  const isChanged = useMemo(() => {
    return !Object.entries(table.getState().columnVisibility).every(
      ([key, value]) => columnVisibility[key] === value,
    );
  }, [table.getState().columnVisibility]);

  const toggleWatchList = (fund: { id: string }) => {
    setWatchList((prev) =>
      prev.includes(fund.id)
        ? prev.filter((id: string) => id !== fund.id)
        : [...prev, fund.id],
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const {
          scrollLeft,
          scrollWidth,
          clientWidth,
          scrollTop,
          scrollHeight,
          offsetHeight,
        } = tableRef.current;

        console.log(scrollHeight, offsetHeight);

        if (scrollTop && scrollHeight - offsetHeight > 200) {
          setIsHeaderVisible(false);
        } else {
          setIsHeaderVisible(true);
        }

        // Update scroll start state
        if (Math.round(scrollLeft) === 0) {
          setIsScrollAtStart(false);
        } else if (scrollLeft < 0) {
          setIsScrollAtStart(true);
        }
        // Update scroll end state; logic preserved from original code
        setIsScrollAtEnd(
          Math.round(scrollLeft * -1) + clientWidth <= scrollWidth - 1,
        );
      }
    };

    // Register scroll event listener on the table element
    const tableElem = tableRef.current;
    tableElem?.addEventListener('scroll', handleScroll);

    // Keyboard handler for scrolling (horizontal and vertical)
    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.code === 'KeyA') {
        handleScrollRight();
      }
      if (e.code === 'KeyD') {
        handleScrollLeft();
      }
      if (e.code === 'KeyS') {
        tableRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
      }
      if (e.code === 'KeyW') {
        tableRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
      }
    };

    const keyboardArrow = (e: KeyboardEvent) => {
      if (e.code === 'ArrowDown') {
        tableRef.current?.scrollBy({ top: 100, behavior: 'smooth' });
      }
      if (e.code === 'ArrowUp') {
        tableRef.current?.scrollBy({ top: -100, behavior: 'smooth' });
      }
      if (e.code === 'ArrowLeft') {
        handleScrollRight();
      }
      if (e.code === 'ArrowRight') {
        handleScrollLeft();
      }
    };

    document.addEventListener('keypress', keyboardHandler);
    document.addEventListener('keyup', keyboardArrow);

    // Cleanup: remove event listeners when component unmounts or dependencies change
    return () => {
      tableElem?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keypress', keyboardHandler);
      document.removeEventListener('keyup', keyboardArrow);
    };
  }, [tableRef]);

  useEffect(() => {
    startTransition(() => {
      updateTableHeaders[0].column.setFilterValue(fundSearchQuery);
    });
  }, [fundSearchQuery, updateTableHeaders]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [customColl.active]);

  const handlerMouseEnterTable = () => {
    requestAnimationFrame(() => {
      if (tableRef.current) {
        const hasVerticalScroll =
          tableRef.current.scrollHeight > tableRef.current.clientHeight;
        setCanScrollVertical(hasVerticalScroll);
      }
    });
  };

  const tableCount = table.getPageCount();

  useEffect(() => {
    handlerMouseEnterTable();
  }, [indexCategoryTab, tableCount]);

  useEffect(() => {
    const node = headerRefs?.current[sortIndex];
    const container = tableRef?.current;

    if (node && container) {
      const nodeRect = node.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let rightOffset = Math.round(containerRect.right - nodeRect.right);

      if (isScrollAtStart && tableRef.current && sortIndex !== 0) {
        rightOffset += tableRef?.current?.scrollLeft * -1;
      }

      setSortIndicator({
        right: rightOffset,
        width: node.offsetWidth,
      });
    }
  }, [isScrollAtStart, sortIndex]);

  const handleColorChange = (id: string, color: string) => {
    setRowMarks((prev) => ({
      ...prev,
      [indexCategoryTab]: {
        ...(prev[indexCategoryTab] || {}),
        [id]: color,
      },
    }));
  };

  const scrollIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const startScrollLeft = () => {
    handleScrollLeft(); // First scroll immediately
    scrollIntervalRef.current = setInterval(() => {
      handleScrollLeft();
    }, 100);
  };

  // Stop scrolling
  const stopScroll = () => {
    if (scrollIntervalRef.current) {
      clearInterval(scrollIntervalRef.current);
      scrollIntervalRef.current = null;
    }
  };

  const startScrollRight = () => {
    handleScrollRight(); // First scroll immediately
    scrollIntervalRef.current = setInterval(() => {
      handleScrollRight();
    }, 100);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      stopScroll();
    };

    window.addEventListener('mouseup', handleGlobalMouseUp);
    return () => {
      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  return (
    <div dir="rtl">
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between bg-white px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <Tabs
          variant="shaped-color"
          onClickTab={(e) => setIndexCategoryTab(e)}
          activeTab={indexCategoryTab}
          colorMode="neutral"
          tabs={[
            { title: 'سهامی', tag: 'green', id: '1' },
            { title: 'دیده بان', id: '2' },
          ]}
        />
        <Tooltip title="خروجی اکسل">
          <div className="border-brand-600 cursor-pointer rounded-md border p-1.5">
            <ExportExel />
          </div>
        </Tooltip>
      </div>
      <div
        dir="ltr"
        className={cn(
          'relative top-0 flex items-center overflow-hidden border-t-2 border-[#BCEBEB] transition-all duration-300',
          {
            '-top-[85px]': !isHeaderVisible,
          },
        )}
      >
        <div
          onMouseEnter={handlerMouseEnterTable}
          ref={tableRef}
          className={cn(
            'table-scroll group/table scrollbar-lg relative h-[calc(100vh-172px)] w-screen overflow-y-hidden scroll-smooth transition-all duration-300',
            {
              'hover:overflow-auto':
                canScrollVertical && !isActiveDropdownPageCount,
            },
            {
              'h-[calc(100vh-87px)]': !isHeaderVisible,
            },
          )}
        >
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl bg-white text-center"
          >
            <thead className="group sticky right-0 top-0 z-50 m-0 p-0 duration-300 [box-shadow:0_2px_0_#bcebeb]">
              <tr>
                <div
                  style={{
                    transform:
                      sortIndex !== 0
                        ? `translateX(-${sortIndicator.right}px)`
                        : '',
                    width: sortIndex !== 0 ? `${sortIndicator.width}px` : '',
                  }}
                  className={cn('duration-300', {
                    'absolute bottom-0 z-20 transition-transform':
                      sortIndex !== 0,
                    'transition group-hover/table:-right-2':
                      sortIndex !== 0 && canScrollVertical,
                    'group-hover/table:-right-0':
                      sortIndex !== 0 && canScrollVertical && isScrollAtStart,
                    'fixed right-[215px] top-[240px] z-10 w-fit':
                      sortIndex === 0,
                    'top-[157px]': sortIndex === 0 && !isHeaderVisible,
                  })}
                >
                  <div className="bg-brand-600 mx-auto h-1.5 w-16 rounded-t-[10px]"></div>
                </div>
                <th className="sticky right-[340px] z-30 mt-5 p-0">
                  {isScrollAtStart && (
                    <div className="hidden group-hover:block">
                      <Tooltip title="پیمایش به راست (D)">
                        <button
                          onMouseDown={startScrollLeft}
                          onMouseLeave={stopScroll}
                          className={cn(
                            'bg-brand-600 rounded-md p-1 text-white',
                          )}
                        >
                          <Icon name="arrow-right" size="lg" />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </th>
                {updateTableHeaders.map((header, index) => {
                  return (
                    <React.Fragment key={index}>
                      {index === 0 && (
                        <th
                          key={index}
                          className={cn(
                            'sticky right-0 top-0 z-20 m-0 h-[64px] w-[385px] border-b bg-[#E3F8F8] py-0 pr-2',
                            {
                              'group-hover/table:pr-0':
                                canScrollVertical && !isActiveDropdownPageCount,
                            },
                          )}
                        >
                          <div
                            className={cn({
                              'h-[75px] w-[385px] select-none bg-[#E3F8F8]':
                                header.column.getCanSort(),
                              'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]':
                                isScrollAtStart,
                            })}
                          >
                            <div className="mr-[75px] flex bg-[#E3F8F8]">
                              <div className="mr-24">
                                <FundsColumn
                                  activeSorticon={!!header.column.getIsSorted()}
                                  active={false}
                                  clickFilterd={() => {
                                    setSortIndex(0);
                                    header.column.toggleSorting(
                                      header.column.getIsSorted() === 'desc'
                                        ? false
                                        : true,
                                    );
                                  }}
                                  size="medium"
                                  shadow={false}
                                  type={
                                    header.column.getIsSorted() === 'asc'
                                      ? 'active-asc'
                                      : header.column.getIsSorted() === 'desc'
                                        ? 'inactive'
                                        : 'inactive'
                                  }
                                  filterable={columnFilters.some(
                                    (filterItem) => filterItem.id === header.id,
                                  )}
                                  title={String(
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    ),
                                  )}
                                  sortType={'alphabetical'}
                                />
                              </div>
                            </div>

                            <div className="absolute top-[25px] flex items-center gap-2 pr-[24px]">
                              <Tooltip title="انتخاب ستون‌ها">
                                <div
                                  onClick={() => {
                                    setIsSettingModal(true);
                                  }}
                                  className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                >
                                  {isChanged && (
                                    <div className="absolute -right-1 -top-1 box-content h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-600"></div>
                                  )}
                                  <Icon size="lg" name="settings" />
                                </div>
                              </Tooltip>
                              <Tooltip title="فیلتر صندوق‌ها">
                                <div
                                  onClick={() => {
                                    setIsFilterModal(true);
                                  }}
                                  className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                >
                                  {(Object.entries(selectedFilters).length >
                                    0 ||
                                    fundSearchQuery) && (
                                    <div className="absolute -right-1 -top-1 z-30 box-content h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-600"></div>
                                  )}
                                  <Icon size="lg" name="filter" />
                                </div>
                              </Tooltip>
                            </div>
                          </div>
                        </th>
                      )}
                      {index >= 1 && (
                        <th
                          ref={(el) => {
                            if (headerRefs?.current) {
                              headerRefs.current[index] = el;
                            }
                          }}
                          className={cn(
                            'm-0 h-[64px] w-full text-nowrap bg-[#E3F8F8] pr-4 text-sm font-medium',
                            {
                              'pr-0': isScrollAtStart,
                            },
                            String(
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              ),
                            ).length > 10
                              ? 'w-[200px]'
                              : 'w-36',
                            {
                              'group-hover/table:pr-0':
                                canScrollVertical &&
                                !isActiveDropdownPageCount &&
                                !isScrollAtStart,
                            },
                            '6xl:w-full',
                          )}
                          key={index}
                          colSpan={header.colSpan}
                        >
                          {index >= 2 && header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer h-[75px] flex justify-center select-none'
                                  : '',
                              }}
                            >
                              <FundsColumn
                                active={false}
                                defaultSort={() => {
                                  updateTableHeaders[0].column.getToggleSortingHandler()?.(
                                    new Event('click'),
                                  );
                                  setSortIndex(0);
                                }}
                                clickFilterd={() => {
                                  setSortIndex(index);
                                  header.column.getToggleSortingHandler()?.(
                                    new Event('click'),
                                  );
                                }}
                                size={
                                  String(
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    ),
                                  ).length > 10
                                    ? 'large'
                                    : 'medium'
                                }
                                type={
                                  header.column.getIsSorted() === 'asc'
                                    ? 'active-desc'
                                    : header.column.getIsSorted() === 'desc'
                                      ? 'active-asc'
                                      : 'inactive'
                                }
                                filterable={false}
                                subTitle={header.column.parent?.id}
                                title={String(
                                  flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  ),
                                )}
                                sortType={
                                  (
                                    columns[index]?.meta as {
                                      type?: string;
                                    }
                                  )?.type === 'text'
                                    ? 'alphabetical'
                                    : 'ranked'
                                }
                              />
                            </div>
                          )}
                        </th>
                      )}
                    </React.Fragment>
                  );
                })}
                <div className="fixed left-[35px] m-0 mt-5">
                  {isScrollAtEnd && (
                    <div
                      onMouseDown={startScrollRight}
                      onMouseLeave={stopScroll}
                      className={cn('hidden group-hover:block')}
                    >
                      <Tooltip position="bottom" title="پیمایش به چپ (A)">
                        <button
                          className={cn(
                            'bg-brand-600 rounded-md p-1 text-white',
                          )}
                        >
                          <Icon name="arrow-left" size="lg" />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </div>
              </tr>
            </thead>
            <tbody className="relative w-full overflow-hidden">
              {(() => {
                const isMainTab = indexCategoryTab === 0;
                const allRows = table.getRowModel().rows;
                const pinnedIds = isMainTab
                  ? allRows.filter((r) => r.getIsPinned()).map((r) => r.id)
                  : pineWatchLis;

                const filteredRows = isMainTab
                  ? allRows
                  : allRows.filter((row) => watchList.includes(row.id));

                const pinnedRows = filteredRows.filter((row) =>
                  pinnedIds.includes(row.id),
                );
                const otherRows = filteredRows.filter(
                  (row) => !pinnedIds.includes(row.id),
                );

                const rowsToRender = [...pinnedRows, ...otherRows];

                if (rowsToRender.length === 0) {
                  return (
                    <tr className="fixed right-[calc(50%-150px)] mt-5 w-full text-gray-600">
                      <td className="text-sm">
                        {isMainTab
                          ? 'صندوقی یافت نشد! لطفا فیلتر‌ها را بازنشانی کنید.'
                          : watchList.length === 0
                            ? 'صندوقی در دیده بان وجود ندارد.'
                            : 'صندوقی یافت نشد! لطفا فیلتر ها را بازنشانی کنید.'}
                      </td>
                    </tr>
                  );
                }

                return rowsToRender.map((row, rowIndex) => {
                  const isPinned = pinnedIds.includes(row.id);

                  return (
                    <>
                      <tr
                        key={row.id}
                        className={cn(
                          'group h-[48px] w-full border-b border-[#E1E2E5]',
                          {
                            'bg-blue-50 group-hover:bg-[#4991e9]': isPinned,
                          },
                        )}
                      >
                        <td></td>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <React.Fragment key={cell.id}>
                              {index === 0 && (
                                <td className="sticky right-0 top-0 z-40 m-0 flex items-center bg-white py-0">
                                  <div
                                    className={cn(
                                      'absolute right-2 z-50 pr-0',
                                      {
                                        'group-hover/table:right-0':
                                          canScrollVertical &&
                                          !isActiveDropdownPageCount,
                                      },
                                    )}
                                  >
                                    <Bookmark
                                      selectedColor={
                                        rowMarks[indexCategoryTab]?.[row.id] ||
                                        ''
                                      }
                                      onColorChange={(color) =>
                                        handleColorChange(row.id, color)
                                      }
                                    />
                                  </div>
                                  <div
                                    className={cn(
                                      'bg-white pr-2 group-hover:bg-blue-50',
                                      {
                                        'group-hover/table:pr-0':
                                          canScrollVertical &&
                                          !isActiveDropdownPageCount,
                                        'bg-blue-50 group-hover:bg-blue-100':
                                          isPinned,
                                      },
                                    )}
                                  >
                                    <FundsTableRow
                                      tag={!isMainTab}
                                      category={
                                        isMainTab
                                          ? watchList.includes(row.id)
                                            ? 'watchlist'
                                            : 'stocks'
                                          : 'watchlist'
                                      }
                                      canPin={pinnedRows.length <= 2}
                                      toggleWatchList={() =>
                                        toggleWatchList({ id: row.id })
                                      }
                                      pinedFunction={() =>
                                        isMainTab
                                          ? row.pin('top', true)
                                          : setPineWatchList([
                                              ...pineWatchLis,
                                              row.id,
                                            ])
                                      }
                                      unPinedFunction={() =>
                                        isMainTab
                                          ? row.pin(false)
                                          : setPineWatchList((prev) =>
                                              prev.filter(
                                                (id) => id !== row.id,
                                              ),
                                            )
                                      }
                                      isScrolled={isScrollAtStart}
                                      investmentMethod={
                                        row.original.investmentMethod
                                      }
                                      name={row.original.nameFund}
                                      pined={isPinned}
                                      selected={false}
                                      logo={row.original.logo}
                                    />
                                  </div>
                                </td>
                              )}
                              {index >= 1 && (
                                <td
                                  className={cn(
                                    'border-b border-[#E1E2E5] py-0 text-sm font-medium',
                                    {
                                      'pr-4': !isScrollAtStart,
                                    },
                                    {
                                      'group-hover/table:pr-0':
                                        canScrollVertical &&
                                        !isActiveDropdownPageCount &&
                                        !isScrollAtStart,
                                      'bg-blue-50 group-hover:bg-blue-100':
                                        isPinned,
                                      'group-hover:bg-blue-50': !isPinned,
                                    },
                                  )}
                                >
                                  {formatNumber(cell.getValue() as string, {
                                    commaSeparated: true,
                                  })}
                                </td>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                      {rowIndex === rowsToRender.length - 1 && (
                        <div className="sticky right-0 mb-2 mt-5 w-screen whitespace-nowrap text-sm text-gray-600">
                          {formatNumber(
                            table.getState().pagination.pageSize *
                              (table.getState().pagination.pageIndex + 1),
                            { commaSeparated: true },
                          ) ===
                            formatNumber(
                              table.getPageCount() *
                                table.getState().pagination.pageSize,
                              { commaSeparated: true },
                            ) && 'پایان لیست صندوق ها.'}
                        </div>
                      )}
                    </>
                  );
                });
              })()}
              <tr className="h-16">
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="bg-coloropacity-surface-accent-gray-400-55per fixed bottom-6 right-12 z-50 rounded-md backdrop-blur-[30px]">
        <OptionsDropdown
          className="-mt-2"
          onChange={(e) => {
            startTransition(() => {
              table.setPageSize(Number(e));
            });
          }}
          dropDownStyles={{
            bg: 'primary',
            emphasize: 'medium',
            size: 'md',
            anchor: 'top end',
            checkSelected: true,
          }}
          customTriggerRender={({ isActive }) => {
            setIsActiveDropdownPageCount(isActive);
            return (
              <div className="flex h-[40px] items-center gap-2 pl-2 pr-3 text-xs font-medium">
                <div className="flex gap-1">
                  <span>تعداد سطر در جدول: </span>
                  {formatNumber(
                    table.getState().pagination.pageSize *
                      (table.getState().pagination.pageIndex + 1),
                    { commaSeparated: true },
                  )}
                </div>
                <div
                  className={cn('transition-transform duration-300', {
                    'rotate-180': isActive,
                    'rotate-0': !isActive,
                  })}
                >
                  <Icon size="lg" name="chevron-down" />
                </div>
              </div>
            );
          }}
          customOptionRender={(prop) => (
            <div
              className={cn(
                'bg-coloropacity-surface-accent-gray-400-55per w-full cursor-pointer px-3 pt-2 text-center text-xs font-medium text-[#06080F]',
                {
                  'pb-2':
                    table.getState().pagination.pageSize *
                      (table.getState().pagination.pageIndex + 1) *
                      table.getPageCount() ===
                    +prop.text,
                },
              )}
            >
              <span>
                {table.getState().pagination.pageSize *
                  (table.getState().pagination.pageIndex + 1) *
                  table.getPageCount() ===
                +prop.text
                  ? 'همه'
                  : prop.text}
              </span>
            </div>
          )}
          dropDownList={[
            { text: '10' },
            { text: '25' },
            { text: '50' },
            { text: '100' },
            {
              text: String(
                table.getState().pagination.pageSize *
                  (table.getState().pagination.pageIndex + 1) *
                  table.getPageCount(),
              ),
            },
          ]}
        />
      </div>
      <span className="text-text-onaccent-neutral-primary-onbelow600 bg-coloropacity-surface-accent-gray-400-55per fixed bottom-6 right-[50%] z-50 flex h-[40px] translate-x-[50%] gap-2 rounded-md px-3 py-2 text-xs font-medium backdrop-blur-[30px]">
        مجموعه ارزش خالص دارایی‌ها:
        <span className="border-text-onaccent-neutral-primary-onbelow600 border-b text-sm">
          10,986,249.09
        </span>
      </span>
      <div className="bg-coloropacity-surface-accent-gray-400-55per fixed bottom-6 left-12 z-50 flex h-[40px] items-center gap-2 rounded-md px-3 py-2 backdrop-blur-[30px]">
        <span className="text-text-onaccent-neutral-primary-onbelow600 flex items-center gap-1 text-xs font-medium">
          <div>
            {formatNumber(
              table.getState().pagination.pageSize *
                (table.getState().pagination.pageIndex + 1),
              { commaSeparated: true },
            )}
            -
            {table.getState().pagination.pageSize *
              table.getState().pagination.pageIndex +
              1}
          </div>
          از
          {formatNumber(
            table.getPageCount() * table.getState().pagination.pageSize,
            { commaSeparated: true },
          )}
          <span className="px-[1px]">صندوق</span>
        </span>
        <button
          className={cn('cursor-pointer rounded', {
            'text-icon-neutral-disable cursor-default':
              table.getState().pagination.pageIndex + 1 === 1,
          })}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon size="lg" name="chevron-right" />
        </button>
        <button
          className={cn('cursor-pointer rounded', {
            'text-icon-neutral-disable cursor-default': !table.getCanNextPage(),
          })}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon size="lg" name="chevron-left" />
        </button>
      </div>

      <Dialog
        className="min-w-[570px] p-0"
        onClose={() => setIsSettingModal(false)}
        isOpen={isSettingModal}
      >
        <div dir="rtl" className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span className="text-text-neutral-primary p-6 text-xl font-medium">
              انتخاب ستون‌ها
              <span
                className={cn('pr-0.5', {
                  'text-text-message-error-primary-600':
                    table
                      .getAllLeafColumns()
                      .filter((col) => col.getIsVisible()).length === 25,
                })}
              >
                (
                {
                  table.getAllLeafColumns().filter((col) => col.getIsVisible())
                    .length
                }
                /25)
              </span>
            </span>
          </div>
          {isChanged && (
            <span
              className="text-button-error-label-plain-default m-6 cursor-pointer text-base font-medium"
              onClick={() => table.resetColumnVisibility()}
            >
              بازنشانی به پیشفرض
            </span>
          )}
        </div>

        <div className="bg-border-neutral-primary h-[2px] w-full"></div>
        <div
          dir="rtl"
          className="scrollbar-md mb-6 h-[550px] overflow-x-hidden overflow-y-scroll"
        >
          {table.getAllColumns().map((item, index) => {
            if (index === 0) return null;
            return (
              <div className="my-6 text-right" key={index}>
                <span className="mb-4 mr-4 text-right text-base font-semibold">
                  {item.columnDef.header?.toString()}
                </span>
                <div className="grid grid-cols-2 px-4 pb-6">
                  {item.columns.map((item, index) => (
                    <div
                      className="hover:bg-surface-brand-100 rounded-md p-3"
                      key={index}
                    >
                      {item && (
                        <Checkbox
                          onChange={() => {
                            if (
                              item.columnDef.header?.toString() ===
                              'بازه دلخواه'
                            ) {
                              setCustomColl({ active: true, date: '' });
                            }
                            if (
                              table
                                .getAllLeafColumns()
                                .filter((col) => col.getIsVisible()).length ===
                              25
                            ) {
                              if (item.getIsVisible())
                                item.toggleVisibility(!item.getIsVisible());
                            } else if (
                              table
                                .getAllLeafColumns()
                                .filter((col) => col.getIsVisible()).length ===
                              7
                            ) {
                              if (!item.getIsVisible())
                                item.toggleVisibility(!item.getIsVisible());
                            } else {
                              item.toggleVisibility(!item.getIsVisible());
                            }
                          }}
                          content={item.columnDef.header?.toString()}
                          checked={item.getIsVisible()}
                        />
                      )}
                    </div>
                  ))}
                </div>
                {index + 1 < table.getAllColumns().length && <hr />}
              </div>
            );
          })}
        </div>
      </Dialog>
      <Dialog
        className="h-[696px] w-[416px] p-0"
        onClose={() => setIsFilterModal(false)}
        isOpen={isFilterModal}
      >
        <div className="scrollbar-md bg-surface-neutral-primary mb-4 w-full overflow-x-hidden rounded-3xl text-right">
          <FilterPopUpSection
            searchValue={fundSearchQuery}
            onSearchChange={setFundSearchQuery}
            filterOptions={filterList}
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
          />
        </div>
      </Dialog>
      <Dialog
        isOpen={customColl.active}
        className="bg-gray-100 p-0"
        onClose={() => setCustomColl({ active: false, date: '' })}
      >
        <DatePicker
          dateRange={{ end: '1404-12-12', start: '1300-01-12' }}
          max="1404-12-12"
          min="1300-01-12"
          setDateRange={() => {
            setCustomColl({ active: false, date: 'date' });
          }}
        ></DatePicker>
      </Dialog>
      <Toaster
        position="bottom-center"
        containerStyle={{
          bottom: 70,
        }}
      />
    </div>
  );
};

export default Funds;
