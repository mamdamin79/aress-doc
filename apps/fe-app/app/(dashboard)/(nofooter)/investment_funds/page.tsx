'use client';
import React, {
  RefObject,
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Toaster } from 'react-hot-toast';
import { useHeaderVisibility } from '@shared';
// needed for table body level scope DnD setup
import {
  DndContext,
  closestCenter,
  type DragEndEvent,
  DragOverlay,
} from '@dnd-kit/core';
import { restrictToHorizontalAxis } from '@dnd-kit/modifiers';
import {
  arrayMove,
  SortableContext,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  cn,
  Icon,
  Tabs,
  DatePicker,
  Tooltip,
  formatNumber,
  OptionsDropdown,
  FilterPopUpSection,
  FundsColumnHeader,
  Dialog,
  Checkbox,
  FundsTag,
  FundsTagProps,
} from 'design-system';
import {
  ColumnDef,
  Header,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { useHotkeys } from 'react-hotkeys-hook';
import { useSortable } from '@dnd-kit/sortable';
import { columnVisibility, filterList } from './FundsTable.constants';
import { ExportExcel } from './_components/ExportExcel';
import { useSmartTableScroll } from '@shared';
import { TableBody } from './_components/TableBody';
import { Person } from './types';
import {
  useDragIndicator,
  useTableDragSensors,
} from './utils/investmentFunds.utils';
import {
  FundsService,
  FundsTableItemApiModel,
  FundTableItemInfoApiModel,
  FundTableTabColumnDto,
  useFundsServiceGetFundsTable,
  useFundsServicePostFundsTableTabByTabColumn,
  useFundsServicePostFundsTableTabByTabColumns,
  useFundsServicePostFundsTableTabByTabSort,
} from '@openapi';
import { TabsSkeleton } from './_components/skeletons/TabsSkeleton';
import { RowSkeleton } from './_components/skeletons/RowSkeleton';
import { HeaderTableSkeleton } from './_components/skeletons/HeaderTableSkeleton';
import { ExcelSkeleton } from './_components/skeletons/ExcelSkeleton';
import { useMutation } from '@tanstack/react-query';
const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [activeIndexCategoryTab, setActiveIndexCategoryTab] = useState(1);
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [localColumns, setLocalColumns] = useState<FundTableTabColumnDto[]>([]);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [pinnedList, setPinnedList] = useState<number[]>([]);
  const [rowsMark, setRowsMark] = useState<{ color: string; id: number }[]>([]);
  const [watchList, setWatchList] = useState<FundsTableItemApiModel[]>([]);
  const [sorting, setSorting] = useState<SortingState>([]);
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const headerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sortIndicatorPosition, setSortIndicatorPosition] = useState({
    right: headerRefs.current[0]?.offsetLeft,
    width: 0,
  });
  const [isRotating, setIsRotating] = useState(false);
  const [activeId, setActiveId] = useState<null | string>(null);
  const { handleScrollRight, handleScrollLeft } = useSmartTableScroll(
    headerRefs,
    tableRef as RefObject<HTMLDivElement>,
  );

  const updateColumns = useFundsServicePostFundsTableTabByTabColumns();

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const [customColl, setCustomColl] = useState<{
    active: boolean;
    date: string;
  }>({ active: false, date: '' });

  const DraggableTableHeader = ({
    header,
    children,
  }: {
    header: Header<Person, unknown>;
    children: React.ReactNode;
  }) => {
    const { attributes, listeners, setNodeRef } = useSortable({
      id: header.column.id,
    });

    const dragIndicator = useDragIndicator();
    const isDraggingOver = dragIndicator.columnId === header.column.id;
    const position = 'right';

    return (
      <th
        data-column-id={header.id}
        {...attributes}
        {...listeners}
        ref={setNodeRef}
        style={{
          transition: 'width transform 0.1s ease-in-out',
          whiteSpace: 'nowrap',
        }}
        className={cn(
          'bg-surface-brand-100 relative m-0 h-[64px] p-0 text-sm font-medium',
          columnClass,
        )}
      >
        {isDraggingOver && position && (
          <div
            className={`bg-border-brand-contrast-700 absolute bottom-0 top-1 z-10 h-[90%] w-0.5 ${
              position === 'right' ? 'left-0' : 'right-0'
            }`}
          >
            <div className="bg-border-brand-contrast-700 absolute top-0 flex h-2.5 w-2.5 translate-x-1 items-center justify-center rounded-full">
              <div className="bg-surface-neutral-primary h-1.5 w-1.5 rounded-full" />
            </div>
          </div>
        )}
        {children}
      </th>
    );
  };

  type SimplifiedFund = {
    fundType: number;
    logo: string;
    id: number;
    pinned: boolean;
    investmentFundsMethod: string;
    nameFund: string;
    dailyAlpha: number | null;
    weeklyAlpha: number | null;
    monthlyAlpha: number | null;
    isTradable: boolean;
  };
  // request to get funds table data
  const query = useFundsServiceGetFundsTable({ tab: activeIndexCategoryTab });

  useEffect(() => {
    if (query.data?.columns) {
      setLocalColumns(query.data.columns);
    }
  }, [query.data?.columns]);

  useEffect(() => {
    if (!query.data?.columns) return;

    const serverSorting: SortingState = query.data.columns
      // only include columns that have sorting enabled
      .filter((col) => col.sort !== 'NO')
      .map((col) => ({
        // column key for react-table
        id: col.key as keyof FundTableItemInfoApiModel,
        // convert API sort direction to boolean
        desc: col.sort === 'DESC',
      }));

    // set initial sorting state
    setSorting(serverSorting);
  }, [query.data?.columns]);

  const columns = React.useMemo<ColumnDef<SimplifiedFund>[]>(() => {
    return localColumns
      .filter((col) => col.visible)
      .map((col) => {
        const key = col.key as keyof FundTableItemInfoApiModel;

        return {
          accessorKey: key,
          id: key,
          header: col.upperTitle,
          enableSorting: true,
          meta: {
            sort: col.sort,
            visible: col.visible,
            group: col.lowerTitle || null,
            colorFormat: col.colorFormat,
          },
          cell: (info) => {
            const value = info.getValue();
            if (col.colorFormat === 'COLORED') {
              return (
                <span
                  style={{
                    color:
                      typeof value === 'number' && value < 0 ? 'red' : 'green',
                  }}
                >
                  {value as React.ReactNode}
                </span>
              );
            }
            return value as React.ReactNode;
          },
        };
      });
  }, [localColumns]);

  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!),
  );

  const [columnClass, setColumnClass] = useState('w-[200px]');

  useEffect(() => {
    if (!columns || !columns.length) return;

    const visibleColumns = columns.filter((col) => col.meta.visible);

    if (visibleColumns.length) {
      visibleColumns.find((col, index) => {
        if (col.meta.sort !== 'NO') setActiveSortIndex(index);
      });
    }

    const containerWidth = tableRef?.current?.clientWidth;
    const neededWidth = columns.length * 200;
    if (containerWidth && containerWidth >= neededWidth + 200) {
      setColumnClass('w-full');
    } else {
      setColumnClass(`w-[220px]`);
    }
  }, [columns]);

  const { data: tabs } = useFundsServiceGetFundsTable({ tab: 1 });

  useEffect(() => {
    table.setPageSize(10);
  }, [activeIndexCategoryTab]);

  // set pinned list fund
  useEffect(() => {
    if (query.isLoading || query.isFetching || !query.data?.selectedTabFunds)
      return;

    const initialPinnedList = query.data.selectedTabFunds
      .filter((fund) => fund.pinned)
      .map((fund) => fund.info.identifier);

    const initialMarkedList = query.data.selectedTabFunds
      .filter((fund) => fund.mark)
      .map((fund) => {
        return {
          id: fund.info.identifier,
          color: fund.mark || '',
        };
      });

    if (activeIndexCategoryTab === 1000) {
      setWatchList(query.data.selectedTabFunds);
    } else {
      setWatchList([]);
    }

    setRowsMark(initialMarkedList);

    setPinnedList(initialPinnedList);
  }, [query.isLoading, query.isFetching, query.data?.selectedTabFunds]);

  // reorder columns after drag & drop
  async function handleDragEnd(event: DragEndEvent) {
    setIsRotating(false);

    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((prevOrder) => {
        const oldIndex = prevOrder.indexOf(active.id as string);
        const newIndex = prevOrder.indexOf(over.id as string);
        const newOrder = arrayMove(prevOrder, oldIndex, newIndex);
        if (activeSortIndex !== null && oldIndex === activeSortIndex) {
          setActiveSortIndex(newIndex > 1 ? newIndex - 1 : newIndex);
        }
        updateColumns.mutateAsync({
          tab: activeIndexCategoryTab,
          requestBody: {
            columns: [
              ...newOrder.map((colId) => {
                const col = localColumns.find((c) => c.key === colId);
                return {
                  customPeriodEndJdate: null,
                  customPeriodStartJdate: null,
                  key: colId,
                  sortDirection: col?.sort ?? 'NO',
                  visible: col?.visible ?? true,
                  selectedFilter: null,
                };
              }),
              ...localColumns
                .filter((c) => !newOrder.includes(c.key))
                .map((col) => ({
                  customPeriodEndJdate: null,
                  customPeriodStartJdate: null,
                  key: col.key,
                  sortDirection: col?.meta?.sort ?? 'NO',
                  visible: false,
                  selectedFilter: null,
                })),
            ],
          },
        });

        return newOrder;
      });
    }
  }

  const simplifiedFunds: SimplifiedFund[] = useMemo(() => {
    if (!query.data?.selectedTabFunds) return [];

    const sourceFunds = query.data.selectedTabFunds;
    const listToMap = activeIndexCategoryTab === 1000 ? watchList : sourceFunds;

    const funds = listToMap.map((item) => {
      const info = 'info' in item ? item.info : item;
      const id = info.identifier;

      return {
        linkWebsite: info.website,
        fundType: info.fundType.identifier,
        logo: info.logoMedium || '',
        id,
        pinned: pinnedList.includes(id),
        investmentFundsMethod: 'T',
        nameFund: info.name || info.abbreviatedName,
        dailyAlpha: info.alphaLastDay,
        weeklyAlpha: info.alphaLastWeek,
        monthlyAlpha: info.alphaLastMonth,
        quarterlyAlpha: info.alphaLast3Months,
        weeklyReturn: info.returnLastWeekPercent,
        monthlyReturn: info.returnLastMonthPercent,
        quarterlyReturn: info.returnLast3MonthsPercent,
        yearlyReturn: info.returnLastYearPercent,
        profitPerUnit: info.redeemNavRials,
        issuancePrice: info.issueNavRials,
        cancellationPrice: info.redeemNavRials,
        netAssetValue: info.statisticalNavRials,
        unitCount: info.numberOfUnits,
        startDate: info.initiationDate,
        investmentMethod: 'T' as const,
        mark: 'mark' in item ? item.mark || '' : '',
        isEtf: false,
        isTradable: true,
        identifier: info.identifier,
        registrationNumber: info.registrationNumber || '',
        name: info.name || '',
        abbreviatedName: info.abbreviatedName || '',
        someOtherField1: null,
        someOtherField2: '',
      };
    });

    return funds.sort((a, b) => Number(b.pinned) - Number(a.pinned));
  }, [query.data?.selectedTabFunds, pinnedList, watchList]);

  const sortedFunds = useMemo(() => {
    if (!simplifiedFunds) return [];

    const pinned = simplifiedFunds.filter((f) => f.pinned);
    const unpinned = simplifiedFunds.filter((f) => !f.pinned);

    if (sorting.length === 0) {
      return [...pinned, ...unpinned];
    }

    const [{ id, desc }] = sorting;

    const sortedUnpinned = [...unpinned].sort((a, b) => {
      const aVal = a[id as keyof typeof a];
      const bVal = b[id as keyof typeof b];

      const aStr = String(aVal ?? '');
      const bStr = String(bVal ?? '');

      const compare = aStr.localeCompare(bStr, 'fa', { sensitivity: 'base' });

      return desc ? -compare : compare;
    });

    return [...pinned, ...sortedUnpinned];
  }, [simplifiedFunds, sorting]);

  const fundSortFromApi = useFundsServicePostFundsTableTabByTabSort();

  const table = useReactTable<SimplifiedFund>({
    data: sortedFunds,
    columns,
    state: { columnOrder, sorting },
    initialState: {
      columnVisibility,
      sorting,
    },
    onSortingChange: async (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      try {
        await Promise.all(
          newSorting.map((sortItem) =>
            fundSortFromApi.mutateAsync({
              requestBody: {
                columnKey: sortItem.id,
                direction: sortItem.desc ? 'DESC' : 'ASC',
              },
              tab: activeIndexCategoryTab,
            }),
          ),
        );
      } catch (error) {
        console.log(error);
      }
      setSorting(newSorting);
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualSorting: true,
  });

  const isChanged = useMemo(() => {
    return !Object.entries(table.getState().columnVisibility).every(
      ([key, value]) => columnVisibility[key] === value,
    );
  }, [table]);

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
  }, [isScrollAtStart, activeSortIndex, table]);

  useEffect(() => {
    return () => {
      document.documentElement.style.overflow = 'auto';
    };
  }, [customColl.active]);

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
        setIsScrollAtEnd(
          Math.round(scrollLeft * -1) + clientWidth <= scrollWidth - 1,
        );
      }
    };

    // Register scroll event listener on the table element
    const tableElem = tableRef.current;
    tableElem?.addEventListener('scroll', handleScroll);
    return () => {
      // Cleanup: remove event listeners when component unmounts or dependencies change
      tableElem?.removeEventListener('scroll', handleScroll);

      window.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, []);

  const { rows } = table.getRowModel();

  // Scroll lock handler factory
  const freezeScroll = (el: HTMLDivElement) => () => {
    if (el.dataset.scrollTop) {
      el.scrollTop = parseInt(el.dataset.scrollTop);
    }
  };

  useEffect(() => {
    const el = tableRef.current;
    if (!el) return;

    if (isRotating) {
      el.dataset.scrollTop = el.scrollTop.toString();
      const handler = freezeScroll(el);
      el.addEventListener('scroll', handler);
      el.style.scrollBehavior = 'auto';
      return () => {
        el.removeEventListener('scroll', handler);
      };
    }
  }, [isRotating]);

  // event keyboard scroll
  useHotkeys('a, arrowleft', () => handleScrollRight());
  useHotkeys('d, arrowright', () => handleScrollLeft());
  useHotkeys('w, arrowup', () =>
    tableRef.current?.scrollBy({ top: -100, behavior: 'smooth' }),
  );
  useHotkeys('s, arrowdown', () =>
    tableRef.current?.scrollBy({ top: 100, behavior: 'smooth' }),
  );

  const sensors = useTableDragSensors();
  const totalCount = query.data?.selectedTabFunds.length;
  const staticOptions = [10, 25, 50, 100].filter(
    (size) => totalCount && size < totalCount,
  );

  const pageSizeOptions = [...staticOptions, totalCount];
  const options = pageSizeOptions.map((size) => ({
    text: String(size),
  }));

  const handlerPinned = (e: number) => {
    setPinnedList((prev) => [...prev, e]);
  };

  const handlerUnPinned = (e: number) => {
    setPinnedList((prev) => {
      const updated = prev.filter((id) => id !== e);
      return updated;
    });
  };
  const handlerDeleteWatchList = (id: number) => {
    setWatchList((prev) => prev.filter((item) => item.info.identifier !== id));
  };

  const handlerAddToWatchList = (fundId: number) => {
    if (activeIndexCategoryTab !== 1000) return;

    const itemToAdd = query.data?.selectedTabFunds.find(
      (item) => item.info.identifier === fundId,
    );

    if (!itemToAdd) return; // Make sure the item was found

    setWatchList((currentWatchList) => {
      // Check for duplicates against the MOST RECENT state
      const isAlreadyInList = currentWatchList.some(
        (item) => item.info.identifier === fundId,
      );

      if (isAlreadyInList) {
        // If it's already there, return the current state without changes
        return currentWatchList;
      } else {
        // Otherwise, return the new state with the added item
        return [...currentWatchList, itemToAdd];
      }
    });
  };

  const handlerMarkFund = (id: number, color: string) => {
    setRowsMark((prev) => {
      const existingMark = prev.find((mark) => mark.id === id);

      // If exists and color is same, remove the mark (unmark)
      if (existingMark && existingMark.color === color) {
        return prev.filter((mark) => mark.id !== id);
      }

      // Else, update the color or add new mark
      const updatedMarks = prev.filter((mark) => mark.id !== id);
      return [...updatedMarks, { id, color }];
    });
  };

  // Mutation to handle CSV export for the selected funds tab
  // - Calls the FundsService to get CSV data
  // - Converts the CSV string into a Blob
  // - Creates a temporary download link and triggers the file download
  // - Cleans up the temporary link and object URL after download
  const mutation = useMutation<string, Error>({
    mutationFn: async (): Promise<string> => {
      return FundsService.getFundsTableTabByTabCsv({
        tab: activeIndexCategoryTab,
      }) as Promise<string>;
    },
    onSuccess: (csvData) => {
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `funds_tab_${activeIndexCategoryTab}.csv`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    },
  });

  // get function for change column visibility
  const changeVisibilityColumns = useFundsServicePostFundsTableTabByTabColumn();

  // request for change column visibility
  const handlerChangeVisibilityColumns = async ({
    columnKey,
    visible,
  }: {
    columnKey: string;
    visible: boolean;
  }) => {
    setLocalColumns((prev) =>
      prev.map((col) =>
        col.key === columnKey ? { ...col, visible: !visible } : col,
      ),
    );
    try {
      await changeVisibilityColumns.mutateAsync({
        tab: activeIndexCategoryTab,
        requestBody: {
          column: {
            customPeriodEndJdate: null,
            customPeriodStartJdate: null,
            key: columnKey,
            sortDirection: 'NO',
            visible: !visible,
            selectedFilter: null,
          },
        },
      });
    } catch (error) {
      console.log(error);

      setLocalColumns((prev) =>
        prev.map((col) => (col.key === columnKey ? { ...col, visible } : col)),
      );
    }
  };

  useEffect(() => {
    setColumnOrder(
      columns.map((col) => col.id).filter((id): id is string => !!id),
    );
  }, [columns]);

  const columnMap = useMemo(() => {
    const map: Record<string, string> = {};
    columns.forEach((col) => {
      if (col.id) {
        map[col.id] = col.header as string;
      }
    });
    return map;
  }, [columns]);

  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        {!tabs ? (
          <div className="-mt-2">
            <TabsSkeleton />
          </div>
        ) : (
          tabs.tabs && (
            <Tabs
              variant="shaped-color"
              onClickTab={(e) =>
                setActiveIndexCategoryTab(tabs.tabs[e].identifier)
              }
              activeTab={activeIndexCategoryTab}
              tabs={tabs.tabs?.map((tab) => ({
                id: String(tab.identifier),
                title: tab.title,
                tag: tab.color as FundsTagProps['color'],
              }))}
            />
          )
        )}
        {!query.isLoading ? (
          <Tooltip title="خروجی اکسل">
            <div
              onClick={() => mutation.mutate()}
              className="border-button-border-default cursor-pointer rounded-md border p-1.5"
            >
              <ExportExcel />
            </div>
          </Tooltip>
        ) : (
          <ExcelSkeleton />
        )}
      </div>

      <div
        dir="ltr"
        className={cn('', {
          'border-border-brand-soft-200 relative top-0 flex flex-col items-center overflow-hidden border-t-2':
            rows.length,
        })}
      >
        <div className="bg-border-brand-soft-200 absolute top-[75px] z-50 h-0.5 w-full" />
        <div
          ref={tableRef}
          className={cn(
            'table-scroll group/table bg-surface-neutral-primary scrollbar-lg w-screen overflow-auto scroll-smooth',
            {
              'h-[calc(100vh-173px)]': isHeaderVisible,
              'overflow-hidden': !rows.length,
            },
          )}
        >
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl text-center"
          >
            {query.isLoading ? (
              <thead>
                <tr>
                  <HeaderTableSkeleton />
                </tr>
              </thead>
            ) : (
              <thead
                className={cn(
                  'group sticky right-0 top-0 z-50 m-0 p-0 duration-300',
                )}
              >
                <DndContext
                  onDragStart={(event) => {
                    setIsRotating(true);
                    setActiveId(String(event.active.id));
                  }}
                  collisionDetection={closestCenter}
                  modifiers={[restrictToHorizontalAxis]}
                  onDragEnd={handleDragEnd}
                  sensors={sensors}
                  onDragOver={() => setIsRotating(true)}
                  onDragCancel={() => setIsRotating(false)}
                >
                  <tr className="w-full">
                    <th
                      style={{
                        transform:
                          activeSortIndex !== 0
                            ? `translateX(-${sortIndicatorPosition.right}px)`
                            : '',
                        width:
                          activeSortIndex !== 0
                            ? `${sortIndicatorPosition.width}px`
                            : '',
                      }}
                      className={cn('z-[9999] duration-300', {
                        'absolute bottom-0 z-20 transition-transform':
                          activeSortIndex !== 0,
                        'group-hover/table:-right-0':
                          activeSortIndex !== 0 && isScrollAtStart,
                        'fixed right-[208px] top-[240px] z-10 w-fit':
                          activeSortIndex === 0,
                        'top-[157px]':
                          activeSortIndex === 0 && !isHeaderVisible,
                        hidden: sorting[0]?.id === 'abbreviated_name',
                      })}
                    >
                      <div className="bg-surface-brand-600-primary mx-auto h-1.5 w-16 rounded-t-[10px]" />
                    </th>
                    <th className="sticky right-[340px] z-30 mt-5 p-0">
                      {isScrollAtStart && (
                        <div className="hidden group-hover:block">
                          <Tooltip title="پیمایش به راست (D)">
                            <button
                              onMouseDown={startScrollLeft}
                              onMouseLeave={stopScroll}
                              className={cn(
                                'bg-button-brand-surface-default rounded-md p-1 text-white',
                              )}
                            >
                              <Icon name="arrow-right" size="lg" />
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </th>
                    <SortableContext
                      items={columnOrder.slice(1)}
                      strategy={horizontalListSortingStrategy}
                    >
                      {table
                        .getHeaderGroups()[0]
                        .headers.map((header, index) => {
                          return (
                            <React.Fragment key={index}>
                              {index === 0 && (
                                <th
                                  key={index}
                                  className={cn(
                                    'bg-surface-brand-100 sticky right-0 top-0 z-20 m-0 h-[64px] w-[385px] py-0',
                                    {
                                      'w-full max-w-full':
                                        table.getAllLeafColumns().length - 1 ===
                                        0,
                                    },
                                  )}
                                >
                                  <div
                                    className={cn({
                                      'bg-surface-brand-100 h-[75px] select-none':
                                        header.column.getCanSort(),
                                      'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]':
                                        isScrollAtStart,
                                      'w-full min-w-[385px] max-w-full':
                                        table.getAllLeafColumns().length - 1 ===
                                        0,
                                      'w-[384px]':
                                        table.getAllLeafColumns().length - 1 >
                                        0,
                                    })}
                                  >
                                    <div className="bg-surface-brand-100 mr-[75px] flex">
                                      <div className="mr-24">
                                        <FundsColumnHeader
                                          activeSortIcon={
                                            sorting[0]?.id ===
                                            'abbreviated_name'
                                          }
                                          active={!isRotating}
                                          clickFiltered={() => {
                                            setActiveSortIndex(0);
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
                                            header.column.getIsSorted() ===
                                            'asc'
                                              ? 'active-asc'
                                              : header.column.getIsSorted() ===
                                                  'desc'
                                                ? 'inactive'
                                                : 'inactive'
                                          }
                                          filterable={false}
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

                                    <div className="absolute top-[19px] flex items-center gap-2 pr-[24px]">
                                      <Tooltip title="انتخاب ستون‌ها">
                                        <div
                                          onClick={() => {
                                            setIsSettingModalOpen(true);
                                          }}
                                          className="bg-button-brand-surface-default text-button-brand-label-onsurface relative cursor-pointer rounded-md p-1"
                                        >
                                          {isChanged && (
                                            <div className="absolute -right-1 -top-1">
                                              <FundsTag color="pink" />
                                            </div>
                                          )}
                                          <Icon size="lg" name="settings" />
                                        </div>
                                      </Tooltip>
                                      <Tooltip title="فیلتر صندوق‌ها">
                                        <div
                                          onClick={() => {
                                            setIsFilterModalOpen(true);
                                          }}
                                          className="bg-button-brand-surface-default text-button-brand-label-onsurface relative cursor-pointer rounded-md p-1"
                                        >
                                          {(Object.entries(selectedFilters)
                                            .length > 0 ||
                                            fundSearchQuery) && (
                                            <div className="absolute -right-1 -top-1 z-30">
                                              <FundsTag color="pink" />
                                            </div>
                                          )}
                                          <Icon size="lg" name="filter" />
                                        </div>
                                      </Tooltip>
                                    </div>
                                  </div>
                                </th>
                              )}
                              {index > 0 && (
                                <DraggableTableHeader
                                  key={header.id}
                                  header={
                                    header as unknown as Header<Person, unknown>
                                  }
                                >
                                  <div
                                    ref={(el) => {
                                      if (headerRefs?.current) {
                                        headerRefs.current[index] = el;
                                      }
                                    }}
                                    key={index}
                                    className={cn(
                                      'm-0 h-full text-nowrap p-0 text-sm font-medium',
                                      columnClass,
                                    )}
                                  >
                                    {index >= 2 &&
                                    header.isPlaceholder ? null : (
                                      <div
                                        {...{
                                          className: header.column.getCanSort()
                                            ? 'cursor-pointer h-[75px] select-none'
                                            : '',
                                        }}
                                      >
                                        <FundsColumnHeader
                                          active={!isRotating}
                                          activeStyle={header.id === activeId}
                                          activePlaceholder={
                                            activeId !== header.id
                                          }
                                          defaultSort={() => {
                                            setActiveSortIndex(0);
                                            setSorting([
                                              {
                                                id: 'abbreviated_name',
                                                desc: false,
                                              },
                                            ]);
                                          }}
                                          clickFiltered={() => {
                                            setActiveSortIndex(index);
                                            header.column.getToggleSortingHandler()?.(
                                              new Event('click'),
                                            );
                                          }}
                                          size={'large'}
                                          type={
                                            header.column.getIsSorted() ===
                                            'asc'
                                              ? 'active-desc'
                                              : header.column.getIsSorted() ===
                                                  'desc'
                                                ? 'active-asc'
                                                : 'inactive'
                                          }
                                          filterable={false}
                                          subTitle={
                                            header.column.columnDef.meta
                                              ?.group as string
                                          }
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
                                  </div>
                                </DraggableTableHeader>
                              )}
                            </React.Fragment>
                          );
                        })}
                      <DragOverlay
                        adjustScale={false}
                        zIndex={100}
                        style={{
                          zIndex: 9999,
                          pointerEvents: 'none',
                        }}
                      >
                        {activeId ? (
                          <th
                            className="absolute top-0 mt-9 flex -rotate-12 items-start justify-center transition-none"
                            style={{
                              width:
                                String(activeId).length > 10
                                  ? '200px'
                                  : '144px',
                              backgroundColor: '#E3F8F8',
                              borderBottom: '1px solid #eee',
                              padding: '0',
                              zIndex: 100,
                              height: '64px',
                            }}
                          >
                            {activeId && (
                              <div className="text-text-neutral-primary bg-surface-brand-200 flex h-20 w-full items-center justify-center">
                                {columnMap[activeId] || activeId}
                              </div>
                            )}
                          </th>
                        ) : (
                          <></>
                        )}
                      </DragOverlay>
                    </SortableContext>
                    <th className="fixed left-[35px] m-0 mt-5">
                      {isScrollAtEnd && (
                        <div
                          onMouseDown={startScrollRight}
                          onMouseLeave={stopScroll}
                          className={cn('hidden group-hover:block')}
                        >
                          <Tooltip title="پیمایش به چپ (A)">
                            <button
                              className={cn(
                                'bg-button-brand-surface-default text-button-brand-label-onsurface rounded-md p-1',
                              )}
                            >
                              <Icon name="arrow-left" size="lg" />
                            </button>
                          </Tooltip>
                        </div>
                      )}
                    </th>
                  </tr>
                </DndContext>
              </thead>
            )}
            {!query.isLoading ? (
              <TableBody
                handlerMarkFund={handlerMarkFund}
                allRows={sortedFunds.length}
                rowMarks={rowsMark}
                tableRef={tableRef as RefObject<HTMLDivElement>}
                tabs={tabs?.tabs || []}
                isScrollAtStart={isScrollAtStart}
                handlerPinned={handlerPinned}
                handlerUnPinned={handlerUnPinned}
                handlerDeleteWatchList={handlerDeleteWatchList}
                handlerAddToWatchList={handlerAddToWatchList}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                rows={rows as any}
                activeIndexCategoryTab={activeIndexCategoryTab}
              />
            ) : (
              <tbody className="overflow-y-hidden">
                {Array.from({ length: 10 }).map((_, i) => (
                  <RowSkeleton key={i} />
                ))}
              </tbody>
            )}
            {!rows.length && !query.isLoading && (
              <div className="sticky right-0 -mt-10 w-screen whitespace-nowrap text-sm text-gray-600">
                صندوقی در دیده‌بان وجود ندارد.
              </div>
            )}
          </table>
        </div>
      </div>

      {rows.length ? (
        <div className="fixed bottom-6 right-0 z-50 mt-6 flex w-full justify-between px-8">
          <div className="bg-coloropacity-surface-accent-gray-400-55per rounded-md backdrop-blur-[30px]">
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
                return (
                  <div className="text-text-onaccent-neutral-primary-onbelow600 flex h-[40px] items-center gap-2 pl-2 pr-3 text-xs font-medium">
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
                    'bg-coloropacity-surface-accent-gray-400-55per text-text-onaccent-neutral-primary-onbelow600 w-full cursor-pointer px-3 pt-2 text-center text-xs font-medium',
                    {
                      'pb-2':
                        table.getState().pagination.pageSize *
                          (table.getState().pagination.pageIndex + 1) *
                          table.getPageCount() ===
                        +prop.text,
                    },
                  )}
                >
                  <span>{totalCount === +prop.text ? 'همه' : prop.text}</span>
                </div>
              )}
              dropDownList={options}
            />
          </div>

          <span className="text-text-onaccent-neutral-primary-onbelow600 bg-coloropacity-surface-accent-gray-400-55per flex h-[40px] gap-2 rounded-md px-3 py-2 text-xs font-medium backdrop-blur-[30px]">
            مجموعه ارزش خالص دارایی‌ها:
            <span className="border-text-onaccent-neutral-primary-onbelow600 border-b text-sm">
              10,986,249.09
            </span>
          </span>
          <div className="bg-coloropacity-surface-accent-gray-400-55per flex h-[40px] items-center gap-2 rounded-md px-3 py-2 backdrop-blur-[30px]">
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
              className={cn(
                'text-icon-onaccent-neutral-onbelow600 cursor-pointer rounded',
                {
                  'text-icon-neutral-disable cursor-default':
                    table.getState().pagination.pageIndex + 1 === 1,
                },
              )}
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <Icon size="lg" name="chevron-right" />
            </button>
            <button
              className={cn(
                'text-icon-onaccent-neutral-onbelow600 cursor-pointer rounded',
                {
                  'text-text-icon-neutral-disable cursor-default':
                    !table.getCanNextPage(),
                },
              )}
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              <Icon size="lg" name="chevron-left" />
            </button>
          </div>
        </div>
      ) : (
        ''
      )}

      <Dialog
        className="min-w-[570px] p-0"
        onClose={() => setIsSettingModalOpen(false)}
        isOpen={isSettingModalOpen}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span className="text-text-neutral-primary p-6 text-xl font-medium">
              انتخاب ستون‌ها
              <span
                className={cn('mr-0.5', {
                  'text-text-message-error-primary-600':
                    table.getAllLeafColumns().length - 1 === 25,
                })}
              >
                ({table.getAllLeafColumns().length - 1}/25)
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

        <div className="bg-border-neutral-primary h-[2px] w-full" />
        <div
          dir="rtl"
          className="scrollbar-md mb-6 h-[550px] overflow-x-hidden overflow-y-scroll"
        >
          {query.data?.columnGroups.map((col, index) => {
            return (
              <div
                key={col.identifier}
                className={cn(
                  'border-border-neutral-secondary px-4 py-6 text-right',
                  {
                    'border-b': index !== query.data.columnGroups.length - 1,
                  },
                )}
              >
                <span className="text-text-neutral-primary text-base font-semibold">
                  {col.label}
                </span>
                <div className="mt-4 grid grid-cols-2">
                  {localColumns
                    .filter((column) => column.columnGroupId === col.identifier)
                    .map((column) => (
                      <div
                        className="hover:bg-surface-brand-100 w-full cursor-pointer rounded-lg px-2 py-3"
                        key={column.key}
                      >
                        <Checkbox
                          checked={column.visible}
                          onChange={() => {
                            if (column.visible) {
                              handlerChangeVisibilityColumns({
                                columnKey: column.key,
                                visible: column.visible,
                              });
                            } else if (
                              table.getAllLeafColumns().length - 1 <
                              25
                            ) {
                              handlerChangeVisibilityColumns({
                                columnKey: column.key,
                                visible: column.visible,
                              });
                            }
                          }}
                          reactcontent={column.label}
                        />
                      </div>
                    ))}
                </div>
              </div>
            );
          })}
        </div>
      </Dialog>
      <Dialog
        className="h-[696px] w-[416px] p-0"
        onClose={() => setIsFilterModalOpen(false)}
        isOpen={isFilterModalOpen}
      >
        <div className="scrollbar-md mb-4 w-full overflow-x-hidden rounded-3xl text-right">
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
      <Toaster position="bottom-center" />
    </>
  );
};

export default Funds;
