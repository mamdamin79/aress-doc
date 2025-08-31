import { useVirtualizer } from '@tanstack/react-virtual';
import TableRow from './TableRow';
import { TableBodyProps, VirtualItem } from '../types';
import React from 'react';

export function TableBody({
  rows,
  tableRef,
  activeIndexCategoryTab,
  handlerPinned,
  handlerUnPinned,
  handlerMarkFund,
  rowMarks,
  allRows,
}: TableBodyProps) {
  const virtualizer = useVirtualizer({
    count: rows?.length,
    getScrollElement: () => tableRef.current,
    estimateSize: () => 46,
    overscan: 3,
  });

  return (
    <tbody>
      <tr style={{ height: virtualizer.getVirtualItems()[0]?.start ?? 0 }}>
        <td />
      </tr>

      {virtualizer.getVirtualItems().map((virtualRow: VirtualItem) => {
        const row = rows[virtualRow.index];
        const isMainTab = activeIndexCategoryTab === 0;
        return (
          <React.Fragment key={row.id}>
            <TableRow
              row={row}
              handlerMarkFund={handlerMarkFund}
              isMainTab={isMainTab}
              activeIndexCategoryTab={activeIndexCategoryTab}
              rowMarks={rowMarks}
              handleColorChange={() => void 0}
              isScrollAtStart={false}
              handlerUnPinned={handlerUnPinned}
              handlerPinned={handlerPinned}
              logo={row.original.logo}
            />
            {allRows === virtualRow.index + 1 && (
              <div className="sticky right-0 mb-2 mt-5 w-screen whitespace-nowrap text-sm text-gray-600">
                پایان لیست صندوق ها.
              </div>
            )}
          </React.Fragment>
        );
      })}
      <tr className="h-[64px] w-full">
        <td className="h-full"></td>
      </tr>
      <tr
        style={{
          height:
            virtualizer.getTotalSize() -
            (virtualizer.getVirtualItems()[
              virtualizer.getVirtualItems().length - 1
            ]?.end ?? 0),
        }}
      >
        <td />
      </tr>
    </tbody>
  );
}
