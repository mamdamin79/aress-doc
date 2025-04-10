import {
  cn,
  Column,
  renderCell,
  RenderCellProps,
  TableRow,
} from 'design-system';



const sharedStyle = 'h-[40px] flex items-center w-full mt-4 ml-4 rounded-sm';
export const schema: Column<TableRow>[] = [
  {
    key: 'name',
    header: 'سال',
    headerDivider: 'left',
  },
  ...[
    'فروردین',
    'اردیبهشت',
    'خرداد',
    'تیر',
    'مرداد',
    'شهریور',
    'مهر',
    'آبان',
    'آذر',
    'دی',
    'بهمن',
    'اسفند',
  ].map((month) => ({
    key: month,
    header: month,
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
        value,
        rowIndex,
        colIndex,
        hoveredCol,
        hoveredRow,
        matchingCol,
        matchingRow,
        format,
        //custom formatting
        {
          precision: 0,
          signed: true,
          type: 'percent',
        },
        //custom style
        cn(
          sharedStyle,
          'justify-center min-w-[50px]',
          rowIndex === 10
            ? 'bg-gray-100'
            : ((hoveredCol !== null && hoveredCol !== colIndex) ||
                  (hoveredRow !== null && hoveredRow !== rowIndex)) &&
                rowIndex !== 9
              ? 'transparent'
              : valueBasedBg,
        ),
      );
    },
  })),
];
