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
import { makeData } from './components/makeData';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { columns, columnVisibility, filterList } from './FundsTable.constants';
const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();
  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState(() => makeData(500));
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);
  const [isScrollAtStart, setIsScrollAtStart] = useState<boolean>(false);
  const [isScrollAtEnd, setIsScrollAtEnd] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const tableRef = useRef<HTMLDivElement>(null);
  const [watchList, setWatchList] = useState<string[]>([]);
  const [pineWatchLis, setPineWatchList] = useState<string[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    Record<string, string[]>
  >({});

  const [customColl, setCustomColl] = useState<{active: boolean, date: string}>({active: false, date: ''})

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

  const handlerKeyboardScroll = (right: boolean) => {
    if (tableRef.current) {
      if (right) {
        tableRef.current.scrollLeft += 100;
      } else tableRef.current.scrollLeft -= 100;
    }
  };

  const toggleWatchList = (fund: { id: string }) => {
    setWatchList((prev) =>
      prev.includes(fund.id)
        ? prev.filter((id: string) => id !== fund.id)
        : [...prev, fund.id],
    );
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handleScroll = () => {
      if (tableRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        
        if (Math.round(scrollLeft) === 0) {          
          setIsScrollAtStart(false)
        } else if (scrollLeft < 0) setIsScrollAtStart(true)
        
          console.log(Math.round(scrollLeft * -1) + clientWidth, scrollWidth);
          
        
        setIsScrollAtEnd(Math.round(scrollLeft * -1) + clientWidth <= scrollWidth - 1);
      }
    };


    const table = tableRef.current;
    table?.addEventListener('scroll', handleScroll);

    const keyboardHandler = (e: KeyboardEvent) => {
      if (e.code === 'KeyA') {
        handlerKeyboardScroll(false);
      }
      if (e.code === 'KeyD') {
        handlerKeyboardScroll(true);
      }
    };
    
    document.addEventListener('keypress', keyboardHandler);

    return () => table?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    startTransition(() => {
      updateTableHeaders[0].column.setFilterValue(fundSearchQuery);
    });
  }, [fundSearchQuery, updateTableHeaders]);

  return (
    <>
      <div
        className={cn(
          'mx-auto flex w-full items-center justify-between bg-white px-8 pb-3 pt-8 transition-all duration-300',
          isHeaderVisible ? 'translate-y-0' : '-translate-y-full',
        )}
      >
        <div className="flex w-full items-center justify-start gap-3">
          <span className="pb-2.5">دسته بندی صندوق‌ها:</span>
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
          <div className="border-brand-600 rounded-md border p-1.5">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14.6865 11.5133L6.38477 10.0508V20.8575C6.38467 20.975 6.40775 21.0913 6.4527 21.1998C6.49765 21.3083 6.56358 21.4069 6.6467 21.4899C6.72983 21.5729 6.82851 21.6387 6.93711 21.6834C7.0457 21.7282 7.16206 21.7511 7.27952 21.7508H21.6045C21.7221 21.7513 21.8386 21.7285 21.9474 21.6839C22.0562 21.6392 22.155 21.5734 22.2383 21.4904C22.3216 21.4074 22.3876 21.3088 22.4327 21.2002C22.4777 21.0916 22.5009 20.9751 22.5008 20.8575V16.8758L14.6865 11.5133Z"
                fill="#185C37"
              />
              <path
                d="M14.6865 2.25H7.27952C7.16206 2.24971 7.0457 2.2726 6.93711 2.31736C6.82851 2.36213 6.72983 2.42789 6.6467 2.51088C6.56358 2.59386 6.49765 2.69244 6.4527 2.80096C6.40775 2.90947 6.38467 3.0258 6.38477 3.14325V7.125L14.6865 12L19.0823 13.4625L22.5008 12V7.125L14.6865 2.25Z"
                fill="#21A366"
              />
              <path
                d="M6.38477 7.125H14.6865V12H6.38477V7.125Z"
                fill="#107C41"
              />
              <path
                opacity="0.1"
                d="M12.3263 6.15039H6.38477V18.3379H12.3263C12.563 18.3367 12.7898 18.2423 12.9574 18.0751C13.125 17.9079 13.22 17.6814 13.2218 17.4446V7.04364C13.22 6.80689 13.125 6.58038 12.9574 6.41318C12.7898 6.24598 12.563 6.15157 12.3263 6.15039Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M11.838 6.63672H6.38477V18.8242H11.838C12.0748 18.823 12.3015 18.7286 12.4691 18.5614C12.6368 18.3942 12.7317 18.1677 12.7335 17.931V7.52997C12.7317 7.29322 12.6368 7.06671 12.4691 6.89951C12.3015 6.73231 12.0748 6.6379 11.838 6.63672Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M11.838 6.63672H6.38477V17.8492H11.838C12.0748 17.848 12.3015 17.7536 12.4691 17.5864C12.6368 17.4192 12.7317 17.1927 12.7335 16.956V7.52997C12.7317 7.29322 12.6368 7.06671 12.4691 6.89951C12.3015 6.73231 12.0748 6.6379 11.838 6.63672Z"
                fill="black"
              />
              <path
                opacity="0.2"
                d="M11.3498 6.63672H6.38477V17.8492H11.3498C11.5865 17.848 11.8133 17.7536 11.9809 17.5864C12.1485 17.4192 12.2435 17.1927 12.2453 16.956V7.52997C12.2435 7.29322 12.1485 7.06671 11.9809 6.89951C11.8133 6.73231 11.5865 6.6379 11.3498 6.63672Z"
                fill="black"
              />
              <path
                d="M2.3955 6.63672H11.349C11.5862 6.63652 11.8137 6.7305 11.9816 6.89799C12.1496 7.06549 12.2441 7.2928 12.2445 7.52997V16.4685C12.2441 16.7056 12.1496 16.933 11.9816 17.1005C11.8137 17.2679 11.5862 17.3619 11.349 17.3617H2.3955C2.27798 17.3621 2.16154 17.3393 2.05286 17.2946C1.94418 17.2499 1.84541 17.1841 1.7622 17.1011C1.679 17.0181 1.613 16.9195 1.56801 16.8109C1.52301 16.7024 1.4999 16.586 1.5 16.4685V7.52997C1.4999 7.41245 1.52301 7.29607 1.56801 7.1875C1.613 7.07894 1.679 6.98033 1.7622 6.89733C1.84541 6.81434 1.94418 6.74859 2.05286 6.70387C2.16154 6.65915 2.27798 6.63633 2.3955 6.63672Z"
                fill="url(#paint0_linear_11739_193806)"
              />
              <path
                d="M4.27539 14.9052L6.15864 11.9922L4.43364 9.0957H5.81889L6.76014 10.9505C6.84714 11.126 6.91014 11.2565 6.93864 11.3435H6.95139C7.01289 11.203 7.07789 11.0665 7.14639 10.934L8.15289 9.0987H9.42789L7.65864 11.9787L9.47289 14.9075H8.11614L7.02864 12.8742C6.97829 12.7867 6.93539 12.6951 6.90039 12.6005H6.88239C6.85061 12.6927 6.80833 12.7811 6.75639 12.8637L5.63664 14.9052H4.27539Z"
                fill="white"
              />
              <path
                d="M21.6045 2.25001H14.6858V7.125H22.5V3.14325C22.5001 3.02573 22.477 2.90935 22.432 2.80079C22.387 2.69222 22.321 2.59361 22.2378 2.51061C22.1546 2.42762 22.0559 2.36187 21.9472 2.31715C21.8385 2.27243 21.7221 2.24961 21.6045 2.25001Z"
                fill="#33C481"
              />
              <path d="M14.6858 12H22.5V16.875H14.6858V12Z" fill="#107C41" />
              <defs>
                <linearGradient
                  id="paint0_linear_11739_193806"
                  x1="3.3705"
                  y1="5.93472"
                  x2="10.374"
                  y2="18.0637"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#18884F" />
                  <stop offset="0.5" stopColor="#117E43" />
                  <stop offset="1" stopColor="#0B6631" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Tooltip>
      </div>
      <div dir='ltr' className={cn('relative top-0 flex items-center overflow-hidden')}>
        <div
          ref={tableRef}
          className="border-brand-200 table-scroll h-[calc(100vh-178px)] w-screen overflow-auto scroll-smooth border-2 border-r-0"
        >
          <table
          dir='rtl'
            className="w-full table-fixed rounded-xl bg-white text-center"
          >
            <thead
              className={cn(
                'group sticky right-0 top-0 z-30 m-0 w-fit rounded-md border-b-2 p-0 duration-300',
              )}
            >
              <tr className="overflow-hidden rounded-md p-0">
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
                          <Icon name="arrow-right" />
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
                            'sticky right-0 top-0 z-40 m-0 w-[312px] overflow-y-hidden p-0',
                            isScrollAtStart ? 'shadow' : 'shadow-none',
                          )}
                        >
                                                       <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? 'cursor-pointer h-[70px] select-none'
                                    : '',
                                }}
                              >

                          <OptionsDropdown
                            dropDownStyles={{
                              size: 'md',
                              anchor: 'bottom start',
                              bg: 'primary',
                              emphasize: 'medium',
                              checkSelected: true,
                            }}
                            customOptionRender={(prop) => (
                              <>
                                <div
                                  onClick={() => {
                                    if (
                                      prop.text === 'مرتب سازی نزولی' &&
                                      header.column.getIsSorted() !== 'desc'
                                    ) {
                                      header.column.toggleSorting(true);
                                    }
                                    if (
                                      prop.text === 'مرتب سازی صعودی' &&
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
                                {prop.text === 'مرتب سازی صعودی' && <hr />}
                              </>
                            )}
                            customTriggerRender={() => (
                              <div className="rounde w-full">
                                <FundsColumn
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
                                    (filterItem) => filterItem.id === header.id,
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
                                ></FundsColumn>
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
                            )}
                            dropDownList={[
                              {
                                text: 'مرتب سازی نزولی',
                                icon: {
                                  name: 'arrow-down-narrow-wide',
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
                            ]}
                          ></OptionsDropdown>
                              </div>

                        </th>
                      )}
                      {index >= 1 && (
                        <th
                          className={cn(
                            'm-0 overflow-y-hidden p-0 text-sm font-medium',
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
                                    ? 'cursor-pointer h-[72px] select-none'
                                    : '',
                                }}
                              >
                                <OptionsDropdown
                                  dropDownStyles={{
                                    size: 'md',
                                    anchor: 'bottom start',
                                    bg: 'primary',
                                    emphasize: 'medium',
                                    checkSelected: true,
                                  }}
                                  customOptionRender={(prop) => (
                                    <>
                                      <div
                                        onClick={() => {
                                          if (prop.text === 'انتقال به راست') {
                                            moveColumn(
                                              header.column.id,
                                              'right',
                                            );
                                          }
                                          if (prop.text === 'انتقال به چپ') {
                                            moveColumn(
                                              header.column.id,
                                              'left',
                                            );
                                          }
                                          if (prop.text === 'انتقال به ابتدا') {
                                            moveColumn(
                                              header.column.id,
                                              'start',
                                            );
                                          }
                                          if (prop.text === 'انتقال به انتها') {
                                            moveColumn(header.column.id, 'end');
                                          }
                                          if (
                                            prop.text === 'مرتب سازی نزولی' &&
                                            header.column.getIsSorted() !==
                                              'desc'
                                          ) {
                                            header.column.toggleSorting(true);
                                          }
                                          if (
                                            prop.text === 'مرتب سازی صعودی' &&
                                            header.column.getIsSorted() !==
                                              'asc'
                                          ) {
                                            header.column.toggleSorting(false);
                                          }
                                        }}
                                        className={cn(
                                          'hover:bg-brand-50 hover:text-brand-800 flex cursor-pointer items-center gap-2 bg-white p-2',
                                          {
                                            'cursor-default text-gray-100 hover:bg-white hover:text-gray-100':
                                              (index === 1 &&
                                                (prop.text ===
                                                  'انتقال به ابتدا' ||
                                                  prop.text ===
                                                    'انتقال به راست')) ||
                                              (index + 1 ===
                                                updateTableHeaders.length &&
                                                (prop.text ===
                                                  'انتقال به انتها' ||
                                                  prop.text ===
                                                    'انتقال به چپ')),
                                            'text-brand-800':
                                              (header.column.getIsSorted() ===
                                                'desc' &&
                                                prop.text ===
                                                  'مرتب سازی نزولی') ||
                                              (header.column.getIsSorted() ===
                                                'asc' &&
                                                prop.text ===
                                                  'مرتب سازی صعودی'),
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
                                      {prop.text === 'مرتب سازی صعودی' && (
                                        <hr />
                                      )}
                                    </>
                                  )}
                                  customTriggerRender={() => (
                                    <div className="w-full !bg-yellow-600">
                                      <FundsColumn
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
                                        name: 'arrow-down-narrow-wide',
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
                <th className="sticky left-10 m-0 mt-5">
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
                          <Icon name="arrow-left" />
                        </button>
                      </Tooltip>
                    </div>
                  )}
                </th>
              </tr>
            </thead>
            <tbody className="relative w-full overflow-hidden rounded-b-md">
              {indexCategoryTab === 0 ? (
                table.getRowModel().rows.length ? (
                  (() => {
                    const pinnedRows = table
                      .getRowModel()
                      .rows.filter((row) => row.getIsPinned());
                    const lastPinnedRowId = pinnedRows.length
                      ? pinnedRows[pinnedRows.length - 1].id
                      : null;

                    const allRows = [
                      ...pinnedRows,
                      ...table
                        .getRowModel()
                        .rows.filter((row) => !row.getIsPinned()),
                    ];

                    return allRows.map((row, rowIndex) => {
                      const pinnedIndex = pinnedRows.findIndex(
                        (pinnedRow) => pinnedRow.id === row.id,
                      );
                      const topValue =
                        pinnedIndex !== -1
                          ? `${(pinnedIndex + 1) * 70}px`
                          : 'auto';

                      return (
                        <tr
                          style={{ top: topValue }}
                          className={cn(
                            'group border-t h-[60px] -top-4 border-blue-100',
                            row.getIsPinned() && `sticky z-30`,
                            {
                              'shadow-2xl': row.id === lastPinnedRowId,
                              'bg-blue-200': false,
                              'group-hover:bg-blue-50': !false && !false,
                            },
                          )}
                          key={row.id}
                        >
                          <td
                            className={cn({
                              'bg-blue-50 group-hover:bg-blue-100': false,
                              'bg-blue-200': false,
                              'group-hover:bg-blue-50': !false && rowIndex,
                            })}
                          ></td>
                          {row.getVisibleCells().map((cell, index) => {
                            return (
                              <React.Fragment key={cell.id}>
                                {index === 0 && (
                                  <td className="sticky right-0 m-0 p-0">
                                    <FundsTableRow
                                      tag={false}
                                      category={
                                        watchList.includes(row.id)
                                          ? 'watchlist'
                                          : 'stocks'
                                      }
                                      canPin={
                                        pinnedRows.length <= 2 ? true : false
                                      }
                                      toggleWatchList={() =>
                                        toggleWatchList({ id: row.id })
                                      }
                                      pinedFunction={() =>
                                        row.pin('top', true)
                                      }
                                      unPinedFunction={() => row.pin(false)}
                                      isScrolled={isScrollAtStart}
                                      investmentMethod={
                                        row.original.investmentMethod
                                      }
                                      name={row.original.nameFund}
                                      pined={Boolean(row.getIsPinned())}
                                      selected={false}
                                      logo={row.original.logo}
                                    />
                                  </td>
                                )}
                                {index >= 1 && (
                                  <td
                                    className={cn({
                                      'bg-blue-50 group-hover:bg-blue-100':
                                        row.getIsPinned(),
                                      'bg-blue-200': false,
                                      'group-hover:bg-blue-50':
                                        !row.getIsPinned(),
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
                      );
                    });
                  })()
                ) : (
                  <tr className="fixed right-[calc(50%-150px)] mt-5 w-full text-gray-600">
                    <td className="text-sm">
                      صندوقی یافت نشد! لطفا فیلتر هارا بازنشانی کنید.
                    </td>
                  </tr>
                )
              ) : watchList.length > 0 ? (
                table.getRowModel().rows.length ? (
                  (() => {
                    const pinnedRows = table
                      .getRowModel()
                      .rows.filter((row) => pineWatchLis.includes(row.id));

                    const allRows = [
                      ...pinnedRows,
                      ...table
                        .getRowModel()
                        .rows.filter((row) => !pineWatchLis.includes(row.id)),
                    ];

                    const filteredRows = allRows.filter((row) =>
                      watchList.includes(row.id),
                    );

                    return filteredRows.map((row, rowIndex) => {
                      const pinnedIndex = pinnedRows.findIndex(
                        (pinnedRow) => pinnedRow.id === row.id,
                      );
                      const topValue =
                        pinnedIndex !== -1
                          ? `${(pinnedIndex + 1) * 70}px`
                          : 'auto';

                      return (
                        <tr
                          style={{ top: topValue }}
                          className={cn(
                            'border group border-blue-100',
                            pineWatchLis.includes(row.id) && `sticky z-40`,
                            {
                              'shadow-2xl': pineWatchLis.includes(row.id),
                              'bg-blue-200': false,
                              'group-hover:bg-blue-50': !false && !false,
                            },
                          )}
                          key={row.id}
                        >
                          <td
                            className={cn({
                              'bg-blue-50 group-hover:bg-blue-100': false,
                              'bg-blue-200': false,
                              'group-hover:bg-blue-50': !false && rowIndex,
                            })}
                          ></td>
                          {row.getVisibleCells().map((cell, index) => {
                            return (
                              <React.Fragment key={cell.id}>
                                {index === 0 && (
                                  <td className="sticky z-40 right-0 m-0 p-0">
                                    <FundsTableRow
                                      tag={true}
                                      category="watchlist"
                                      canPin={
                                        pineWatchLis.length <= 2 ? true : false
                                      }
                                      toggleWatchList={() =>
                                        toggleWatchList({ id: row.id })
                                      }
                                      pinedFunction={() =>
                                        setPineWatchList([
                                          ...pineWatchLis,
                                          row.id,
                                        ])
                                      }
                                      unPinedFunction={() =>
                                        setPineWatchList((prev) =>
                                          prev.filter((id) => id !== row.id),
                                        )
                                      }
                                      isScrolled={isScrollAtStart}
                                      investmentMethod={
                                        row.original.investmentMethod
                                      }
                                      name={row.original.nameFund}
                                      pined={pineWatchLis.includes(row.id)}
                                      selected={false}
                                      logo={row.original.logo}
                                    />
                                  </td>
                                )}
                                {index >= 1 && (
                                  <td
                                    className={cn({
                                      'bg-blue-50 group-hover:bg-blue-100':
                                        pineWatchLis.includes(row.id),
                                      'bg-blue-200': false,
                                      'group-hover:bg-blue-50':
                                        !pineWatchLis.includes(row.id),
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
                      );
                    });
                  })()
                ) : (
                  <tr className="fixed right-[calc(50%-150px)] mt-5 w-full text-gray-600">
                    <td className="text-sm">
                      صندوقی یافت نشد! لطفا فیلتر هارا بازنشانی کنید.
                    </td>
                  </tr>
                )
              ) : (
                <tr className="fixed right-[calc(50%-150px)] mt-5 w-full text-gray-600">
                  <td className="text-sm">صندوقی در دیده بان وجود ندارد.</td>
                </tr>
              )}

              <tr className="h-[60px]">
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-6 right-0 mt-6 flex w-full justify-between px-8">
        <div className="rounded-md bg-gray-400 py-2">
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
              <div className="flex items-center gap-2 px-3 text-xs font-medium">
                <span>تعداد سطر در جدول: </span>
                {prop.selectedItem.text}
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

        <span className="rounded-md bg-gray-300 px-3 py-2 text-xs font-medium">
          مجموعه ارزش خالص دارایی‌ها : 10,986,249.09
        </span>
        <div className="flex items-center gap-2 rounded-md bg-gray-400 px-3 py-2">
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
              'cursor-default text-gray-300':
                table.getState().pagination.pageIndex + 1 === 1,
            })}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon size="lg" name="chevron-right" />
          </button>
          <button
            className={cn('cursor-pointer rounded', {
              'cursor-default text-gray-300': !table.getCanNextPage(),
            })}
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon size="lg" name="chevron-left" />
          </button>
        </div>
      </div>

      <Dialog
        open={isSettingModal}
        as="div"
        className="relative z-40 focus:outline-none"
        onClose={() => setIsSettingModal(false)}
      >
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="absolute right-0 top-0 h-screen w-screen bg-black opacity-[0.15]"></div>
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="shadow-3xl data-[closed]:transform-[scale(0%)] relative w-full max-w-lg rounded-3xl bg-white duration-300 ease-out data-[closed]:opacity-0"
            >
              <DialogTitle className="flex items-center justify-between">
                <span
                  className={cn('p-6 text-xl font-medium', {
                    'text-red-600':
                      table
                        .getAllLeafColumns()
                        .filter((col) => col.getIsVisible()).length === 25,
                  })}
                >
                  انتخاب ستون‌ها (
                  {
                    table
                      .getAllLeafColumns()
                      .filter((col) => col.getIsVisible()).length
                  }
                  /25)
                </span>
                {isChanged && (
                  <span
                    className="m-6 cursor-pointer text-base font-medium text-red-600"
                    onClick={() => table.resetColumnVisibility()}
                  >
                    بازنشانی به پیشفرض
                  </span>
                )}
              </DialogTitle>
              <hr />
              <div className="scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-gray-300 mb-6 h-[550px] overflow-x-hidden overflow-y-scroll">
                {table.getAllColumns().map((item, index) => (
                  <div className="mt-6" key={index}>
                    <span className="mb-4 mr-4 text-base font-semibold">
                      {item.columnDef.header?.toString()}
                    </span>
                    <div className="grid grid-cols-2 pr-6">
                      {item.columns.map((item, index) => (
                        <div
                          className="hover:bg-brand-100 rounded-md p-3"
                          key={index}
                        >
                          {item && (
                            <Checkbox
                              onChange={() => {
                                if (item.columnDef.header?.toString() === 'بازه دلخواه') {
                                  setCustomColl({active: true, date: ''})
                                }
                                if (
                                  table
                                    .getAllLeafColumns()
                                    .filter((col) => col.getIsVisible())
                                    .length === 25
                                ) {
                                  if (item.getIsVisible())
                                    item.toggleVisibility(!item.getIsVisible());
                                } else if (
                                  table
                                    .getAllLeafColumns()
                                    .filter((col) => col.getIsVisible())
                                    .length === 7
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
                ))}
              </div>
              <div
                  onClick={() => setIsSettingModal(false)}
                  className="text-brand-600 absolute w-[28px] h-[28px] -left-2 -top-2 z-10 cursor-pointer rounded-full bg-white"
                >
                  <div className='-mt-0.5'>

                  <Icon name="circle-x" size="lg_plus" />
                  </div>
                </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={isFilterModal}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setIsFilterModal(false)}
      >
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
          <div className="absolute right-0 top-0 h-screen w-screen bg-black opacity-[0.15]"></div>
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="shadow-3xl data-[closed]:transform-[scale(0%)] relative z-20 w-full max-w-lg rounded-3xl bg-white duration-300 ease-out data-[closed]:opacity-0"
            >
              <div className='w-full bg-white h-[620px] overflow-y-auto overflow-x-hidden'>
                <div
                  onClick={() => setIsFilterModal(false)}
                  className="text-brand-600 absolute w-[28px] h-[28px] -left-2 -top-2 z-10 cursor-pointer rounded-full bg-white"
                >
                  <div className='-mt-0.5'>

                  <Icon name="circle-x" size="lg_plus" />
                  </div>
                </div>
                <div className="my-4 flex w-full flex-col gap-2">
                  <FilterPopUpSection
                    searchValue={fundSearchQuery}
                    onSearchChange={setFundSearchQuery}
                    filterOptions={filterList}
                    selectedFilters={selectedFilters}
                    onFilterChange={setSelectedFilters}
                  />
                </div>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
      <Dialog
        open={customColl.active}
        as="div"
        className="relative z-50 focus:outline-none"
        onClose={() => setCustomColl({active: false, date: ''})}
      >
        <div className="fixed inset-0 z-30 w-screen flex justify-center overflow-y-auto">
          <div className="absolute right-0 top-0 h-screen w-screen bg-black opacity-[0.15]"></div>
          <div className="flex min-h-full w-screen items-center justify-center">
            <DialogPanel
              transition
              className="shadow-3xl data-[closed]:transform-[scale(0%)] relative z-20 rounded-3xl mx-auto duration-300 ease-out data-[closed]:opacity-0"
            >
                <DatePicker 
                isOpen={customColl.active} 
                onClose={() => setCustomColl({active: false, date: ''})} 
                dateRange={{end: '1404-12-12', start: '1300-01-12'}} 
                max='1404-12-12'
                min='1300-01-12'
                setDateRange={(date) => {
                  setCustomColl({active: false, date: 'date'});
                }} ></DatePicker>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default Funds;
