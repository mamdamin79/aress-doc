import {
  addFormatsToRows,
  cn,
  Column,
  renderCell,
  RowData,
  RenderCellProps,
  TableRow,
} from 'design-system';

const generateYearKeys = (sampleData:RowData<TableRow>) : string[] => {
  return Object.keys(sampleData).filter(
    (key) =>
      key !== 'name' && key !== 'average' && key !== 'stdDev' && key !== 'format',
  )
};

const sharedStyle = 'h-16 flex items-center min-w-[100px] w-full';
export const schema = (sampleData: RowData<TableRow>): Column<TableRow>[] => [
  {
    key: 'name',
    header: 'کل بازدهی',
    headerDivider: 'left',
  },
  ...generateYearKeys(sampleData).map((year) => ({
    key: year,
    header: year,
    render: ({
      colIndex,
      hoveredCol,
      hoveredRow,
      matchingCol,
      matchingRow,
      rowIndex,
      value,
      format,
      valueBasedBg,
    }: RenderCellProps<TableRow>) => {
      return renderCell(
        value as string,
        rowIndex,
        colIndex,
        hoveredCol,
        hoveredRow,
        matchingCol,
        matchingRow,
        format,
        {
          precision: 0,
          signed: true,
          type: 'percent',
        },
        cn(
          'min-w-[133px]',
          value && Number(value) > 0 ? 'text-green-600' : 'text-red-600',
          'justify-center',
          [4, 5].includes(rowIndex) && 'text-gray-1000',
          hoveredCol !== null
            ? hoveredCol === colIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
          hoveredRow !== null
            ? hoveredRow === rowIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
          sharedStyle,
        ),
      );
    },
  })),
  {
    key: 'average',
    header: 'میانگین',
    headerDivider: 'both',
    render: ({
      colIndex,
      hoveredCol,
      hoveredRow,
      matchingCol,
      matchingRow,
      rowIndex,
      value,
      format,
    }: RenderCellProps<TableRow>) => {
      return renderCell(
        value,
        rowIndex,
        colIndex,
        hoveredCol,
        hoveredRow,
        matchingCol,
        matchingRow,
        format,
        {
          precision: 0,
          signed: true,
          type: 'percent',
        },
        cn(
          'justify-center w-[100px]',
          hoveredCol !== null
            ? hoveredCol === colIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
          hoveredRow !== null
            ? hoveredRow === rowIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
          sharedStyle,
        ),
      );
    },
  },
  {
    key: 'stdDev',
    header: 'انحراف معیار از میانگین',
    render: ({
      colIndex,
      hoveredCol,
      hoveredRow,
      matchingCol,
      matchingRow,
      rowIndex,
      value,
      format,
      valueBasedBg,
    }: RenderCellProps<TableRow>) => {
      return renderCell(
        value as string,
        rowIndex,
        colIndex,
        hoveredCol,
        hoveredRow,
        matchingCol,
        matchingRow,
        format,
        {
          precision: 0,
          signed: false,
          type: 'percent',
        },
        cn(
          sharedStyle,
          'justify-center w-[180px]',
          hoveredCol !== null
            ? hoveredCol === colIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
          hoveredRow !== null
            ? hoveredRow === rowIndex
              ? 'opacity-100'
              : 'opacity-60 text-gray-1000'
            : '',
        ),
      );
    },
  },
];
