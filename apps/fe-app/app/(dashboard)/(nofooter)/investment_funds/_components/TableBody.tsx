import { useVirtualizer } from '@tanstack/react-virtual';
import TableRow, { FundRow } from './TableRow';
import { VirtualItem } from '../types';
import { Row } from '@tanstack/react-table';
import { RefObject } from 'react';

export interface TableBodyProps<T> {
  rows: Row<T>[];
  tableRef: RefObject<HTMLDivElement>;
  activeIndexCategoryTab: number;
  isScrollAtStart: boolean;
}

export const TableBody: React.FC<TableBodyProps<FundRow>> = ({
  rows,
  tableRef,
  activeIndexCategoryTab,
  isScrollAtStart,
}) => {
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

      {virtualizer.getVirtualItems().map((virtualRow: VirtualItem, index) => {
        const row = rows[virtualRow.index];
        const isMainTab = activeIndexCategoryTab === 1;

        console.log(index);

        return (
          <>
            <TableRow
              logo=""
              key={row.id}
              row={row}
              isMainTab={isMainTab}
              activeIndexCategoryTab={activeIndexCategoryTab}
              rowMarks={[]}
              handleColorChange={() => void 0}
              toggleWatchList={() => void 0}
              setPineWatchList={() => void 0}
              pineWatchLis={[]}
              watchList={[]}
              isScrollAtStart={isScrollAtStart}
            />
            {virtualizer.getVirtualItems().length === index + 1 && (
              <tr className="text-text-neutral-secondary absolute mx-auto my-5 flex w-screen justify-center text-nowrap text-center">
                پایان لیست صندوق‌ها.
              </tr>
            )}
          </>
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
