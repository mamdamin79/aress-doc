import { addFormatsToRows, cn, Column, renderCell, RowData, TableCellFormat, TableRow } from "design-system";

const rawData: RowData<TableRow>[] = [
    {
      name: 'صندوق سهم آشنا',
      '1398': null,
      '1399': 25.5,
      '1400': -27.7,
      '1401': 25.0,
      '1402': 24.0,
      '1403': 21.5,
      average: null,
      stdDev: 23,
    },
    {
      name: 'صندوق های سهامی',
      '1398': null,
      '1399': 23.3,
      '1400': -24.5,
      '1401': 24.5,
      '1402': 21.5,
      '1403': 21.1,
      average: null,
      stdDev: 23,
    },
    {
      name: 'شاخص کل',
      '1398': null,
      '1399': 21.3,
      '1400': -21.0,
      '1401': 24.5,
      '1402': 24.7,
      '1403': 21.2,
      average: null,
      stdDev: 23,
    },
    {
      name: 'رتبه چارکی صندوق',
      '1398': 3,
      '1399': 1,
      '1400': 2,
      '1401': 2,
      '1402': 4,
      '1403': 1,
      average: 2,
      stdDev: 3,
      format: 'quarterSymbol',
    },
    {
      name: 'رتبه درصدی صندوق',
      '1398': 34,
      '1399': 27,
      '1400': 25,
      '1401': 22,
      '1402': 21,
      '1403': 20,
      average: 24,
      stdDev: 23,
    },
    {
      name: 'میانگین اهرم صندوق',
      '1398': 2.4,
      '1399': 2.6,
      '1400': 2.7,
      '1401': 2.6,
      '1402': 2.7,
      '1403': 2.7,
      average: 2.6,
      stdDev: 23,
    },
  ];
  
  export const data = addFormatsToRows(
    [{ index: -1, format: { type: 'percent', precision: 0, signed: false } },
    { index: -2, format: { type: 'percent', precision: 0, signed: false } }]
  ,
    rawData
  );
  const sharedStyle =
  'h-16 flex items-center min-w-[100px] w-full';
  export const schema: Column<TableRow>[] = [
    {
      key: 'name',
      header: 'کل بازدهی',
      headerDivider: 'left',
    },
    ...['1398', '1399', '1400', '1401', '1402', '1403'].map((year) => ({
      key: year,
      header: year,
      render: (value: number | null|string, rowIndex:number, colIndex:number,     hoveredCol: number|null,
        hoveredRow: number|null,
        matchingCol: number|null,
        matchingRow: number|null,rowFormat?:TableCellFormat) =>
        renderCell(
          value as string,
          rowIndex,
          colIndex,
          hoveredCol,
          hoveredRow,
          matchingCol,
          matchingRow,
          rowFormat,
          {
            precision: 0,
            signed: true,
            type: 'percent',
          },
          cn('min-w-[133px]',
            value && Number(value) > 0 ? 'text-green-600' : 'text-red-600',
            'justify-center',
            [4,5].includes(rowIndex)  && 'text-gray-1000',
            hoveredCol !== null ? hoveredCol === colIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : '',
            hoveredRow !== null ? hoveredRow === rowIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : ''

          ,sharedStyle)
        ),
    })),
    {
      key: 'average',
      header: 'میانگین',
      headerDivider: 'right',
      render: (value, rowIndex, colIndex,hoveredCol,hoveredRow, matchingCol,matchingRow ,rowFormat) =>
        renderCell(
          value,
          rowIndex,
          colIndex,
          hoveredCol,hoveredRow,matchingCol,matchingRow,
          rowFormat,
          {
            precision: 0,
            signed: true,
            type: 'percent',
          },
          cn('justify-center',            hoveredCol !== null ? hoveredCol === colIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : '',
            hoveredRow !== null ? hoveredRow === rowIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : '',sharedStyle)
        ), 
    },
    {
      key: 'stdDev',
      header: 'انحراف معیار از میانگین',
      headerDivider: 'right',
      render: (value, rowIndex, colIndex ,hoveredCol,hoveredRow, matchingCol,matchingRow ,rowFormat) =>
        renderCell(
          value as string,
          rowIndex,
          colIndex,
          hoveredCol,hoveredRow, matchingCol,matchingRow ,
          rowFormat,
          {
            precision: 0,
            signed: false,
            type: 'percent',
          },
          cn('justify-center',            hoveredCol !== null ? hoveredCol === colIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : '',
            hoveredRow !== null ? hoveredRow === rowIndex ? 'opacity-100' : 'opacity-60 text-gray-1000' : '',sharedStyle)
        ),
    },
  ];