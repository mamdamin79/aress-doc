import React, { useState } from 'react';
import { TableRow, TableProps } from './GeneralTable.types';
import { cn } from 'libs/design-system/src/utils';

export const GeneralTable: React.FC<TableProps<TableRow>> = ({
  data,
  schema,
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const [hoveredCol, setHoveredCol] = useState<number | null>(null);
  const [matchingRow, setMatchingRow] = useState<number | null>(null);
  const [matchingCol, setMatchingCol] = useState<number | null>(null);
  const setMatchings = (col:number|null, row:number|null)=>{
    setMatchingCol(col)
    setMatchingRow(row)
  }

  const renderRows = () =>
    data.map((row, rowIndex) => {
      if ('type' in row && row.type === 'separator') {
        return (
          <tr key={`separator-${rowIndex}`}>
            <td
              colSpan={schema.length}
              className="font-semibold bg-gray-200 p-2"
            >
              {row.label || ''}
            </td>
          </tr>
        );
      }

      return (
        <tr key={rowIndex} className={rowIndex % 2 === 1 ? 'bg-gray-50' : ''}>
          {schema.map((column, cellIndex) => {
            const cellValue = row[column.key as keyof TableRow];
            return (
              <td
                key={cellIndex}
                className="w-fit"
                onMouseEnter={() => cellIndex === 0 ? setHoveredRow(rowIndex): setMatchings(cellIndex, rowIndex)}
                onMouseLeave={() => cellIndex === 0 ? setHoveredRow(null) : setMatchings(null, null)}


              >
                {cellIndex === 0 ? (<div  
                className={cn('w-fit pr-[6px] pl-[6px] h-[30px] rounded-sm flex items-center',
                    matchingRow === rowIndex || hoveredRow === rowIndex
                      ? 'bg-blue-600 text-white'
                      : '')}>
{column.render
                  ? column.render(
                      cellValue as number | string | null,
                      rowIndex,
                      cellIndex,
                      hoveredCol,
                      hoveredRow,
                      matchingCol,
                      matchingRow,
                      row.format
                    )
                  : cellValue}
                      </div>) : column.render
                  ? column.render(
                      cellValue as number | string | null,
                      rowIndex,
                      cellIndex,
                      hoveredCol,
                      hoveredRow,
                      matchingCol,
                      matchingRow,
                      row.format
                    )
                  : cellValue}
      
              </td>
            );
          })}
        </tr>
      );
    });

  return (
    <div className="relative overflow-x-auto w-[1280px]">
      <table className="min-w-full rounded-t-xl overflow-hidden">
        <thead className="bg-gray-100 text-md font-medium h-12">
          <tr>
            {schema.map((column, index) => (
              <th
                onMouseEnter={() => index !== 0 && setHoveredCol(index)}
                onMouseLeave={() => index !== 0 && setHoveredCol(null)}
                key={index}
                className={cn('relative', index === 0 ? 'text-right pr-6' : '')}
              >
                <div className="w-full flex justify-center items-center">
                <div
                  className={cn('w-fit pr-[6px] pl-[6px] h-[30px] rounded-sm',
                    matchingCol === index || hoveredCol === index
                      ? 'bg-blue-600 text-white'
                      : ''
                  )}
                >       {column.header}</div>
                </div>
         
         
                {column.headerDivider && (
                  <div
                    className={cn(
                      'absolute top-0 bottom-0 my-auto bg-gray-400 w-[1px] h-6 rounded-[100px]',
                      column.headerDivider &&
                        (column.headerDivider === 'left' ? 'left-0' : 'right-0')
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
