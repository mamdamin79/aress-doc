import { useVirtualizer } from '@tanstack/react-virtual';
import TableRow from './TableRow';
import { VirtualItem } from '../types';

export function TableBody({ rows, tableRef, activeIndexCategoryTab, isScrollAtStart }: any) {

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
        const isMainTab = activeIndexCategoryTab === 0;

        console.log(index);


        return (
          <>
            <TableRow
              logo=''
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
            {
              virtualizer.getVirtualItems().length === index + 1 &&
              <tr className='text-center text-text-neutral-secondary my-5 text-nowrap flex justify-center mx-auto w-screen absolute'>پایان لیست صندوق‌ها.
              </tr>
            }
          </>
        );
      })}
      <tr
        style={{
          height:
            virtualizer.getTotalSize() -
            (virtualizer.getVirtualItems().at(-1)?.end ?? 0),
        }}
      >
        <td />
      </tr>
    </tbody>
  );
}
