import { useVirtualizer } from '@tanstack/react-virtual';
import TableRow from './TableRow';
import { TableBodyProps, VirtualItem } from '../types';

export function TableBody({ rows, tableRef, activeIndexCategoryTab, handlerPinned, handlerUnPinned, handlerMarkFund, rowMarks }: TableBodyProps) {
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
            key={row.id}
            logo={row.original.logo}
          />
        );
      })}
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
};
