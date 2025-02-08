'use client';
import React, { useEffect, useRef, useState } from 'react';
import {
  cn,
  Icon,
  Tabs,
  Tooltip,
  formatNumber,
  OptionsDropdown,
  FundsFilterSection,
  FundsTableRow,
  FundsTag,
} from 'design-system';
import { funds } from './components/FundsData';
import {
  ColumnDef,
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import { makeData, Person } from './components/makeData';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';

type SelectedColumnsType = {
  [key: string]: boolean;
};

const Funds = () => {
  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<Person[]>(() => makeData(500));
  const [isFilterModal, setIsFilterModal] = useState(false);
  const [isSettingModal, setIsSettingModal] = useState(false);

  const [isScrolled, setIsScrolled] = useState(false);
  const [scrolleLeft, setScrollLeft] = useState<boolean>(false);
  const [scrollRight, setScrollRight] = useState<boolean>(true);
  const tableRef = useRef<HTMLDivElement>(null);

  const columnsHeaders = [
    { key: 'unitCount', label: 'تعداد واحد', type: '' },
    { key: 'netAssetValue', label: 'ارزش خالص', type: 'دارایی‌ها' },
    { key: 'issuePrice', label: 'قیمت صدور', type: '(ریال)' },
    { key: 'cancellationPrice', label: 'قیمت ابطال', type: '(ریال)' },
    { key: 'statisticalPrice', label: 'قیمت آماری', type: '(ریال)' },
    { key: 'dailyReturn', label: 'بازده', type: 'روزانه' },
    { key: 'weeklyReturn', label: 'بازده', type: 'هفتگی' },
    { key: 'moonthReturn', label: 'بازده', type: 'ماهانه' },
    { key: 'yearRtrund', label: 'بازده', type: 'سالانه' },
  ];

  const [selectedColumns, setSelectedColumns] = useState<SelectedColumnsType>(
    {},
  );

  const handleToggle = (section: string, option: string) => {
    setSelectedColumns((prev) => ({
      ...prev,
      [option]: !prev[option],
    }));
  };

  useEffect(() => {
    const handleScroll = () => {
      if (tableRef.current) {
        if (
          Math.round(tableRef?.current?.scrollLeft) ===
          (tableRef?.current?.scrollWidth - tableRef?.current?.clientWidth) * -1
        ) {
          setScrollRight(false);
        } else {
          setScrollRight(true);
        }
        if (tableRef.current.scrollLeft < 0) {
          setScrollLeft(true);
          setIsScrolled(true);
        } else {
          setScrollLeft(false);
          setIsScrolled(false);
        }
      }
    };

    const tableElement = tableRef.current;
    if (tableElement) {
      tableElement.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (tableElement) {
        tableElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [isScrolled]);

  const sections = [
    {
      title: 'مشخصات صندوق',
      options: [
        'تعداد واحد',
        'تعداد واحد صندوق',
        'کل ارزش خالص دارایی‌ها',
        'تسهیم سقف صندوق',
      ],
    },
    {
      title: 'ارکان صندوق',
      options: ['مدیر صندوق', 'متولی', 'حسابرس'],
    },
    {
      title: 'سهم پردازی صندوق',
      options: ['سهم پایه', 'آخرین قیمت خالص'],
    },
    {
      title: 'عملکرد صندوق',
      options: [
        'بازده روزانه',
        'بازده هفتگی',
        'بازده ماهانه',
        'بازده سالانه',
        'بازه دلخواه',
      ],
    },
    {
      title: 'ریسک صندوق',
      options: ['انحراف معیار', 'بتا', 'ضریب شارپ'],
    },
    {
      title: 'مقایسه با شاخص',
      options: ['مقایسه با شاخص کل', 'مقایسه با شاخص هم وزن'],
    },
    {
      title: 'اطلاعات خرید و فروش',
      options: ['ارزش خرید', 'ارزش فروش', 'تعداد معاملات'],
    },
    {
      title: 'نقدشوندگی صندوق',
      options: ['میانگین حجم معاملات', 'حجم معاملات روزانه'],
    },
  ];

  const resetSelections = () => {
    setSelectedColumns({});
  };

  const columns: ColumnDef<Person>[] = [
    { accessorKey: 'firstName', cell: (info) => info.getValue() },
    {
      accessorKey: 'lastName',
      header: 'Last Name',
      cell: (info) => info.getValue(),
    },
    { accessorKey: 'age', header: 'Age' },
    { accessorKey: 'visits', header: 'Visits' },
    { accessorKey: 'status', header: 'Status' },
    { accessorKey: 'progress', header: 'Profile Progress' },
  ];

  const table = useReactTable({
    data,
    columns,
    state: { columnFilters },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handlerRightScrollTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft += 100;
    }
  };

  const handlerLeftScrollTable = () => {
    if (tableRef.current) {
      tableRef.current.scrollLeft -= 100;
    }
  };

  return (
    <div className="container mx-auto max-w-7xl p-4 px-20">
      <div className="mt-4 flex items-center justify-between">
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
        ref={tableRef}
        className="border-brand-200 scrollbar-thin scrollbar-track-gray-300 relative mt-4 overflow-y-scroll h-[500px] overflow-x-scroll scroll-smooth rounded-xl border-2"
      >
        <table className="relative w-full table-fixed text-center">
          <thead className="relativ z-50 sticky top-0">
            <tr className="border-brand-200 bg-brand-100 h-[72px] break-words border">
              {scrolleLeft && (
                <button
                  onClick={handlerRightScrollTable}
                  className={cn(
                    'bg-brand-600 sticky right-[330px] top-5 z-50 rounded-md p-1 text-white',
                  )}
                >
                  <Icon name="arrow-right" />
                </button>
              )}
              <th className={cn("bg-brand-100 sticky right-0 box-border w-[320px] pr-4", {
                'shadow-lg': isScrolled
              })}>
                <div className="flex items-center gap-2">
                  <Tooltip title="انتخاب ستون ها">
                    <div
                      onClick={() => setIsSettingModal(true)}
                      className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                    >
                      <Icon size="lg" name="settings" />
                    </div>
                  </Tooltip>
                  <Tooltip title="فیلتر صندوق ها">
                    <div
                      onClick={() => setIsFilterModal(true)}
                      className="bg-brand-600 relative cursor-pointer rounded-md p-1 text-white"
                    >
                      {Object.values(selectedColumns).filter(Boolean).length ? (
                        <div className="absolute -right-1 -top-1">
                          <FundsTag color="blue" />
                        </div>
                      ) : (
                        ''
                      )}
                      <Icon size="lg" name="filter" />
                    </div>
                  </Tooltip>
                  <span className="font-mdium">نام صندوق</span>
                </div>
              </th>
              {columnsHeaders.map((item, index) => (
                <th className="w-[130px] px-4" key={index}>
                  {item.label}
                  <br />
                  {item.type}
                </th>
              ))}
              {scrollRight && (
                <div className='sticky left-10 top-5 m-0 p-0 z-50'>
                  <button
                    onClick={handlerLeftScrollTable}
                    className={cn(
                      'bg-brand-600 rounded-md p-1 text-white',
                    )}
                  >
                    <Icon name="arrow-left" />
                  </button>
                </div>
               )}
            </tr>
          </thead>
          <tbody className="w-full relative">
            {table.getRowModel().rows.map((row, index: number) => (
              <tr key={index} className={cn("group border-none", {
                'sticky top-20': index > 5 && index < 10
              })}>
                <td className="sticky right-0 p-0">
                  <FundsTableRow
                    isScrolled={isScrolled}
                    key={row.id}
                    // name="نام صندوق "
                    name="نیکوکاری جایزه علمی فناوری پیامبر اعظم  ص"
                    pined={false}
                    selected={false}
                    logo="https://s.cafebazaar.ir/images/icons/com.dotin.wepod-36b7a6e5-ed88-4590-ab3e-8811ed799168_512x512.png?x-img=v1/resize,h_256,w_256,lossless_false/optimize"
                  />
                </td>
                {scrolleLeft && <td></td>}
                <td
                  className={cn('px-4', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  <span className="whitespace-nowrap text-xs font-medium">
                    9,145.09
                  </span>
                </td>
                <td
                  className={cn('whitespace-nowrap px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  9,145.05 میلیارد ریال
                </td>
                <td
                  className={cn('whitespace-nowrap px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  9,145.1
                </td>
                <td
                  className={cn('whitespace-nowrap px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  89,145,111
                </td>
                <td
                  className={cn('whitespace-nowrap px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  89,145,111
                </td>
                <td
                  className={cn('px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  12
                </td>
                <td
                  className={cn('px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  12
                </td>
                <td
                  className={cn('px-4', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  12
                </td>
                <td
                  className={cn('px-4 text-xs font-medium', {
                    'bg-blue-50 group-hover:bg-blue-100': false,
                    'bg-blue-200': false,
                    'group-hover:bg-blue-50': !false && !false,
                  })}
                >
                  12
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="sticky bottom-6 mt-6 px-4 flex items-center justify-between">
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
              <div className="flex items-center gap-2 px-3 text-xs">
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
              { text: '5' },
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
              <DialogTitle className="flex items-center justify-between">
                <span className="p-6 text-xl font-medium">
                  انتخاب سوتون ها (
                  {Object.values(selectedColumns).filter(Boolean).length}/25)
                </span>
                {Object.values(selectedColumns).filter(Boolean).length ? (
                  <span
                    className="m-6 cursor-pointer text-base font-medium text-red-600"
                    onClick={resetSelections}
                  >
                    بازنشانی به پیشفرض
                  </span>
                ) : (
                  ''
                )}
              </DialogTitle>
              <hr />
              <div className="scrollbar-thumb-gray-500 scrollbar-thumb-rounded-full scrollbar-track-rounded-full scrollbar-thin scrollbar-track-gray-300 mb-6 h-[550px] overflow-x-hidden overflow-y-scroll">
                {sections.map((item, index) => (
                  <div key={item.title}>
                    <FundsFilterSection
                      title={item.title}
                      options={item.options}
                      selectedColumns={selectedColumns}
                      onToggle={handleToggle}
                    />
                    {index + 1 < sections.length && <hr />}
                  </div>
                ))}
              </div>
              <div
                onClick={() => setIsFilterModal(false)}
                className="text-brand-600 absolute -left-2 -top-2 cursor-pointer rounded-full bg-white"
              >
                <Icon name="circle-x" size="lg_plus" />
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  );
};

export default Funds;
