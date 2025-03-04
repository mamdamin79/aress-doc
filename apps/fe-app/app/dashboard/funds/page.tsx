'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useHeaderVisibility } from '../../../hooks/useHeaderVisiblity';
import {
  cn,
  Icon,
  Tabs,
  Tooltip,
  formatNumber,
  OptionsDropdown,
  FundsTableRow,
  FundsTag,
  FilterPopUpSection,
  FundsColumn,
  Checkbox,
} from 'design-system';
import {
  Column,
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { makeData, Person } from './components/makeData';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

const Funds = () => {
  const { isHeaderVisible } = useHeaderVisibility();

  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const [data, setData] = useState(() => makeData(500));

  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);

  const [scrolleLeft, setScrollLeft] = useState<boolean>(false);
  const [scrollRight, setScrollRight] = useState<boolean>(true);
  const [fundSearchQuery, setFundSearchQuery] = useState<string>('');
  const columnVisibility = {
    profitPerUnit: false,
    investmentPolicy: false,
    fundCategory: false,
    trustee: false,
    fundManager: false,
    liquidityGuarantor: false,
    auditor: false,
    participationBonds: false,
    bankDeposit: false,
    commodityDeposit: false,
    cash: false,
    otherStocks: false,
    otherAssets: false,
    statisticalPrice: false,
    customRangeReturn: false,
    customRangeAlpha: false,
    weeklyStdDev: false,
    customRangeStdDev: false,
    weeklyMaxDrawdown: false,
    customRangeMaxDrawdown: false,
    weeklyLeverage: false,
    monthlyLeverage: false,
    quarterlyLeverage: false,
    yearlyLeverage: false,
    customRangeLeverage: false,
    weeklySharpeRatio: false,
    monthlySharpeRatio: false,
    quarterlySharpeRatio: false,
    customRangeSharpeRatio: false,
    weeklyInfoRatio: false,
    monthlyInfoRatio: false,
    quarterlyInfoRatio: false,
    customRangeInfoRatio: false,
  };
  const tableRef = useRef<HTMLDivElement>(null);
  const filterList = [
    { title: 'ویدیو بررسی', options: ['دارد', 'ندارد'] },
    {
      title: 'بازه اضافه یک ساله نسبت به شاخص کل',
      options: [
        'بازده منفی',
        'از صفر تا 5 درصد',
        'از 5 تا 10 درصد',
        'از 10 تا 20 درصد',
        'از 20 تا 50 درصد',
        'بیشتر از 50 درصد',
      ],
    },
    {
      title: 'بازده یک ساله',
      options: [
        'بازده منفی',
        'از صفر تا 30 درصد',
        'از 30 تا 50 درصد',
        'از 50 تا 100 درصد',
        'از 100 تا 200 درصد',
        'بیشتر از 200 درصد',
      ],
    },
    {
      title: 'شیوه سرمایه گذاری',
      options: ['قابل معامله (ETF)', 'صدور و ابطال'],
    },
  ];

  const columns: ColumnDef<Person>[] = [
    {
      header: 'نام صندوق',
      accessorKey: 'nameFund',
    },
    {
      header: 'مشخصات صندوق',
      columns: [
        { accessorKey: 'unitCount', header: 'تعداد واحد' },
        { accessorKey: 'startDate', header: 'تاریخ آغاز فعالیت' },
        { accessorKey: 'profitPerUnit', header: 'سود هر واحد صندوق' },
        { accessorKey: 'netAssetValue', header: 'کل ارزش خالص دارایی‌ها' },
        { accessorKey: 'investmentPolicy', header: 'سیاست سرمایه‌گذاری' },
        { accessorKey: 'fundCategory', header: 'دسته‌بندی صندوق' },
      ],
    },
    {
      header: 'ارکان صندوق',
      columns: [
        { accessorKey: 'trustee', header: 'متولی' },
        { accessorKey: 'fundManager', header: 'مدیر صندوق' },
        { accessorKey: 'liquidityGuarantor', header: 'ضامن نقدشوندگی' },
        { accessorKey: 'auditor', header: 'حسابرس' },
      ],
    },
    {
      header: 'سهم پرتفوی صندوق',
      columns: [
        { accessorKey: 'participationBonds', header: 'اوراق مشارکت' },
        { accessorKey: 'bankDeposit', header: 'سپرده بانکی' },
        { accessorKey: 'commodityDeposit', header: 'گواهی سپرده کالایی' },
        { accessorKey: 'cash', header: 'وجه نقد' },
        { accessorKey: 'otherStocks', header: 'سایر سهام' },
        { accessorKey: 'otherAssets', header: 'سایر دارایی‌ها' },
      ],
    },
    {
      header: 'قیمت',
      columns: [
        { accessorKey: 'statisticalPrice', header: 'آماری' },
        { accessorKey: 'cancellationPrice', header: 'ابطال' },
        { accessorKey: 'issuancePrice', header: 'صدور' },
      ],
    },
    {
      header: 'بازده',
      columns: [
        { accessorKey: 'dailyReturn', header: 'روزانه' },
        { accessorKey: 'weeklyReturn', header: 'هفتگی' },
        { accessorKey: 'monthlyReturn', header: 'ماهانه' },
        { accessorKey: 'quarterlyReturn', header: 'سه ماهه' },
        { accessorKey: 'yearlyReturn', header: 'یک ساله' },
        { accessorKey: 'customRangeReturn', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'آلفا',
      columns: [
        { accessorKey: 'dailyAlpha', header: 'روزانه' },
        { accessorKey: 'weeklyAlpha', header: 'هفتگی' },
        { accessorKey: 'monthlyAlpha', header: 'ماهانه' },
        { accessorKey: 'quarterlyAlpha', header: 'سه ماهه' },
        { accessorKey: 'yearlyAlpha', header: 'یک ساله' },
        { accessorKey: 'customRangeAlpha', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'انحراف معیار',
      columns: [
        { accessorKey: 'weeklyStdDev', header: 'هفتگی' },
        { accessorKey: 'monthlyStdDev', header: 'ماهانه' },
        { accessorKey: 'quarterlyStdDev', header: 'سه ماهه' },
        { accessorKey: 'yearlyStdDev', header: 'یک ساله' },
        { accessorKey: 'customRangeStdDev', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'بیشترین ریزش',
      columns: [
        { accessorKey: 'weeklyMaxDrawdown', header: 'هفتگی' },
        { accessorKey: 'monthlyMaxDrawdown', header: 'ماهانه' },
        { accessorKey: 'quarterlyMaxDrawdown', header: 'سه ماهه' },
        { accessorKey: 'yearlyMaxDrawdown', header: 'یک ساله' },
        { accessorKey: 'customRangeMaxDrawdown', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'میانگین اهرم',
      columns: [
        { accessorKey: 'weeklyLeverage', header: 'هفتگی' },
        { accessorKey: 'monthlyLeverage', header: 'ماهانه' },
        { accessorKey: 'quarterlyLeverage', header: 'سه ماهه' },
        { accessorKey: 'yearlyLeverage', header: 'یک ساله' },
        { accessorKey: 'customRangeLeverage', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'نسبت شارپ',
      columns: [
        { accessorKey: 'weeklySharpeRatio', header: 'هفتگی' },
        { accessorKey: 'monthlySharpeRatio', header: 'ماهانه' },
        { accessorKey: 'quarterlySharpeRatio', header: 'سه ماهه' },
        { accessorKey: 'yearlySharpeRatio', header: 'یک ساله' },
        { accessorKey: 'customRangeSharpeRatio', header: 'بازه دلخواه' },
      ],
    },
    {
      header: 'نسبت اطلاعاتی',
      columns: [
        { accessorKey: 'weeklyInfoRatio', header: 'هفتگی' },
        { accessorKey: 'monthlyInfoRatio', header: 'ماهانه' },
        { accessorKey: 'quarterlyInfoRatio', header: 'سه ماهه' },
        { accessorKey: 'yearlyInfoRatio', header: 'یک ساله' },
        { accessorKey: 'customRangeInfoRatio', header: 'بازه دلخواه' },
      ],
    },
  ];

  const table = useReactTable({
    data,
    columns,
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

  useEffect(() => {
    setUpdateTableHeaders([...table.getHeaderGroups()[1].headers]);
  }, [table.getState().columnVisibility]);

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

  useEffect(() => {
    const scrollToRight = () => {
      if (tableRef.current) {
        tableRef.current.scrollLeft = tableRef.current.scrollWidth;
      }
    };
    setTimeout(scrollToRight, 0);
  }, []);

  const isChanged = useMemo(() => {
    return (
      JSON.stringify(table.getState().columnVisibility) !==
      JSON.stringify(columnVisibility)
    );
  }, [table.getState().columnVisibility]);

  const handlerKeyboardScroll = (right: boolean) => {
    if (tableRef.current) {
      if (right) {
        tableRef.current.scrollLeft += 100;
      } else tableRef.current.scrollLeft -= 100;
    }
  };

  useEffect(() => {
    const keyboardHandler = (e: KeyboardEvent) => {
      console.log(e);
      
      if (e.code === 'KeyA') {
        handlerKeyboardScroll(false);
      }
      if (e.code === 'KeyD') {
        handlerKeyboardScroll(true);
      }
    };

    document.addEventListener('keypress', keyboardHandler);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        console.log(tableRef?.current?.scrollLeft);
        
        const { scrollLeft, scrollWidth, clientWidth } = tableRef.current;
        setScrollLeft(!(scrollLeft + clientWidth >= scrollWidth - 1));
      }
    };

    const table = tableRef.current;
    table?.addEventListener('scroll', handleScroll);

    return () => table?.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    updateTableHeaders[0].column.setFilterValue(fundSearchQuery)
  }, [fundSearchQuery, updateTableHeaders])

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
                  <stop stop-color="#18884F" />
                  <stop offset="0.5" stop-color="#117E43" />
                  <stop offset="1" stop-color="#0B6631" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </Tooltip>
      </div>
      <div
        className={cn(
          'relative top-0 flex items-center overflow-hidden')}
      >
        <div
          dir="ltr"
          ref={tableRef}
          className="border-brand-200 scroll-smooth table-scroll h-[calc(100vh-178px)] w-screen overflow-scroll border-2 border-r-0"
        >
          <table
            dir="rtl"
            className="w-full table-fixed rounded-xl bg-white text-center"
          >
            <thead
              className={cn(
                'group sticky right-0 top-0 z-30 m-0 w-fit rounded-md border-b-2 p-0 duration-300',
              )}
            >
              <tr className="overflow-hidden rounded-md p-0">
                <th className="sticky right-[270px] z-50 mt-5 p-0">
                  {scrolleLeft && (
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
                    <>
                      {index === 0 && (
                        <th className={cn("bg-red-200 sticky right-0 top-0 z-40 m-0 w-[312px] rounded-tr-md p-0", (
                          scrolleLeft ? 'shadow' : 'shadow-none'
                        ))}>
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
                                    'hover:bg-brand-50 hover:text-brand-800 overflow-y-hidden flex cursor-pointer items-center gap-2 bg-white p-2',
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
                              <div className="w-full rounded-tr-md">
                                <FundsColumn
                                  filtered={!!header.column.getIsSorted()}
                                  clickFilterd={() =>
                                    header.column.getToggleSortingHandler()?.(
                                      new Event('click'),
                                    )
                                  }
                                  size="extraLarg"
                                  shadow={scrolleLeft}
                                  type={
                                    header.column.getIsSorted() === 'asc'
                                      ? 'active-desc'
                                      : header.column.getIsSorted() === 'desc'
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
                                <div className="absolute top-5 flex items-center gap-2 pr-4">
                                  <Tooltip title="انتخاب ستون ها">
                                    <div
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        setIsSettingModal(true);
                                      }}
                                      className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                    >
                                      {isChanged && (
                                        <div className="absolute -right-1 -top-1">
                                          <FundsTag color="blue" />
                                        </div>
                                      )}
                                      <Icon size="lg" name="settings" />
                                    </div>
                                  </Tooltip>
                                  <Tooltip title="فیلتر صندوق ها">
                                    <div
                                      onClick={(e) => {
                                        setIsFilterModal(true);
                                        e.stopPropagation();
                                      }}
                                      className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                                    >
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
                        </th>
                      )}
                      {index >= 1 && (
                        <th
                          className={cn(
                            'm-0 overflow-y-hidden p-0 text-sm font-medium',
                            index === updateTableHeaders.length - 1 &&
                              'rounded-tl-md',
                            String(
                              flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              ),
                            ).length > 10
                              ? 'w-[200px]'
                              : 'w-36',
                          )}
                          key={header.id}
                          colSpan={header.colSpan}
                        >
                          {index >= 2 && header.isPlaceholder ? null : (
                            <>
                              <div
                                {...{
                                  className: header.column.getCanSort()
                                    ? 'cursor-pointer select-none'
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
                                            ? 'larg'
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
                            </>
                          )}
                        </th>
                      )}
                    </>
                  );
                })}
                <th className="sticky left-10 m-0 mt-5">
                  {scrollRight && (
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
              {table.getRowModel().rows.map((row, rowIndex) => {
                return (
                  <tr
                    className={cn('group border-t border-blue-100',{
                      'sticky top-[71.5px] z-50 bg-white': rowIndex === 0,
                      'sticky top-[133px] z-50 bg-white shadow-md': rowIndex === 1,
                      'bg-blue-200': false,
                      'group-hover:bg-blue-50': !false && !false,
                    })}
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
                        <>
                          {index === 0 && (
                            <td
                              className={cn(
                                'sticky right-0 m-0 p-0',
                                rowIndex ===
                                  table.getRowModel().rows.length - 1 &&
                                  'rounded-br-md',
                              )}
                            >
                              <FundsTableRow
                                isScrolled={scrolleLeft}
                                key={row.id}
                                name={flexRender(
                                  cell.column.columnDef.cell,
                                  cell.getContext(),
                                )}
                                pined={false}
                                selected={false}
                                logo="https://s.cafebazaar.ir/images/icons/com.dotin.wepod-36b7a6e5-ed88-4590-ab3e-8811ed799168_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize"
                              />
                            </td>
                          )}
                          {index >= 1 && (
                            <td
                              className={cn({
                                'bg-blue-50 group-hover:bg-blue-100': false,
                                'bg-blue-200': false,
                                'group-hover:bg-blue-50': !false && index,
                              })}
                              key={cell.id}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext(),
                              )}
                            </td>
                          )}
                        </>
                      );
                    })}
                  </tr>
                );
              })}
              <tr className='h-[60px]'>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="fixed bottom-6 right-0 z-50 mt-6 flex w-full justify-between px-8">
        <div className="rounded-md bg-gray-400 py-2">
          <OptionsDropdown
            onChange={(e) => {
              table.setPageSize(Number(e));
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
          مجموعه ارزش خالص دارایی ها: 10,986,249.09
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
        className="relative z-50 focus:outline-none"
        onClose={() => setIsSettingModal(false)}
      >
        <div className="fixed inset-0 z-30 w-screen overflow-y-auto">
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
                  انتخاب ستون ها (
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
                              content={item.columnDef.header}
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
                className="text-brand-600 absolute -left-2 -top-2 cursor-pointer rounded-full bg-white"
              >
                <Icon name="circle-x" size="lg_plus" />
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
          <div className="flex min-h-full items-center justify-center">
            <DialogPanel
              transition
              className="shadow-3xl data-[closed]:transform-[scale(0%)] relative w-full max-w-lg rounded-3xl bg-white duration-300 ease-out data-[closed]:opacity-0"
            >
              <div
                onClick={() => setIsFilterModal(false)}
                className="text-brand-600 absolute z-10 -left-2 -top-2 cursor-pointer rounded-full bg-white"
              > 
                <Icon name="circle-x" size="lg_plus" />
              </div>
              <div className="my-4 flex h-full w-full flex-col gap-2">
                  <FilterPopUpSection searchValue={fundSearchQuery} onSearchChange={setFundSearchQuery} filterOptions={filterList} />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
};




export default Funds;
