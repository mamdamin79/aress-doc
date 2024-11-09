import React, { useState } from 'react';
import { cn } from 'design-system';
import { FourlevelIndicatorProps } from './FourlevelIndicator';

export interface ReturnTableProps {
  rows: string[];
  columns: string[];
  data: (number | null)[][];
}

export interface ReturnTableProps {
  rows: string[];
  columns: string[];
  data: (number | null)[][];
}

export const ReturnTable: React.FC<ReturnTableProps> = ({
  rows,
  columns,
  data,
}) => {
  const [matchingRow, setMatchingRow] = useState<number | null>(null);
  const [matchingCol, setMatchingCol] = useState<number | null>(null);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);

  const renderCellValue = (value: number | null, row: number, col: number) => {
    const Wrapper = (props: { children: React.ReactNode }) => {
      return (
        <div
          onMouseEnter={() => setMatchingRow(row)}
          onMouseLeave={() => setMatchingRow(null)}
        >
          {props.children}
        </div>
      );
    };

    if (row === 3) {
      return (
        <Wrapper>
          {value ? (
            <FourlevelIndicatorProps level={value} max={4} />
          ) : (
            <span>-</span>
          )}
        </Wrapper>
      );
    }

    if (value === 0) {
      return <Wrapper>0</Wrapper>;
    }

    if (value !== null && row < rows.length - 2 && col !== columns.length - 1) {
      return (
        <Wrapper>
          {value > 0 ? `%${Math.abs(value)} +` : `%${Math.abs(value)} -`}
        </Wrapper>
      );
    }

    return <Wrapper>{value !== null ? `%${value}` : <span>-</span>}</Wrapper>;
  };
  const renderHeadersOnHover = (row?: number, col?: number) => {
    if (row !== undefined) {
      if (hoveredRow !== null && hoveredRow !== row) return 'text-gray-600';
      else if (
        hoveredRow !== null ||
        (matchingRow !== null && matchingRow === row)
      )
        return 'bg-blue-600  text-baseBackground ';
    } else {
      if (hoveredCol !== null && hoveredCol !== col) return 'text-gray-600';
      else if (
        hoveredCol !== null ||
        (matchingCol !== null && matchingCol === col)
      )
        return 'bg-blue-600 text-baseBackground ';
    }
  };
  const renderRowLabel = (rowLabel: string, rowIndex: number) => (
    <div
      onMouseEnter={() => setHoveredRow(rowIndex)}
      onMouseLeave={() => setHoveredRow(null)}
      key={`label-${rowIndex}`}
      className={cn(
        'font-semibold text-right flex items-center p-2 pr-3 h-full relative cursor-pointer',
        rowIndex === 1 || rowIndex === 2 ? 'text-gray-1000' : 'text-blue-700',
        rowIndex % 2 === 1 && 'bg-gray-50'
      )}
    >
      <div
        className={cn(
          'flex items-center w-fit rounded-sm px-[6px] gap-[10px] text-nowrap',
          renderHeadersOnHover(rowIndex, undefined)
        )}
      >
        {' '}
        {rowLabel}
      </div>
    </div>
  );

  const getTextColor = (
    value: number | null,
    row: number,
    colIndex: number
  ) => {
    if (
      (hoveredCol !== null && hoveredCol !== colIndex) ||
      (hoveredRow !== null && hoveredRow !== row)
    )
      return 'text-gray-600 opacity-60';
    if (value && row < rows.length - 2 && colIndex !== columns.length - 1) {
      return value > 0 ? 'text-green-600' : 'text-red-600';
    }
    return '';
  };

  const renderGridRows = () => {
    return rows.map((rowLabel, rowIndex) => (
      <React.Fragment key={rowIndex}>
        {renderRowLabel(rowLabel, rowIndex)}
        {data[rowIndex].map((cell, cellIndex) => (
          <div
            onMouseEnter={() => {
              setMatchingCol(cellIndex);
              setMatchingRow(rowIndex);
            }}
            onMouseLeave={() => {
              setMatchingCol(null);
              setMatchingRow(null);
            }}
            key={cellIndex}
            className={cn(
              'text-center flex justify-center items-center h-16 w-full text-md p-2',
              rowIndex % 2 === 1 && 'bg-gray-50',
              getTextColor(cell, rowIndex, cellIndex)
            )}
          >
            {renderCellValue(cell, rowIndex, cellIndex)}
          </div>
        ))}
      </React.Fragment>
    ));
  };

  const renderHeaderColumns = () => {
    return columns.map((columnLabel, index) => (
      <div
        key={index}
        className={cn(
          'text-center flex justify-center items-center text-gray-1000 relative w-full cursor-pointer'
        )}
        onMouseEnter={() => setHoveredCol(index)}
        onMouseLeave={() => setHoveredCol(null)}
      >
        {index === columns.length - 2 && (
          <>
            <div className="h-6 border border-gray-400 absolute top-0 bottom-0 my-auto left-0"></div>
            <div className="h-6 border border-gray-400 absolute top-0 bottom-0 my-auto right-0"></div>
          </>
        )}
        <div
          className={cn(
            'w-fit px-[6px] text-md rounded-sm text-nowrap',
            renderHeadersOnHover(undefined, index)
          )}
        >
          {' '}
          {columnLabel}
        </div>
      </div>
    ));
  };
  return (
    <div className="relative">
      <div className="overflow-x-auto">
        <div className="w-[1280px] gap-2 h-fit">
          <div
            className="grid font-semibold justify-items-center items-center bg-gray-100 rounded-t-xl rounded-b-sm h-12"
            style={{
              gridTemplateColumns: `1.875fr repeat(6, 1.25fr) 0.9375fr 1.6875fr`,
            }}
          >
            <div className="w-full font-semibold text-right pr-6 relative flex items-center text-nowrap">
              کل بازدهی
              <div className="h-6 border border-gray-400 absolute top-0 bottom-0 my-auto left-0"></div>
            </div>
            {renderHeaderColumns()}
          </div>
          <div
            className="grid p-3 items-center"
            style={{
              gridTemplateColumns: `1.875fr repeat(6, 1.25fr) 0.9375fr 1.6875fr`,
            }}
          >
            {renderGridRows()}
          </div>
        </div>
      </div>
    </div>
  );
};
