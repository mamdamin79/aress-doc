import React, { useState } from 'react';
import { ColoredAnalysisTableProps } from './ColoredAnalysisTable.types';
import { toPersianNumeral } from './ColoredAnalysisTable.utils';
export const ColoredAnalysisTable: React.FC<ColoredAnalysisTableProps> = ({
  columns,
  rows,
  data,
}) => {
  const [hovered, setHovered] = useState<{
    row: number | null;
    col: number | null;
  }>({ row: null, col: null });

  const getBackgroundColor = (
    value: number | null,
    rowIndex: number,
    colIndex: number
  ): string => {
    if (
      value === null ||
      (hovered.row !== null && hovered.row !== rowIndex) ||
      (hovered.col !== null && hovered.col !== colIndex)
    )
      return '';
    const opacity =
      value >= 0 ? (value * 6) / 100 : (Math.abs(value) * 10) / 100;
    return `rgba(${value >= 0 ? '0, 100, 0' : '210,0,0'}, ${opacity})`;
  };

  return (
    <div className="w-[1280px] flex flex-col gap-4" dir="rtl">
      <div
        className="grid rounded-tl-xl rounded-tr-xl rounded-bl-sm rounded-br-sm overflow-hidden h-12 bg-gray-100 pr-3  text-md font-medium"
        style={{
          gridTemplateColumns: `120px ${columns.map(() => '78px').join(' ')}`,
          gridColumnGap: '16px',
        }}
      >
        <div className="flex bg-gray-100 pr-10 pl-6 items-center">سال</div>
        {columns.map((col, colIndex) => (
          <div className="flex items-center justify-center" key={colIndex}>
            <div
              key={colIndex}
              onMouseEnter={() => setHovered({ ...hovered, col: colIndex })}
              onMouseLeave={() => setHovered({ ...hovered, col: null })}
            >
              {col}
            </div>
          </div>
        ))}
      </div>
      <div className="border-[1.5px] border-gray-300 rounded-2xl overflow-hidden pt-6 pb-6 w-[1280px]">
        <div
          className="grid relative"
          style={{
            gridTemplateColumns: `128px ${columns.map(() => '78px').join(' ')}`,
            gridColumnGap: '16px',
          }}
        >
          {rows.map((year, rowIndex) => (
            <React.Fragment key={rowIndex}>
              <div
                className="pr-6 h-10 flex items-center mb-4"
                onMouseEnter={() => setHovered({ ...hovered, row: rowIndex })}
                onMouseLeave={() => setHovered({ ...hovered, row: null })}
              >
                {toPersianNumeral(year)}
              </div>
              {data[rowIndex]?.map((value, colIndex) => (
                <div
                  key={colIndex}
                  className="flex items-center justify-center mb-4 h-10 py-3 rounded-sm"
                  style={{
                    backgroundColor: getBackgroundColor(
                      value,
                      rowIndex,
                      colIndex
                    ),
                  }}
                >
                  {value !== null ? toPersianNumeral(value) + '%' : '-'}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: `128px ${columns.map(() => '78px').join(' ')}`,
            gridColumnGap: '16px',
          }}
        ></div>
      </div>
    </div>
  );
};
