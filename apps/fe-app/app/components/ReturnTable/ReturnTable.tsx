import { Button, Cell, cn, Icon } from 'design-system';
import React, { useEffect, useRef, useState } from 'react';

export type TableRow = Record<string, string | number | null>;

export interface TableData {
  columns: string[];
  rows: TableRow[];
  idKey?: string;
}

interface GenericTableProps {
  data: TableData;
}

export const ReturnTable: React.FC<GenericTableProps> = ({ data }) => {
  const { columns, rows, idKey } = data;
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftButton, setShowLeftButton] = useState(false);
  const [showRightButton, setShowRightButton] = useState(false);
  const handleScrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: 'smooth',
      });
    }
  };

  const handleScrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: 'smooth',
      });
    }
  };
  const checkScrollable = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    const maxScrollLeft = scrollWidth - clientWidth;
    let atStart = false;
    let atEnd = false;
    atStart = Math.abs(scrollLeft) <= 1;
    atEnd = Math.abs(scrollLeft) >= maxScrollLeft - 1;
    setShowLeftButton(!atEnd);
    setShowRightButton(!atStart);
  };
  useEffect(() => {
    // Only check scrollable after animation completes to prevent layout shift
    const timer = setTimeout(() => {
      checkScrollable();
    }, 100);

    const handleResize = () => checkScrollable();
    window.addEventListener('resize', handleResize);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
    };
  }, [data]);
  const columnLayout = `minmax(200px, 1fr) repeat(${columns.length - 1}, minmax(85px, 1fr))`;

  return (
    // FIX: Add overflow-x-auto here to enable horizontal scrolling for the table
    <div className="border-border-neutral-secondary bg-surface-neutral-background relative w-full max-w-full overflow-visible rounded-2xl border-2 p-7 pb-3 pt-4">
      {/* Scroll Left Button */}
      {showLeftButton && (
        <Button
          onClick={handleScrollLeft}
          mode="secondary"
          theme="brand"
          className="absolute -left-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll left"
        >
          <Icon name="chevron-left" size="md" />
        </Button>
      )}

      {/* Scroll Right Button */}
      {showRightButton && (
        <Button
          onClick={handleScrollRight}
          mode="secondary"
          theme="brand"
          className="absolute -right-4 top-1/2 z-10 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full border-2"
          aria-label="Scroll right"
        >
          <Icon name="chevron-right" size="md" />
        </Button>
      )}
      <div
        className="scrollbar-md w-full overflow-x-auto"
        ref={scrollContainerRef}
      >
        <div className="min-w-[800px] pb-3">
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: columnLayout,
            }}
            className="w-full"
          >
            {columns.map((col, colIndex) => (
              <div
                key={col}
                className={cn('h-[42px] font-medium', {
                  'text-md text-text-neutral-primary text-right':
                    colIndex === 0,
                  'text-center': colIndex !== 0,
                })}
                style={{
                  paddingRight: colIndex === 0 ? '20px' : '0px',
                }}
              >
                {col}
              </div>
            ))}
          </div>

          {/* Table Body (scrollable) */}
          <div className="max-h-[500px] overflow-y-auto">
            {/* Changed to overflow-y-auto for clarity */}
            {rows.map((row, rowIndex) => {
              const key = idKey && row[idKey] ? String(row[idKey]) : rowIndex;
              return (
                <div
                  key={key}
                  className="hover:bg-surface-brand-100 group"
                  style={{
                    display: 'grid',
                    width: '100%',
                    gridTemplateColumns: columnLayout,
                  }}
                >
                  {columns.map((col, colIndex) => (
                    <div
                      key={col}
                      className={cn(
                        'border-border-neutral-secondary group-hover:bg-surface-brand-100 bg-surface-neutral-background relative flex h-16 items-center justify-start border-b transition-colors',
                        rowIndex === 0 &&
                          'border-border-neutral-secondary border-t-2',
                        rowIndex === rows.length - 1 &&
                          'border-border-neutral-secondary border-b-2',
                        {
                          'text-md text-text-neutral-primary pr-5 text-right font-medium':
                            colIndex === 0,
                          'justify-center': colIndex !== 0,
                        },
                        rowIndex % 2 === 0 && 'bg-surface-neutral-tertiary',
                      )}
                    >
                      {colIndex === 0 ? (
                        row[col]
                      ) : (
                        <Cell
                          value={row[col]}
                          cellStyle="h-16 w-full flex items-center justify-center"
                          format={{
                            type: 'percent',
                            precision: 1,
                            signed: true,
                          }}
                          grayMode={false}
                          valueBasedBg=""
                        />
                      )}
                    </div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
