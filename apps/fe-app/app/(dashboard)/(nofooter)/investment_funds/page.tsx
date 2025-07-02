'use client';
import React, {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import { useHeaderVisibility } from '../../../../hooks/useHeaderVisiblity';
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
import { makeData } from './_components/makeData';
import { columnVisibility, filterList } from './FundsTable.constants';
import { ExportExel } from './_components/ExportExel';
import { useSmartTableScroll } from './../../../../hooks/useSmartTableScroll';
import { TableBody } from './_components/TableBody';
import { Person } from './types';
import {
  useDragIndicator,
  useTableDragSensors,
} from './utils/investmentFunds.utils';
import { OpenAPI, useFundsServiceGetFundsTable } from '@openapi';
import { fetchToken } from 'apps/fe-app/app/(auth)/auth.utils';
import { TabsSkeleton } from './_components/TabsSkeleton';
import { RowSkeleton } from './_components/RowSkeleton';
const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [activeIndexCategoryTab, setActiveIndexCategoryTab] = useState(1);
  const [data] = useState(() => makeData(500));
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'nameFund',
      desc: false,
    },
  ]);

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
    tableRef,
  );
  const columns = React.useMemo<ColumnDef<Person>[]>(
    () => [
      {
        accessorKey: 'nameFund',
        header: 'Fund Name',
        id: 'nameFund',
        size: 200,
        enableSorting: true,
      },
      {
        accessorKey: 'unitCount',
        header: 'Unit Count',
        id: 'unitCount',
        size: 100,
        enableSorting: true,
      },
      {
        accessorKey: 'profitPerUnit',
        header: 'Profit/Unit',
        id: 'profitPerUnit',
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: 'netAssetValue',
        header: 'Net Asset Value',
        id: 'netAssetValue',
        size: 160,
        enableSorting: true,
      },
      {
        accessorKey: 'monstatisticalPriceth',
        header: 'Statistical Price',
        id: 'monstatisticalPriceth',
        size: 160,
        enableSorting: true,
      },
      {
        accessorKey: 'cancellationPrice',
        header: 'Cancellation Price',
        id: 'cancellationPrice',
        size: 150,
        enableSorting: true,
      },
      {
        accessorKey: 'issuancePrice',
        header: 'Issuance Price',
        id: 'issuancePrice',
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: 'dailyAlpha',
        header: 'Daily Alpha',
        id: 'dailyAlpha',
        size: 120,
        enableSorting: true,
      },
      {
        accessorKey: 'weeklyAlpha',
        header: 'Weekly Alpha',
        id: 'weeklyAlpha',
        size: 120,
        enableSorting: true,
      },
      {
        accessorKey: 'monthlyAlpha',
        header: 'Monthly Alpha',
        id: 'monthlyAlpha',
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: 'quarterlyAlpha',
        header: 'Quarterly Alpha',
        id: 'quarterlyAlpha',
        size: 140,
        enableSorting: true,
      },
      {
        accessorKey: 'dailyReturn',
        header: 'Daily Return',
        id: 'dailyReturn',
        size: 120,
        enableSorting: true,
      },
      {
        accessorKey: 'weeklyReturn',
        header: 'Weekly Return',
        id: 'weeklyReturn',
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: 'monthlyReturn',
        header: 'Monthly Return',
        id: 'monthlyReturn',
        size: 130,
        enableSorting: true,
        meta: { group: '' },
      },
      {
        accessorKey: 'quarterlyReturn',
        header: 'Quarterly Return',
        id: 'quarterlyReturn',
        size: 140,
        enableSorting: true,
      },
      {
        accessorKey: 'yearlyReturn',
        header: 'Yearly Return',
        id: 'yearlyReturn',
        size: 130,
        enableSorting: true,
      },
      {
        accessorKey: 'progress',
        header: 'Progress',
        id: 'progress',
        size: 120,
        enableSorting: true,
      },
      {
        accessorKey: 'startDate',
        header: 'Start Date',
        id: 'startDate',
        size: 160,
        enableSorting: true,
        cell: (info) => new Date(info.getValue<number>()).toLocaleDateString(),
      },
      {
        accessorKey: 'investmentMethod',
        header: 'Investment Method',
        id: 'investmentMethod',
        size: 150,
        enableSorting: true,
      },
    ],
    [],
  );

  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});
  const [columnOrder, setColumnOrder] = React.useState<string[]>(() =>
    columns.map((c) => c.id!),
  );
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
    const position = dragIndicator.position;

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
          {
            'w-[144px]': !(
              String(
                flexRender(header.column.columnDef.header, header.getContext()),
              ).length > 10
            ),
            'w-[200px]':
              String(
                flexRender(header.column.columnDef.header, header.getContext()),
              ).length > 10,
          },
          '6xl:w-full',
        )}
      >
        {isDraggingOver && position && (
          <div
            className={`bg-border-brand-contrast-700 absolute bottom-0 top-1 z-10 h-[90%] w-0.5 ${position === 'left' ? 'right-0' : 'left-0'
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

  // reorder columns after drag & drop
  function handleDragEnd(event: DragEndEvent) {
    setIsRotating(false);
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumnOrder((columnOrder) => {
        const oldIndex = columnOrder.indexOf(active.id as string);
        const newIndex = columnOrder.indexOf(over.id as string);
        return arrayMove(columnOrder, oldIndex, newIndex); //this is just a splice util
      });
    }
  }



  const query = useFundsServiceGetFundsTable({ tab: activeIndexCategoryTab }, undefined, {
    enabled: false,
  });

  const fetchDataTable = async () => {
    const token = await fetchToken();

    if (!token) {
      throw new Error('Failed to fetch access token');
    }

    OpenAPI.HEADERS = {
      Authorization: `Bearer ${token}`,
    };

    await query.refetch();
  };

  useEffect(() => {
    fetchDataTable();
  }, [activeIndexCategoryTab]);

  const tabs = query.data?.tabs.map(({ color, ...rest }) => ({
    ...rest,
    tag: color === 'vividgreen' ? 'green' : (color || ''),

  }));


  const simplifiedFunds = useMemo(() => {
    return query.data?.selectedTabFunds.map(({ fund, pinned }) => ({
      pinned: pinned,
      investemntFundsMethod: 'T',
      nameFund: fund.name || fund.abbreviatedName,
      dailyAlpha: fund.alphaLastDay,
      weeklyAlpha: fund.alphaLastWeek,
      monthlyAlpha: fund.alphaLastMonth,
      quarterlyAlpha: fund.alphaLast3Months,
      weeklyReturn: fund.returnLastWeekPercent,
      monthlyReturn: fund.returnLastMonthPercent,
      quarterlyReturn: fund.returnLast3MonthsPercent,
      yearlyReturn: fund.returnLastYearPercent,
      profitPerUnit: fund.redeemNavRials,
      issuancePrice: fund.issueNavRials,
      cancellationPrice: fund.redeemNavRials,
      netAssetValue: fund.statisticalNavRials,
      unitCount: fund.numberOfUnits,
      startDate: fund.initiationDate,
      fundType: fund.fundType?.title,
    }));
  }, [query.data?.selectedTabFunds]);

  const table = useReactTable({
    data: simplifiedFunds ?? [],
    columns: columns,
    state: { columnOrder, sorting },
    initialState: {
      columnVisibility,
      sorting: sorting,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      setSorting(newSorting);
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    debugAll: true,
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
    document.documentElement.style.overflow = 'hidden';
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

  useEffect(() => {
    columnOrder.findIndex((id, index) => {
      if (id === sorting[0]?.id && activeSortIndex !== 0) {
        setTimeout(() => {
          if (index === 1) {
            setActiveSortIndex(1);
          } else {
            setActiveSortIndex(index - 1);
          }
        }, 300);
      }
    });
  }, [activeSortIndex, columnOrder, sorting]);

  const { rows } = table.getRowModel();

  // Scroll lock handler factory
  const freezeScroll = (el: HTMLDivElement) => (e: Event) => {
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


  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        {
          !query.data ? (
            <div className='-mt-2'>

            <TabsSkeleton />
            </div>
          ) : (
            query.data.tabs && (
              <Tabs
                variant="shaped-color"
                onClickTab={(e) =>
                  setActiveIndexCategoryTab(query.data.tabs[e].identifier)
                }
                activeTab={activeIndexCategoryTab - 1}
                colorMode="neutral"
                tabs={tabs}
              />
            )
          )
        }
        <Tooltip title="خروجی اکسل">
          <div className="border-button-border-default cursor-pointer rounded-md border p-1.5">
            <ExportExel />
          </div>
        </Tooltip>
      </div>

      <div
        dir="ltr"
        className={cn(
          'border-border-brand-soft-200 relative top-0 flex flex-col items-center overflow-hidden border-t-2',
        )}
      >
        <div className="bg-border-brand-soft-200 absolute right-0 top-[75px] z-50 h-0.5 w-full" />
        <div
          ref={tableRef}
          className="table-scroll group/table bg-surface-neutral-primary scrollbar-lg h-[calc(100vh-172px)] w-screen overflow-auto scroll-smooth"
        >
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl text-center"
          >
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
                sensors={useTableDragSensors()}
                onDragOver={() => setIsRotating(true)}
                onDragCancel={() => setIsRotating(false)}
              >
                <tr>
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
                      'fixed right-[215px] top-[240px] z-10 w-fit':
                        activeSortIndex === 0,
                      'top-[157px]': activeSortIndex === 0 && !isHeaderVisible,
                    })}
                  >
                    <div className="bg-surface-brand-600-primary mx-auto h-1.5 w-16 rounded-t-[10px]"></div>
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
                    {table.getHeaderGroups()[0].headers.map((header, index) => {
                      return (
                        <>
                          {index === 0 && (
                            <th
                              key={index}
                              className="bg-surface-brand-100 sticky right-0 top-0 z-20 m-0 h-[64px] w-[385px] py-0"
                            >
                              <div
                                className={cn({
                                  'bg-surface-brand-100 h-[75px] w-[384px] select-none':
                                    header.column.getCanSort(),
                                  'shadow-[-4px_0px_6px_0px_rgba(0,11,23,0.05)]':
                                    isScrollAtStart,
                                })}
                              >
                                <div className="bg-surface-brand-100 mr-[75px] flex">
                                  <div className="mr-24">
                                    <FundsColumnHeader
                                      activeSorticon={
                                        sorting[0]?.id === 'nameFund'
                                      }
                                      active={!isRotating}
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
                                      {(Object.entries(selectedFilters).length >
                                        0 ||
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
                              header={header}
                            >
                              <div
                                ref={(el) => {
                                  if (headerRefs?.current) {
                                    headerRefs.current[index] = el;
                                  }
                                }}
                                key={index}
                                className={cn(
                                  'bg-surface-brand-100 m-0 h-full w-full text-nowrap p-0 text-sm font-medium',
                                  String(
                                    flexRender(
                                      header.column.columnDef.header,
                                      header.getContext(),
                                    ),
                                  ).length > 10
                                    ? 'w-[200px]'
                                    : 'w-[144px]',
                                )}
                              >
                                {index >= 2 && header.isPlaceholder ? null : (
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
                                      activePlaceholder={activeId !== header.id}
                                      defaultSort={() => {
                                        setActiveSortIndex(0);
                                        setSorting([
                                          {
                                            id: 'nameFund',
                                            desc: false,
                                          },
                                        ]);
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
                                          : header.column.getIsSorted() ===
                                            'desc'
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
                              </div>
                            </DraggableTableHeader>
                          )}
                        </>
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
                              String(activeId).length > 10 ? '200px' : '144px',
                            backgroundColor: '#E3F8F8',
                            borderBottom: '1px solid #eee',
                            padding: '0',
                            zIndex: 100,
                            height: '64px',
                          }}
                        >
                          {activeId && (
                            <div className="text-text-neutral-primary bg-surface-brand-200 flex h-20 w-full items-center justify-center">
                              {activeId}
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
            {
              rows.length ?
                <TableBody
                  tableRef={tableRef}
                  rows={rows}
                  activeIndexCategoryTab={activeIndexCategoryTab}
                  rowMarks={[]}
                /> : <>
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                  <RowSkeleton />
                </>
            }
          </table>
        </div>
      </div>

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

      <Dialog
        className="min-w-[570px] p-0"
        onClose={() => setIsSettingModalOpen(false)}
        isOpen={isSettingModalOpen}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center justify-between">
            <span
              className={cn(
                'text-text-neutral-primary p-6 text-xl font-medium',
                {
                  'text-red-600':
                    table
                      .getAllLeafColumns()
                      .filter((col) => col.getIsVisible()).length === 25,
                },
              )}
            >
              انتخاب ستون‌ها (
              {
                table.getAllLeafColumns().filter((col) => col.getIsVisible())
                  .length
              }
              <span
                className={cn({
                  'text-text-message-error-primary-600':
                    table
                      .getAllLeafColumns()
                      .filter((col) => col.getIsVisible()).length === 25,
                })}
              >
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
                  {/* {item.columnDef.meta?.group} */}
                </span>
                <div className="grid grid-cols-2 px-4 pb-6">
                  <div
                    className="hover:bg-brand-100 rounded-md p-3"
                    key={index}
                  >
                    {item && (
                      <Checkbox
                        onChange={() => {
                          if (
                            item.columnDef.header?.toString() === 'بازه دلخواه'
                          ) {
                            setCustomColl({ active: true, date: '' });
                          }
                          if (
                            table
                              .getAllLeafColumns()
                              .filter((col) => col.getIsVisible()).length === 25
                          ) {
                            if (item.getIsVisible())
                              item.toggleVisibility(!item.getIsVisible());
                          } else if (
                            table
                              .getAllLeafColumns()
                              .filter((col) => col.getIsVisible()).length === 7
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
                </div>
                {index + 1 < table.getAllColumns().length && (
                  <hr className="border-border-neutral-primary" />
                )}
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
    </>
  );
};

export default Funds;
