'use client';
import React, { useState } from 'react';
import { cn, Icon, Tabs } from 'design-system';
import {
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

const Funds = () => {
  const [indexCategoryTab, setIndexCategoryTab] = useState(0);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [data, setData] = useState<Person[]>(() => makeData(5000));

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


  return (
    <div className="container max-w-7xl px-20 mx-auto p-4">
      <div className="mt-4 flex w-full items-center justify-start gap-3">
        <span className="pb-2.5">دسته بندی صندوق‌ها</span>
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
      <div className='mt-4 border-2 overflow-hidden rounded-xl border-brand-200'>
      <table className="w-full text-center">
        <thead className='border'>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className='border sticky top-0 h-[72px] border-brand-200 bg-brand-100'>
              {headerGroup.headers.map((header, index) => (
                <th
                  className={cn({
                    'w-64 text-right': index === 0
                  })}
                  key={header.id}
                  colSpan={header.colSpan}
                >
                  {header.isPlaceholder ? null : (
                    <>
                      <div
                        // {...{
                        //   className: header.column.getCanSort(),
                        //   onClick: header.column.getToggleSortingHandler(),
                        // }}
                      >
                        <div className={cn({
                          'flex items-center gap-7 mx-4': index === 0
                        })}>

                        {
                          index === 0 && (
                            <div className='flex items-center gap-2'>
                              <div className='bg-brand-600 cursor-pointer text-white rounded-md p-1'>
                                <Icon size='lg' name='settings' />
                              </div>
                              <div className='bg-brand-600 cursor-pointer text-white rounded-md p-1'>
                                <Icon size='lg' name='filter' />
                              </div>
                            </div>
                          )
                        }
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        </div>
{/* 
                        {{
                          asc: ' 🔼',
                          desc: ' 🔽',
                        }[header.column.getIsSorted() as string] ?? null} */}
                      </div>
                    </>
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id} className='border-y h-16'>
              {row.getVisibleCells().map((cell, index) => (
                <td key={cell.id} className={cn({
                  'text-right px-2': index === 0
                })}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="flex sticky bottom-6 items-center mt-6 justify-between">
        
        <select
          className="cursor-pointer rounded-md bg-gray-300 px-3 py-2 outline-none"
          value={table.getState().pagination.pageSize}
          onChange={(e) => {
            table.setPageSize(Number(e.target.value));
          }}
        >
          <option value="" aria-checked>تعداد سطر در جدول</option>
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option selected={false} key={pageSize} value={pageSize}>
              {pageSize}
            </option>
          ))}
        </select>

        <div className='rounded-md bg-gray-300 py-2 px-3'>
          مجموعه ارزش خالص دارایی ها: 10,986,249.09
        </div>
        <div className="flex items-center gap-2 bg-gray-400 opacity-[0.55] rounded-md py-2 px-3">
          <span className="flex items-center gap-1">
            <div>
              {table.getState().pagination.pageSize * (table.getState().pagination.pageIndex + 1)}
              -
              {(table.getState().pagination.pageSize * table.getState().pagination.pageIndex) + 1}
            </div>
              از 
              {table.getPageCount()}
              صندوق 
          </span>
          <button
            className={cn("rounded cursor-pointer", {
              'text-gray-200 cursor-default': table.getState().pagination.pageIndex + 1 === 1
            })}
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            <Icon size='lg' name='chevron-right' />
          </button>
          <button
            className="rounded cursor-pointer"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            <Icon size='lg' name='chevron-left' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Funds;
