'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TableRow, TableProps } from './GeneralTable.types';
import { cn } from 'libs/design-system/src/utils';
import { getCellBackgroundColor } from './GeneralTable.utils';
import { SeparatorLine } from './TableComponents';

export const GeneralTable: React.FC<TableProps<TableRow>> = ({
  data,
  schema,
  tableDataStyleClasses,
  border = false,
  striped,
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [matchingRow, setMatchingRow] = useState<number | null>(null);
  const [matchingCol, setMatchingCol] = useState<number | null>(null);
  const tableRef = useRef<HTMLTableElement>(null);

  const tableDimensions = useMemo(() => {
    if (!tableRef.current) {
      return { width: 0, height: 0 };
    }
    const { offsetWidth: width, offsetHeight: height } = tableRef.current;
    return { width, height };
  }, [tableRef.current]);

  // We define a function to set both matchingCol and matchingRow
  // Difference between hovered and matching is set when we hover on a cell
  // but hover is set when we hover on a row or column header(keys)
  const setMatchings = (col: number | null, row: number | null) => {
    setMatchingCol(col);
    setMatchingRow(row);
  };

  const renderRows = () =>
    data.map((row, rowIndex) => {
      if ('type' in row && row.type === 'separator') {
        return (
          <SeparatorLine
            colSpan={schema.length}
            label={row.label}
            key={rowIndex}
          />
        );
      }
      return (
        <tr
          key={rowIndex}
          className={cn(
            striped && rowIndex % 2 === 1 ? 'bg-surface-neutral-tertiary' : '',
          )}
        >
          {schema.map((column, colIndex) => {
            const value = row[column.key as keyof TableRow];
            const isHoveredOrMatching =
              matchingRow === rowIndex || hoveredRow === rowIndex;

            return (
              <td
                key={colIndex}
                className={cn(
                  'w-fit',
                  colIndex === 0 && 'pr-6',
                  tableDataStyleClasses,
                )}
                onMouseEnter={() =>
                  colIndex === 0
                    ? setHoveredRow(rowIndex)
                    : setMatchings(colIndex, rowIndex)
                }
                onMouseLeave={() =>
                  colIndex === 0
                    ? setHoveredRow(null)
                    : setMatchings(null, null)
                }
              >
                {colIndex === 0 ? (
                  <div
                    className={cn(
                      'flex h-[30px] w-fit items-center rounded-sm pl-[6px] pr-[6px]',
                      isHoveredOrMatching
                        ? 'bg-surface-accent-blue-600 text-text-neutral-white'
                        : '',
                    )}
                  >
                    {column.render
                      ? column.render({
                          value,
                          rowIndex,
                          colIndex,
                          hoveredCol,
                          hoveredRow,
                          matchingCol,
                          matchingRow,
                          format: row.format,
                        })
                      : value}
                  </div>
                ) : column.render ? (
                  column.render({
                    colIndex,
                    hoveredCol,
                    hoveredRow,
                    matchingCol,
                    matchingRow,
                    rowIndex,
                    value,
                    format: row.format,
                    valueBasedBg: getCellBackgroundColor(value),
                  })
                ) : (
                  value
                )}
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <div className="relative w-[1280px]">
      {border && (
        <div
          className="border-border-neutral-contrast absolute top-16 -z-10 rounded-2xl border"
          style={{
            width: `${tableDimensions.width}px`,
            height: `${tableDimensions.height - 40}px`,
          }}
        ></div>
      )}

      <table
        className="min-w-full rounded-t-xl"
        ref={tableRef}
        role="grid"
        aria-label="Financial Records Table"
      >
        <thead className="text-md h-16 bg-transparent font-medium after:block after:h-4 after:content-['']">
          <tr>
            {schema.map((column, index) => (
              <th
                onMouseEnter={() => index !== 0 && setHoveredCol(index)}
                onMouseLeave={() => index !== 0 && setHoveredCol(null)}
                key={index}
                className={cn(
                  'bg-surface-neutral-secondary relative',
                  column.key === 'name' ? 'text-right' : '',
                )}
              >
                <div className="flex w-full items-center justify-center">
                  <div
                    className={cn(
                      'h-[30px] w-fit rounded-sm pl-[6px] pr-[6px]',
                      matchingCol === index || hoveredCol === index
                        ? 'bg-surface-accent-blue-600 text-text-neutral-white'
                        : '',
                      column.key === 'name' && 'w-[144px] pr-6',
                    )}
                  >
                    {column.header}
                  </div>
                </div>

                {column.headerDivider && (
                  <div
                    className={cn(
                      'bg-surface-accent-gray-400 absolute bottom-0 top-0 my-auto h-6 w-[1px] rounded-[100px]',
                      column.headerDivider === 'left' ? 'left-0' : 'right-0',
                    )}
                  ></div>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{renderRows()}</tbody>
      </table>
    </div>
  );
};
