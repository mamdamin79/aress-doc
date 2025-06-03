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
                    'fixed right-[215px] top-[240px] z-10 w-fit': sortIndex === 0,
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
                            'sticky right-0 top-0 z-20 m-0 h-[64px] w-[385px] bg-[#E3F8F8] border-b py-0 pr-2',
                            {
                              'group-hover/table:pr-0':
                                canScrollVertical && !isActiveDropdownPageCount,
                            },
                          )}
                        >
                          <div
                            className={cn({
                              'w-[385px] h-[75px] bg-[#E3F8F8] select-none': header.column.getCanSort(),
                              'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]': isScrollAtStart
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
                                      header.column.getIsSorted() ===
                                        'desc'
                                        ? false
                                        : true,
                                    );
                                  }}
                                  size="medium"
                                  shadow={false}
                                  type={
                                    header.column.getIsSorted() === 'asc'
                                      ? 'active-asc'
                                      : header.column.getIsSorted() ===
                                        'desc'
                                        ? 'inactive'
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
                            'm-0 h-[64px] w-full bg-[#E3F8F8] pr-4 text-nowrap text-sm font-medium',
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
                            '6xl:w-full'
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
                      <Tooltip position='bottom' title="پیمایش به چپ (A)">
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
          </table>
        </div>
      </div>

    </>
  );
};

export default Funds;