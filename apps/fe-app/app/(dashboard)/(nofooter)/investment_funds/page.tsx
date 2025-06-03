'use client';
import React, {
  CSSProperties,
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
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  closestCenter,
  type DragEndEvent,
  useSensor,
  useSensors,
  DragOverlay,
  useDndMonitor,
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
  FundsTableRow,
  FilterPopUpSection,
  FundsColumnHeader,
  Dialog,
  Checkbox,
} from 'design-system';
import {
  Cell,
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
import { useSortable } from '@dnd-kit/sortable';
import { Person, makeData } from './_components/makeData';
import { columnVisibility, filterList } from './FundsTable.constants';
import { ExportExel } from './_components/ExportExel';
import { Bookmark } from 'libs/design-system/src/lib/components/Bookmark';
import { useSmartTableScroll } from 'apps/fe-app/hooks/useSmartTableScroll';
const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [rowMarks, setRowMarks] = useState<{
    [tabIndex: number]: { [id: string]: string };
  }>({});
  const [canScrollVertical, setCanScrollVertical] = useState(false);
  const [activeIndexCategoryTab, setActiveIndexCategoryTab] = useState(0);
  const [data] = useState(() => makeData(500));
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [pineWatchLis, setPineWatchList] = useState<string[]>([]);
  const [sorting, setSorting] = useState<SortingState>([
    {
      id: 'nameFund',
      desc: false,
    },
  ]);
  const [activeSortIndex, setActiveSortIndex] = useState(0);
  const headerRefs = useRef<(HTMLTableHeaderCellElement | null)[]>([]);
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
      {
        accessorKey: 'logo',
        header: 'Logo',
        id: 'logo',
        size: 100,
        enableSorting: true,
        cell: (info) => (
          <img
            src={info.getValue<string>()}
            alt="Logo"
            width={30}
            height={30}
          />
        ),
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

  type DragPosition = 'left' | 'right';

  const dragOverRef = {
    columnId: null as string | null,
    position: null as DragPosition | null,
  };

  const useDragIndicator = () => {
    const [, forceRender] = useState({});

    useDndMonitor({
      onDragOver(event) {
        const overId = event.over?.id;
        const activeId = event.active?.id;
        const clientX = (event.activatorEvent as PointerEvent).clientX;

        if (!overId || !activeId || !clientX) return;

        const overEl = document.querySelector(
          `[data-column-id="${overId}"]`,
        ) as HTMLElement;
        if (!overEl) return;

        const overRect = overEl.getBoundingClientRect();
        const midpoint = overRect.left + overRect.width / 2;

        // اینجا فقط سمت ماوس نسبت به ستون مقصد (overId) رو بررسی می‌کنیم
        const pos: DragPosition = clientX > midpoint ? 'right' : 'left';

        if (dragOverRef.columnId !== overId || dragOverRef.position !== pos) {
          dragOverRef.columnId = String(overId);
          dragOverRef.position = pos;
          forceRender({});
        }
      },
      onDragEnd() {
        dragOverRef.columnId = null;
        dragOverRef.position = null;
        forceRender({});
      },
    });

    return dragOverRef;
  };

  const DraggableTableHeader = ({
    header,
    children,
    width,
  }: {
    header: Header<Person, unknown>;
    children: React.ReactNode;
    width: number;
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
        className="relative m-0 h-[64px] w-full bg-[#E3F8F8] p-0 text-sm font-medium"
        style={{
          transition: 'width transform 0.1s ease-in-out',
          whiteSpace: 'nowrap',
          width,
        }}
      >
        {isDraggingOver && position && (
          <div
            className={`bottom-0 absolute top-1 z-10 h-[90%] w-0.5 bg-[#0F7575] ${
              position === 'left' ? 'right-0' : 'left-0'
            }`}
          >
            <div className="absolute top-0 flex h-2.5 w-2.5 translate-x-1 items-center justify-center rounded-full bg-[#0F7575]">
              <div className="h-1.5 w-1.5 rounded-full bg-white" />
            </div>
          </div>
        )}
        {children}
      </th>
    );
  };

  const DragAlongCell = ({
    cell,
    children,
  }: {
    cell: Cell<Person, unknown>;
    children: React.ReactNode;
  }) => {
    const { setNodeRef } = useSortable({
      id: cell.column.id,
    });

    const style: CSSProperties = {
      position: 'relative',
      width: cell.column.getSize(),
    };

    return (
      <td
        className="mx-auto h-full border-transparent"
        style={style}
        ref={setNodeRef}
      >
        <div className="flex items-center justify-center">{children}</div>
      </td>
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

  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        delay: 100,
        distance: 0,
      },
    }),
    useSensor(TouchSensor, {}),
    useSensor(KeyboardSensor, {}),
  );

  const [customColl, setCustomColl] = useState<{
    active: boolean;
    date: string;
  }>({ active: false, date: '' });

  const table = useReactTable({
    data,
    columns: columns,
    state: { columnOrder, sorting },
    initialState: {
      columnVisibility,
      sorting: sorting,
    },
    onSortingChange: (updater) => {
      const newSorting =
        typeof updater === 'function' ? updater(sorting) : updater;
      const sortedColumnId = newSorting[0]?.id;
      setSorting(newSorting);
    },
    onColumnOrderChange: setColumnOrder,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

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
  }, [activeIndexCategoryTab, tableCount]);

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

  useEffect(() => {
    columnOrder.findIndex((id, index) => {
      if (id === sorting[0]?.id && activeSortIndex !== 0) {
        setActiveSortIndex(index - 1);
      }
    });
  }, [columnOrder]);

  return (
    <>
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

      <div
        dir="ltr"
        className={cn(
          'relative top-0 flex items-center overflow-hidden border-t-2 border-[#BCEBEB]',
        )}
      >
        <div
          onMouseEnter={handlerMouseEnterTable}
          ref={tableRef}
          // onScroll={handlerScroll}
          className='table-scroll group/table scrollbar-md h-[calc(100vh-172px)] w-screen scroll-smooth overflow-auto'>
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl bg-white text-center"
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
              <thead className="group sticky right-0 top-0 z-50 m-0 p-0 duration-300 [box-shadow:0_2px_0_#bcebeb]">
                <tr>
                  <div
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
                    className={cn('z-[999999999999999] duration-300', {
                      'absolute bottom-0 z-20 transition-transform':
                        activeSortIndex !== 0,
                      'group-hover/table:-right-0':
                        activeSortIndex !== 0 &&
                        canScrollVertical &&
                        isScrollAtStart,
                      'fixed right-[215px] top-[240px] z-10 w-fit':
                        activeSortIndex === 0,
                      'top-[157px]': activeSortIndex === 0 && !isHeaderVisible,
                    })}
                  >
                    <div className="bg-brand-600 mx-auto h-1.5 w-16 rounded-t-[10px]"></div>
                  </div>
                  <div className="sticky right-[340px] z-30 mt-5 p-0">
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
                  </div>
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
                              className='sticky right-0 top-0 z-20 m-0 h-[64px] w-[385px] border-b bg-[#E3F8F8] py-0' >
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
                          {index > 0 && (
                            <DraggableTableHeader
                              width={
                                String(
                                  flexRender(
                                    header.column.columnDef.header,
                                    header.getContext(),
                                  ),
                                ).length > 10
                                  ? 200
                                  : 144
                              }
                              key={header.id}
                              header={header}
                            >
                              <th
                                ref={(el) => {
                                  if (headerRefs?.current) {
                                    headerRefs.current[index] = el;
                                  }
                                }}
                                key={index}
                                className={cn(
                                  'm-0 p-0 h-[64px] w-full text-nowrap bg-[#E3F8F8] text-sm font-medium',
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
                                      activePlaceholder={
                                        activeId !== header.id
                                      }
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
                              </th>
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
                          className="absolute transition-none top-0 mt-9 flex -rotate-12 items-start justify-center"
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
                            <div className="flex h-20 w-full items-center justify-center bg-[#BCEBEB]">
                              {activeId}
                            </div>
                          )}
                        </th>
                      ) : (
                        <></>
                      )}
                    </DragOverlay>
                  </SortableContext>
                  <div className="fixed left-[35px] m-0 mt-5">
                    {isScrollAtEnd && (
                      <div
                        onMouseDown={startScrollRight}
                        onMouseLeave={stopScroll}
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
                  </div>
                </tr>
              </thead>
            </DndContext>

            <tbody className="relative w-full overflow-hidden">
              {(() => {
                const isMainTab = activeIndexCategoryTab === 0;
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
                          ? 'صندوقی یافت نشد! لطفا فیلتر‌هارا بازنشانی کنید.'
                          : watchList.length === 0
                            ? 'صندوقی در دیده بان وجود ندارد.'
                            : 'صندوقی یافت نشد! لطفا فیلتر هارا بازنشانی کنید.'}
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
                          'group h-[48px] border-b border-[#E1E2E5]',
                          {
                            'bg-blue-50 group-hover:bg-[#4991e9]': isPinned,
                          },
                        )}
                      >
                        <td></td>
                        {row.getVisibleCells().map((cell, index) => {
                          return (
                            <>
                              {index === 0 && (
                                <td className="sticky right-0 top-0 z-40 m-0 flex items-center py-0">
                                  <div
                                    className='absolute z-50 pr-0'>
                                    <Bookmark
                                      selectedColor={
                                        rowMarks[activeIndexCategoryTab]?.[
                                          row.id
                                        ] || ''
                                      }
                                      onColorChange={(color) =>
                                        handleColorChange(row.id, color)
                                      }
                                    />
                                  </div>
                                  <div
                                    className={cn(
                                      'group-hover:bg-blue-50',
                                      {
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
                              {index > 0 && (
                                <SortableContext
                                  key={cell.id}
                                  items={columnOrder}
                                  strategy={horizontalListSortingStrategy}
                                >
                                  <DragAlongCell key={cell.id} cell={cell}>
                                    <td
                                      className={cn(
                                        'flex h-[46px] w-full items-center justify-center border-[#E1E2E5] p-0 text-sm font-medium',
                                        {
  
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
                                  </DragAlongCell>
                                </SortableContext>
                              )}
                            </>
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

      <div className="fixed bottom-6 right-0 z-50 mt-6 flex w-full justify-between px-8">
        <div className="rounded-md bg-[#B3B6BD8C] backdrop-blur-[30px]">
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
                {index + 1 < table.getAllColumns().length && <hr />}
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
