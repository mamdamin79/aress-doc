'use client';
import React, {
  startTransition,
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
const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState(() => makeData(500));
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [isScrollTop, setIsScrollTop] = useState(false);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [pineWatchLis, setPineWatchList] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const [customColl, setCustomColl] = useState<{
    active: boolean;
    date: string;
  }>({ active: false, date: '' });

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

  const handlerKeyboardScroll = useCallback(
    (right: boolean) => {
      if (tableRef.current) {
        tableRef.current.scrollLeft += right ? 200 : -200;
      }
    },
    [tableRef] // ensure tableRef is properly stable or use a ref that doesn't change
  );

  const toggleWatchList = (fund: { id: string }) => {
    setWatchList((prev) =>
      prev.includes(fund.id)
        ? prev.filter((id: string) => id !== fund.id)
        : [...prev, fund.id]
    );
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        // Update scroll start state
        if (Math.round(scrollLeft) === 0) {
          setIsScrollAtStart(false);
        } else if (scrollLeft < 0) {
          setIsScrollAtStart(true);
        }
        // Update scroll end state; logic preserved from original code
        setIsScrollAtEnd(Math.round(scrollLeft * -1) + clientWidth <= scrollWidth - 1);
      }
    };

    // Register scroll event listener on the table element
    const tableElem = tableRef.current;
    tableElem?.addEventListener('scroll', handleScroll);

    // Keyboard handler for scrolling (horizontal and vertical)
    const keyboardHandler = (e: KeyboardEvent) => {

      if (e.code === 'KeyA') {
        handlerKeyboardScroll(false);
      }
      if (e.code === 'KeyD') {
        handlerKeyboardScroll(true);
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
    }

    document.addEventListener('keypress', keyboardHandler);
    document.addEventListener('keydown', keyboardArrow);

    // Cleanup: remove event listeners when component unmounts or dependencies change
    return () => {
      tableElem?.removeEventListener('scroll', handleScroll);
      document.removeEventListener('keypress', keyboardHandler);
      document.removeEventListener('keydown', keyboardArrow);
    };
  }, [tableRef, handlerKeyboardScroll]);



  useEffect(() => {
    startTransition(() => {
      updateTableHeaders[0].column.setFilterValue(fundSearchQuery);
    });
  }, [fundSearchQuery, updateTableHeaders]);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
  }, [customColl.active]);

  const handlerScroll = () => {
    if (tableRef.current) {
      if (tableRef.current.scrollTop) {
        setIsScrollTop(true);
      } else setIsScrollTop(false);
    }
  };
  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between bg-white px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="flex w-full items-center justify-start gap-3">
          <span className="pb-2.5">دسته‌بندی صندوق‌ها:</span>
          <Tabs
            variant="shaped"
            onClickTab={(e) => setIndexCategoryTab(e)}
            activeTab={indexCategoryTab}
            colorMode="neutral"
            tabs={[
              { title: 'سهامی', tag: 'green', id: '1' },
              { title: 'دیده بان', id: '2' },
            ]}
          />
        </div>
        <Tooltip title="خروجی اکسل">
          <div className="border-brand-600 cursor-pointer rounded-md border p-1.5">
            <ExportExel />
          </div>
        </Tooltip>
      </div>
      <div
        dir="ltr"
        className={cn('relative top-0 flex items-center overflow-hidden')}
      >
        <div
          ref={tableRef}
          onScroll={handlerScroll}
          className="scrollbar-md table-scroll h-[calc(100vh-170px)] w-screen overflow-auto scroll-smooth"
        >
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl bg-white text-center"
          >
            <thead
              className={cn(
                'shadow-brand-200b group sticky right-0 top-0 z-50 m-0 border-none p-0 duration-300 [box-shadow:0_2px_0_#bcebeb]',
              )}
            >
              <tr className="rounded-md p-0">
                <th className="sticky right-[270px] z-50 mt-5 p-0">
                  {isScrollAtStart && (
                    <div className="hidden group-hover:block">
                      <Tooltip title="پیمایش به راست (D)">
                        <button
                          onClick={() => handlerKeyboardScroll(true)}
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
                            'sticky right-0 top-0 z-40 m-0 w-[312px] p-0',
                            isScrollAtStart ? 'shadow' : 'shadow-none',
                          )}
                        >
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? 'cursor-pointer h-[75px] select-none'
                                : '',
                            }}
                          >
                            <OptionsDropdown
                              dropDownStyles={{
                                size: 'md',
                                anchor: 'bottom',
                                bg: 'primary',
                                emphasize: 'medium',
                                checkSelected: true,
                              }}
                              customOptionRender={(prop) => (
                                <div
                                  onClick={() => {
                                    if (
                                      prop.text === 'مرتب سازی (ی-الف)' &&
                                      header.column.getIsSorted() !== 'desc'
                                    ) {
                                      header.column.toggleSorting(true);
                                    }
                                    if (
                                      prop.text === 'مرتب سازی (الف-ی)' &&
                                      header.column.getIsSorted() !== 'asc'
                                    ) {
                                      header.column.toggleSorting(false);
                                    }
                                  }}
                                  className={cn(
                                    'hover:bg-brand-50 hover:text-brand-800 flex cursor-pointer items-center gap-2 overflow-y-hidden bg-white p-2',
                                    {
                                      'text-brand-800':
                                        (header.column.getIsSorted() ===
                                          'desc' &&
                                          prop.text === 'مرتب سازی نزولی') ||
                                        (header.column.getIsSorted() ===
                                          'asc' &&
                                          prop.text === 'مرتب سازی صعودی'),
                                    },
                                  )}
                                >
                                  {prop.icon?.name && (
                                    <Icon
                                      name={prop.icon?.name}
                                      size={prop.icon?.size}
                                    />
                                  )}
                                  {prop.text}
                                </div>
                              )}
                              customTriggerRender={({ isActive }) => (
                                <div className="rounde w-full">
                                  <FundsColumn
                                    active={isActive}
                                    filtered={!!header.column.getIsSorted()}
                                    clickFilterd={() =>
                                      header.column.getToggleSortingHandler()?.(
                                        new Event('click'),
                                      )
                                    }
                                    size="extraLarg"
                                    shadow={isScrollAtStart}
                                    type={
                                      header.column.getIsSorted() === 'asc'
                                        ? 'active-desc'
                                        : header.column.getIsSorted() === 'desc'
                                          ? 'active-asc'
                                          : 'inactive'
                                    }
                                    filterable={columnFilters.some(
                                      (filterItem) =>
                                        filterItem.id === header.id,
                                    )}
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
                                  <div className="absolute top-5 flex items-center gap-2 pr-4">
                                    <Tooltip title="انتخاب ستون‌ها">
                                      <div
                                        onClick={(e) => {
                                          e.stopPropagation();
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
                                        onClick={(e) => {
                                          setIsFilterModal(true);
                                          e.stopPropagation();
                                        }}
                                        className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                      >
                                        {(Object.entries(selectedFilters)
                                          .length > 0 ||
                                          fundSearchQuery) && (
                                            <div className="absolute -right-1 -top-1 z-30 box-content h-2.5 w-2.5 rounded-full border-2 border-white bg-pink-600"></div>
                                          )}
                                        <Icon size="lg" name="filter" />
                                      </div>
                                    </Tooltip>
                                  </div>
                                </div>
                              )}
                              dropDownList={[
                                {
                                  text: 'مرتب سازی (الف-ی)',
                                  icon: {
                                    name: 'arrow-down-a-z',
                                    size: 'md',
                                  },
                                },
                                {
                                  text: 'مرتب سازی (ی-الف)',
                                  icon: {
                                    name: 'arrow-up-z-a',
                                    size: 'md',
                                  },
                                },
                              ]}
                            />
                          </div>
                        </th>
                      )}
                      {index >= 1 && (
                        <th
                          className={cn(
                            'm-0 p-0 text-sm font-medium',
                            String(
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              ),
                            ).length > 10
                              ? 'w-[200px]'
                              : 'w-36',
                          )}
                          key={index}
                          colSpan={header.colSpan}
                        >
                          {index >= 2 && header.isPlaceholder ? null : (
                            <div
                              {...{
                                className: header.column.getCanSort()
                                  ? 'cursor-pointer h-[75px] select-none'
                                  : '',
                              }}
                            >
                              <OptionsDropdown
                                className="z-50"
                                dropDownStyles={{
                                  size: 'md',
                                  anchor: 'bottom',
                                  bg: 'primary',
                                  emphasize: 'medium',
                                  checkSelected: true,
                                }}
                                customOptionRender={(prop) => (
                                  <>
                                    <div
                                      onClick={() => {
                                        if (prop.text === 'انتقال به راست') {
                                          moveColumn(header.column.id, 'right');
                                        }
                                        if (prop.text === 'انتقال به چپ') {
                                          moveColumn(header.column.id, 'left');
                                        }
                                        if (prop.text === 'انتقال به ابتدا') {
                                          moveColumn(header.column.id, 'start');
                                        }
                                        if (prop.text === 'انتقال به انتها') {
                                          moveColumn(header.column.id, 'end');
                                        }
                                        if (prop.text === 'مرتب سازی نزولی') {
                                          if (header.column.getIsSorted() !== 'desc') {
                                            header.column.toggleSorting(true); // force to 'desc'
                                          }
                                        }
                                        if (prop.text === 'مرتب سازی صعودی') {
                                          if (header.column.getIsSorted() !== 'asc') {
                                            header.column.toggleSorting(false); // force to 'asc'
                                          }
                                        }
                                      }}
                                      className={cn(
                                        'hover:bg-brand-50 hover:text-brand-800 flex cursor-pointer items-center gap-2 bg-white p-2',
                                        {
                                          'pointer-events-none cursor-default text-[#B3B6BD] hover:bg-white hover:text-[#B3B6BD]':
                                            (index === 1 &&
                                              (prop.text ===
                                                'انتقال به ابتدا' ||
                                                prop.text ===
                                                'انتقال به راست')) ||
                                            (index + 1 ===
                                              updateTableHeaders.length &&
                                              (prop.text ===
                                                'انتقال به انتها' ||
                                                prop.text === 'انتقال به چپ')),
                                          'text-brand-800':
                                            (header.column.getIsSorted() ===
                                              'desc' &&
                                              prop.text ===
                                              'مرتب سازی نزولی') ||
                                            (header.column.getIsSorted() ===
                                              'asc' &&
                                              prop.text === 'مرتب سازی صعودی'),
                                        },
                                      )}
                                    >
                                      {prop.icon?.name && (
                                        <Icon
                                          name={prop.icon?.name}
                                          size={prop.icon?.size}
                                        />
                                      )}
                                      {prop.text}
                                    </div>
                                    {prop.text === 'مرتب سازی صعودی' && <hr />}
                                  </>
                                )}
                                customTriggerRender={({ isActive }) => (
                                  <div className="w-full">
                                    <FundsColumn
                                      active={isActive}
                                      filtered={!!header.column.getIsSorted()}
                                      clickFilterd={() =>
                                        header.column.getToggleSortingHandler()?.(
                                          new Event('click'),
                                        )
                                      }
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
                                          : header.column.getIsSorted() ===
                                            'desc'
                                            ? 'active-asc'
                                            : 'inactive'
                                      }
                                      filterable={false}
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
                                    ></FundsColumn>
                                  </div>
                                )}
                                dropDownList={[
                                  {
                                    text: 'مرتب سازی نزولی',
                                    icon: {
                                      name: 'arrow-down-wide-narrow',
                                      size: 'md',
                                    },
                                  },
                                  {
                                    text: 'مرتب سازی صعودی',
                                    icon: {
                                      name: 'arrow-up-narrow-wide',
                                      size: 'md',
                                    },
                                  },
                                  {
                                    text: 'انتقال به راست',
                                    icon: {
                                      name: 'arrow-right',
                                      size: 'md',
                                    },
                                  },
                                  {
                                    text: 'انتقال به ابتدا',
                                    icon: {
                                      name: 'arrow-right-to-line',
                                      size: 'md',
                                    },
                                  },
                                  {
                                    text: 'انتقال به چپ',
                                    icon: {
                                      name: 'arrow-left',
                                      size: 'md',
                                    },
                                  },
                                  {
                                    text: 'انتقال به انتها',
                                    icon: {
                                      name: 'arrow-left-to-line',
                                      size: 'md',
                                    },
                                  },
                                ]}
                              ></OptionsDropdown>
                            </div>
                          )}
                        </th>
                      )}
                    </React.Fragment>
                  );
                })}
                <th className="sticky left-16 m-0 mt-5">
                  {isScrollAtEnd && (
                    <div
                      onClick={() => handlerKeyboardScroll(false)}
                      className={cn('hidden group-hover:block')}
                    >
                      <Tooltip title="پیمایش به چپ (A)">
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
                </th>
              </tr>
            </thead>
            <tbody className="relative w-full overflow-hidden rounded-b-md">
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
                const lastPinnedRowId = pinnedRows.at(-1)?.id;

                if (rowsToRender.length === 0) {
                  return (
                    <tr className="fixed right-[calc(50%-150px)] mt-5 w-full text-gray-600">
                      <td className="text-sm">
                        {isMainTab
                          ? 'صندوقی یافت نشد! لطفا فیلتر هارا بازنشانی کنید.'
                          : watchList.length === 0
                            ? 'صندوقی در دیده بان وجود ندارد.'
                            : 'صندوقی یافت نشد! لطفا فیلتر هارا بازنشانی کنید.'}
                      </td>
                    </tr>
                  );
                }

                return rowsToRender.map((row, rowIndex) => {
                  const isPinned = pinnedIds.includes(row.id);
                  const pinnedIndex = pinnedRows.findIndex(
                    (r) => r.id === row.id,
                  );
                  const topValue = isPinned
                    ? rowIndex === 1 ? `${(pinnedIndex + 1) * 72}px` : `${(pinnedIndex + 1) * 70}px`
                    : 'auto';
                  const isLastPinned = row.id === lastPinnedRowId;

                  return (
                    <>
                      <tr
                        key={row.id}
                        style={{ top: rowIndex > 0 ? topValue : '76px' }}
                        className={cn(
                          'group  h-[70px] border-t-2 border-blue-100',
                          isPinned && 'sticky z-50 top-2',
                          rowIndex === rowsToRender.length - 1 && 'border-b',
                          {
                            'shadow-2xl': isPinned && isLastPinned && isScrollTop,
                            '[box-shadow:0_1px_0_#bcebeb]': isPinned && !isScrollTop,
                            'group-hover:bg-blue-50': true,
                            'bg-blue-200': false,
                          },
                        )}
                      >
                        <td></td>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <React.Fragment key={cell.id}>
                              {index === 0 && (
                                <td className="sticky right-0 z-40 bg-white m-0 p-0">
                                  <FundsTableRow
                                    index={rowIndex}
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
                                          prev.filter((id) => id !== row.id),
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
                                </td>
                              )}
                              {index >= 1 && (
                                <td
                                  className={cn({
                                    'bg-blue-50 group-hover:bg-blue-100':
                                      isPinned,
                                    'group-hover:bg-blue-50': !isPinned,
                                  })}
                                >
                                  {flexRender(
                                    cell.column.columnDef.cell,
                                    cell.getContext(),
                                  )}
                                </td>

                              )}
                            </React.Fragment>
                          );
                        })}
                      </tr>
                      {
                        rowIndex === rowsToRender.length - 1 &&
                        <div className="mt-5 mb-2 w-screen sticky text-sm right-0 whitespace-nowrap text-gray-600">
                          {formatNumber(
                            table.getState().pagination.pageSize *
                            (table.getState().pagination.pageIndex + 1),
                            { commaSeparated: true },
                          ) === formatNumber(
                            table.getPageCount() * table.getState().pagination.pageSize,
                            { commaSeparated: true },
                          ) && 'پایان لیست صندوق ها.'}
                        </div>
                      }
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

      <div className="fixed z-50 bottom-6 right-0 mt-6 flex w-full justify-between px-8">
        <div className="rounded-md bg-[#B3B6BD8C] backdrop-blur-[30px]">
          <OptionsDropdown
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
            customTriggerRender={(prop) => (
              <div className="flex h-[40px] items-center gap-2 px-3 text-xs font-medium">
                <span>تعداد سطر در جدول: </span>
                {formatNumber(
                  table.getState().pagination.pageSize *
                  (table.getState().pagination.pageIndex + 1),
                  { commaSeparated: true },
                )}
                <Icon name={prop.isActive ? 'chevron-up' : 'chevron-down'} />
              </div>
            )}
            customOptionRender={(prop) => (
              <div className="text-gray-1000 w-full cursor-pointer bg-gray-400 px-3 text-center text-xs font-medium first:pt-2">
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

        <span className="flex h-[40px] gap-2 rounded-md bg-[#B3B6BD8C] px-3 py-2 text-xs font-medium backdrop-blur-[30px]">
          مجموعه ارزش خالص دارایی‌ها:
          <span className="border-b border-[#06080F] text-sm text-[#06080F]">
            10,986,249.09
          </span>
        </span>
        <div className="flex h-[40px] items-center gap-2 rounded-md bg-[#B3B6BD8C] px-3 py-2 backdrop-blur-[30px]">
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
      </div>

      <Dialog
        className="min-w-[570px] p-0"
        onClose={() => setIsSettingModal(false)}
        isOpen={isSettingModal}
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

        <div className='w-full h-[2px] bg-[#D1D3D7]'></div>
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
      <Dialog
        className="w-[416px] p-0 h-[696px]"
        onClose={() => setIsFilterModal(false)}
        isOpen={isFilterModal}
      >
        <div className="scrollbar-md mb-4 w-full overflow-x-hidden rounded-3xl bg-white text-right">
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
    </>
  );
};

export default Funds;
