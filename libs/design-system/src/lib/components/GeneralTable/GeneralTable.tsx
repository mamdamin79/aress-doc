'use client';
import React, { useEffect, useRef, useState } from 'react';
import { TableRow, TableProps } from './GeneralTable.types';
import { cn } from 'libs/design-system/src/utils';
import { findExtremes, getCellBackgroundColor } from './GeneralTable.utils';

export const GeneralTable: React.FC<TableProps<TableRow>> = ({
  data,
  schema,
  tableDataStyleClasses,
  border = false,
  hasValueBasedBg,
  striped,
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [matchingRow, setMatchingRow] = useState<number | null>(null);
  const [matchingCol, setMatchingCol] = useState<number | null>(null);
  const [tableWidth, setTableWidth] = useState(0);
  const [tableHeight, setTableHeight] = useState(0);

  const tableRef = useRef<HTMLTableElement>(null);
  useEffect(() => {
    setTableWidth(tableRef.current ? tableRef.current.offsetWidth : 0);
    setTableHeight(tableRef.current ? tableRef.current.offsetHeight : 0);
  }, [tableRef.current]);
  const setMatchings = (col: number | null, row: number | null) => {
    setMatchingCol(col);
    setMatchingRow(row);
  };

  const renderRows = () =>
    data.map((row, rowIndex) => {
      if ('type' in row && row.type === 'separator') {
        return (
          <tr key={`separator-${rowIndex}`}>
            <td colSpan={schema.length} className="font-semibold">
              <div className=" bg-gray-200 h-[1px] mt-3 "></div>
              {row.label || ''}
            </td>
          </tr>
        );
      }

      return (
        <tr
          key={rowIndex}
          className={cn(striped && rowIndex % 2 === 1 ? 'bg-gray-50' : '')}
        >
          {schema.map((column, cellIndex) => {
            const cellValue = row[column.key as keyof TableRow];
            return (
              <td
                key={cellIndex}
                className={cn(
                  'w-fit',
                  cellIndex === 0 && 'pr-6',
                  tableDataStyleClasses,
                )}
                onMouseEnter={() =>
                  cellIndex === 0
                    ? setHoveredRow(rowIndex)
                    : setMatchings(cellIndex, rowIndex)
                }
                onMouseLeave={() =>
                  cellIndex === 0
                    ? setHoveredRow(null)
                    : setMatchings(null, null)
                }
              >
                {cellIndex === 0 ? (
                  <div
                    className={cn(
                      'w-fit pr-[6px] pl-[6px] h-[30px] rounded-sm flex items-center',
                      matchingRow === rowIndex || hoveredRow === rowIndex
                        ? 'bg-blue-600 text-white'
                        : '',
                    )}
                  >
                    {column.render
                      ? column.render(
                          cellValue as number | string | null,
                          rowIndex,
                          cellIndex,
                          hoveredCol,
                          hoveredRow,
                          matchingCol,
                          matchingRow,
                          row.format,
                        )
                      : cellValue}
                  </div>
                ) : column.render ? (
                  column.render(
                    cellValue as number | string | null,
                    rowIndex,
                    cellIndex,
                    hoveredCol,
                    hoveredRow,
                    matchingCol,
                    matchingRow,
                    row.format,
                    getCellBackgroundColor(cellValue),
                  )
                ) : (
                  cellValue
                )}
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <div className="relative w-[1280px]">
      <div
        className="border border-gray-400 absolute top-16 rounded-2xl -z-10"
        style={{
          width: tableWidth + 'px',
          height: tableHeight - 40 + 'px',
        }}
      ></div>
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
                      column.key === 'name' && ' pr-6 w-[144px]',
                    )}
                  >
                    {' '}
                    {column.header}
                  </div>
                </div>

                {column.headerDivider && (
                  <div
                    className={cn(
                      'absolute top-0 bottom-0 my-auto bg-gray-400 w-[1px] h-6 rounded-[100px]',
                      column.headerDivider &&
                        (column.headerDivider === 'left'
                          ? 'left-0'
                          : 'right-0'),
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
