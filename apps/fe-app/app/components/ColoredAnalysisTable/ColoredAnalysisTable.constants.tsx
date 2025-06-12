import {
  cn,
  Column,
  renderCell,
  RenderCellProps,
  TableRow,
} from 'design-system';

// Constants
const STDDEV_ROW_INDEX = 10;
const AVERAGE_ROW_INDEX = 9;
const PERSIAN_MONTHS = [
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
] as const;

const sharedStyle = 'h-[40px] flex items-center w-full mt-4 ml-4 rounded-sm';
export const schema: Column<TableRow>[] = [
  {
    key: 'name',
    header: 'سال',
    headerDivider: 'left',
  },
  ...PERSIAN_MONTHS.map((month) => ({
    key: month,
    header: month,
    render: ({
      colIndex,
      hoveredCol,
      hoveredRow,
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
          rowIndex === STDDEV_ROW_INDEX
            ? 'bg-surface-neutral-secondary'
            : ((hoveredCol !== null && hoveredCol !== colIndex) ||
                  (hoveredRow !== null && hoveredRow !== rowIndex)) &&
                rowIndex !== AVERAGE_ROW_INDEX
              ? 'transparent'
              : valueBasedBg,
        ),
      );
    },
  })),
];
