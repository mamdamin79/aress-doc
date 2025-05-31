'use client';
import React, {
  startTransition,
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
const Funds = () => {
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const { isHeaderVisible, setIsHeaderVisible } = useHeaderVisibility();
  const [rowMarks, setRowMarks] = useState<{
    [tabIndex: number]: { [id: string]: string };
  }>({});
  const [canScrollVertical, setCanScrollVertical] = useState(false);
  const [activeIndexCategoryTab, setActiveIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data] = useState(() => makeData(500));
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [pinWatchLis, setPinWatchList] = useState<string[]>([]);
  const [isActiveDropdownPageCount, setIsActiveDropdownPageCount] =
    useState(false);
  const [activeFilters, setActiveFilters] = useState<
    Record<string, string[]>
  >({});
  const headerRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);
  const [sortIndicatorPosition, setSortIndicatorPosition] = useState({
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

  // Initialize the table with sorting, filtering, visibility, and pagination configs
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

  // Check if column visibility state has changed compared to initial
  const isChanged = useMemo(() => {
    return !Object.entries(table.getState().columnVisibility).every(
      ([key, value]) => columnVisibility[key] === value,
    );
  }, [table.getState().columnVisibility]);

  // Add or remove fund from the watchlist
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

  // Update table filter when fund search query changes
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

  // Check and set if vertical scroll is needed on table hover
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
  }, [activeIndexCategoryTab, tableCount]);

  // Update sort indicator position and size based on header and scroll state
  useEffect(() => {
    const node = headerRefs?.current[activeSortIndex];
    const container = tableRef?.current;

    if (node && container) {
      const nodeRect = node.getBoundingClientRect();
      const containerRect = container.getBoundingClientRect();

      let rightOffset = Math.round(containerRect.right - nodeRect.right);

      if (isScrollAtStart && tableRef.current && activeSortIndex !== 0) {
        rightOffset += tableRef?.current?.scrollLeft * -1;
      }

      setSortIndicatorPosition({
        right: rightOffset,
        width: node.offsetWidth,
      });
    }
  }, [isScrollAtStart, activeSortIndex]);

  const handleColorChange = (id: string, color: string) => {
    setRowMarks((prev) => ({
      ...prev,
      [activeIndexCategoryTab]: {
        ...(prev[activeIndexCategoryTab] || {}),
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
    <>
      {/* Header with category tabs and Excel export button */}
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between bg-white px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <Tabs
          variant="shaped-color"
          onClickTab={(e) => setActiveIndexCategoryTab(e)}
          activeTab={activeIndexCategoryTab}
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
      {/* Container div wrapping the data table */}
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
                      activeSortIndex !== 0
                        ? `translateX(-${sortIndicatorPosition.right}px)`
                        : '',
                    width: activeSortIndex !== 0 ? `${sortIndicatorPosition.width}px` : '',
                  }}
                  className={cn('duration-300', {
                    'absolute bottom-0 z-20 transition-transform':
                      activeSortIndex !== 0,
                    'transition group-hover/table:-right-2':
                      activeSortIndex !== 0 && canScrollVertical,
                    'group-hover/table:-right-0':
                      activeSortIndex !== 0 && canScrollVertical && isScrollAtStart,
                    'fixed right-[215px] top-[240px] z-10 w-fit':
                      activeSortIndex === 0,
                    'top-[157px]': activeSortIndex === 0 && !isHeaderVisible,
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
                                    setActiveSortIndex(0);
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
                                    setIsSettingModalOpen(true);
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
                                    setIsFilterModalOpen(true);
                                  }}
                                  className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                >
                                  {(Object.entries(activeFilters).length >
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
                                  setActiveSortIndex(0);
                                }}
                                clickFilterd={() => {
                                  setActiveSortIndex(index);
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
                const isMainTab = activeIndexCategoryTab === 0;
                const allRows = table.getRowModel().rows;
                const pinnedIds = isMainTab
                  ? allRows.filter((r) => r.getIsPinned()).map((r) => r.id)
                  : pinWatchLis;

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
                                        rowMarks[activeIndexCategoryTab]?.[row.id] ||
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
                                          : setPinWatchList([
                                              ...pinWatchLis,
                                              row.id,
                                            ])
                                      }
                                      unPinedFunction={() =>
                                        isMainTab
                                          ? row.pin(false)
                                          : setPinWatchList((prev) =>
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

      {/* Dropdown to select the number of rows per page */}
      <div className="fixed bottom-6 right-12 z-50 rounded-md bg-[#B3B6BD8C] backdrop-blur-[30px]">
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
                'w-full cursor-pointer bg-[#B3B6BD8C] px-3 pt-2 text-center text-xs font-medium text-[#06080F]',
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
      {/* Display total net asset value */}
      <span className="fixed bottom-6 right-[50%] z-50 flex h-[40px] translate-x-[50%] gap-2 rounded-md bg-[#B3B6BD8C] px-3 py-2 text-xs font-medium backdrop-blur-[30px]">
        مجموعه ارزش خالص دارایی‌ها:
        <span className="border-b border-[#06080F] text-sm text-[#06080F]">
          10,986,249.09
        </span>
      </span>
      {/* Pagination controls: current range and navigation buttons */}
      <div className="fixed bottom-6 left-12 z-50 flex h-[40px] items-center gap-2 rounded-md bg-[#B3B6BD8C] px-3 py-2 backdrop-blur-[30px]">
        <span className="text-gray-1000 flex items-center gap-1 text-xs font-medium">
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
            'cursor-default text-[#B3B6BD]':
              table.getState().pagination.pageIndex + 1 === 1,
          })}
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          <Icon size="lg" name="chevron-right" />
        </button>
        <button
          className={cn('cursor-pointer rounded', {
            'cursor-default text-[#B3B6BD]': !table.getCanNextPage(),
          })}
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          <Icon size="lg" name="chevron-left" />
        </button>
      </div>

      {/* settign modal */}
      <Dialog
        className="min-w-[570px] p-0"
        onClose={() => setIsSettingModalOpen(false)}
        isOpen={isSettingModalOpen}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span
              className={cn('p-6 text-xl font-medium', {
                'text-red-600':
                  table.getAllLeafColumns().filter((col) => col.getIsVisible())
                    .length === 25,
              })}
            >
              انتخاب ستون‌ها (
              {
                table.getAllLeafColumns().filter((col) => col.getIsVisible())
                  .length
              }
              /25)
            </span>
          </div>
          {isChanged && (
            <span
              className="m-6 cursor-pointer text-base font-medium text-red-600"
              onClick={() => table.resetColumnVisibility()}
            >
              بازنشانی به پیشفرض
            </span>
          )}
        </div>

        <div className="h-[2px] w-full bg-[#D1D3D7]"></div>
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
                      className="hover:bg-brand-100 rounded-md p-3"
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
      {/* fillter modal */}
      <Dialog
        className="h-[696px] w-[416px] p-0"
        onClose={() => setIsFilterModalOpen(false)}
        isOpen={isFilterModalOpen}
      >
        <div className="scrollbar-md mb-4 w-full overflow-x-hidden rounded-3xl bg-white text-right">
          <FilterPopUpSection
            searchValue={fundSearchQuery}
            onSearchChange={setFundSearchQuery}
            filterOptions={filterList}
            selectedFilters={activeFilters}
            onFilterChange={setActiveFilters}
          />
        </div>
      </Dialog>
      {/* datepicker modal */}
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
    </>
  );
};

export default Funds;
