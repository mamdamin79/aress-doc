'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { TableRow, TableProps } from './GeneralTable.types';
import { cn } from 'libs/design-system/src/utils';
import { getCellBackgroundColor } from './GeneralTable.utils';
import { SeperatorLine } from './TableComponents';

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
          <SeperatorLine
            colSpan={schema.length}
            label={row.label}
            key={rowIndex}
          />
        );
      }
      return (
        <tr
          key={rowIndex}
          className={cn(striped && rowIndex % 2 === 1 ? 'bg-gray-50' : '')}
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
                      'w-fit pr-[6px] pl-[6px] h-[30px] rounded-sm flex items-center',
                      isHoveredOrMatching ? 'bg-blue-600 text-white' : '',
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
          className="border border-gray-400 absolute top-16 rounded-2xl -z-10"
          style={{
            width: `${tableDimensions.width}px`,
            height: `${tableDimensions.height - 40}px`,
          }}
        ></div>
      )}

      <table className="min-w-full rounded-t-xl" ref={tableRef}>
        <thead className="bg-transparent text-md font-medium h-16 after:content-[''] after:block after:h-4">
          <tr>
            {schema.map((column, index) => (
              <th
                onMouseEnter={() => index !== 0 && setHoveredCol(index)}
                onMouseLeave={() => index !== 0 && setHoveredCol(null)}
                key={index}
                className={cn(
                  'relative bg-gray-100',
                  column.key === 'name' ? 'text-right' : '',
                )}
              >
                <div className="w-full flex justify-center items-center">
                  <div
                    className={cn(
                      'w-fit pr-[6px] pl-[6px] h-[30px] rounded-sm',
                      matchingCol === index || hoveredCol === index
                        ? 'bg-blue-600 text-white'
                        : '',
                      column.key === 'name' && 'pr-6 w-[144px]',
                    )}
                  >
                    {column.header}
                  </div>
                </div>

                {column.headerDivider && (
                  <div
                    className={cn(
                      'absolute top-0 bottom-0 my-auto bg-gray-400 w-[1px] h-6 rounded-[100px]',
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
