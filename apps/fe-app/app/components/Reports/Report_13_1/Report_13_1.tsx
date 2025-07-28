import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import {
  ReportCardBase,
  GeneralTable,
  renderCell,
  RenderCellProps,
  TableRow,
  cn,
  OptionItem,
} from 'design-system';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import {
  FinancialReportFilterApiModel,
  Report13Dot1CalculationResult,
} from '@openapi';
import { toBasicSetting } from '../Report.utils';
import { financialDefinitionsReport13_1 } from './Report_13_1.constants';

const categories = [
  'ارزش معاملات',
  'خرید حقیقی',
  'فروش حقیقی',
  'خرید حقوقی',
  'فروش حقوقی',
];

export interface Report13_1Props {
  title?: string;
  data: Report13Dot1CalculationResult;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemove?: () => void;
}

export const Report_13_1: React.FC<Report13_1Props> = ({
  data,
  filters,
  onSubmit,
  title,
  onRemove,
}) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [switchIndex, setSwitchIndex] = useState<number>(1); // 1 is initialIndex

  const [, setDataState] = useState(data);
  const [filterState, setFilterState] = useState(filters);

  useEffect(() => {
    setDataState(data);
    setFilterState(filters);
  }, [data, filters]);

  const chartData = [
    data.lastDay.totalTrades,
    data.lastDay.totalBuyIndividual,
    data.lastDay.totalSellIndividual,
    data.lastDay.totalBuyCorporate,
    data.lastDay.totalSellCorporate,
  ];

  // Build categoriesWithValues using dynamic chartData
  const categoriesWithValues = categories.map((label, i) => {
    const value =
      chartData[i] !== undefined && chartData[i] !== null
        ? Number(chartData[i]).toLocaleString('fa-IR')
        : '۰';
    return `
      <div class="category-label" style="text-align:center; font-weight:500; direction:rtl;">
        <div class="label-text" style="white-space:nowrap;">${label}</div>
        <div class="label-value" style="white-space:nowrap;">
          <span class="value-number">${value}</span>
          <span class="value-unit" style="margin-left:4px;">میلیارد ریال</span>
        </div>
      </div>
    `;
  });

  const updateOption = (optionType: string, item: OptionItem) => {
    setFilterState((prev) =>
      prev.map((f) =>
        f.optionType === optionType
          ? {
              ...f,
              selectedOption: {
                identifier: item.id.toString(),
                title: item.title,
              },
            }
          : f,
      ),
    );
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!onSubmit) return true;
    try {
      const filterOptions: Record<string, OptionItem> = Object.fromEntries(
        filterState.map((filter) => [
          filter.optionType,
          {
            id: Number(filter.selectedOption.identifier),
            title: filter.selectedOption.title,
          },
        ]),
      );

      const success = await onSubmit(filterOptions);
      return success;
    } catch (error) {
      console.error('Submit failed:', error);
      return false;
    }
  };

  const STDDEV_ROW_INDEX = 10;
  const AVERAGE_ROW_INDEX = 9;
  const sharedStyle = '';
  const HEADERS = [
    'آخرین روز معاملاتی',
    'بیشترین مقدار',
    'کمترین مقدار',
    'میانگین',
    'میانه',
  ];

  // Table schema and data for the alternative view
  const tableSchema = [
    {
      key: 'name',
      header: '',
      rowHeaderClassName: 'text-xs font-medium h-[22px] mx-2',
    },
    ...HEADERS.map((header) => ({
      key: header,
      header: header,
      headerClassName: 'text-xs',
      render: ({
        colIndex,
        hoveredCol,
        hoveredRow,
        rowIndex,
        value,
      }: RenderCellProps<TableRow>) => {
        return renderCell(
          value,
          rowIndex,
          colIndex,
          hoveredCol,
          hoveredRow,
          // Always use decimal format with 2 precision, no sign
          { type: 'decimal', precision: 0, signed: false },
          undefined,
          cn(
            sharedStyle,
            rowIndex === STDDEV_ROW_INDEX
              ? 'bg-surface-neutral-secondary'
              : ((hoveredCol !== null && hoveredCol !== colIndex) ||
                    (hoveredRow !== null && hoveredRow !== rowIndex)) &&
                  rowIndex !== AVERAGE_ROW_INDEX
                ? 'transparent'
                : '',
            'justify-center min-w-[86px] max-w-[96px] py-2  text-xs font-medium border border-blue-200 rounded-xs hover:bg-surface-accent-blue-100 transition-colors duration-300',
          ),
        );
      },
    })),
  ];

  // Helper to safely convert to میلیارد ریال
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const toBillion = (val: any) => {
    if (val === null || val === undefined || isNaN(Number(val))) return val;
    return Number(val) / 1_000_000_000;
  };

  const tableData = [
    {
      'آخرین روز معاملاتی': toBillion(data.lastDay.totalTrades),
      'بیشترین مقدار': toBillion(data.maxValue.totalTrades),
      'کمترین مقدار': toBillion(data.minValue.totalTrades),
      میانگین: toBillion(data.averageValue.totalTrades),
      میانه: toBillion(data.lastDayNormalized.totalTradesNormalized),
      name: 'ارزش کل معاملات',
    },
    {
      'آخرین روز معاملاتی': toBillion(data.lastDay.totalBuyIndividual),
      'بیشترین مقدار': toBillion(data.maxValue.totalBuyIndividual),
      'کمترین مقدار': toBillion(data.minValue.totalBuyIndividual),
      میانگین: toBillion(data.averageValue.totalBuyIndividual),
      میانه: toBillion(data.lastDayNormalized.totalBuyIndividualNormalized),
      name: 'ارزش کل خرید حقیقی',
    },
    {
      'آخرین روز معاملاتی': toBillion(data.lastDay.totalBuyCorporate),
      'بیشترین مقدار': toBillion(data.maxValue.totalBuyCorporate),
      'کمترین مقدار': toBillion(data.minValue.totalBuyCorporate),
      میانگین: toBillion(data.averageValue.totalBuyCorporate),
      میانه: toBillion(data.lastDayNormalized.totalBuyCorporateNormalized),
      name: 'ارزش کل خرید حقوقی',
    },
    {
      'آخرین روز معاملاتی': toBillion(data.lastDay.totalSellIndividual),
      'بیشترین مقدار': toBillion(data.maxValue.totalSellIndividual),
      'کمترین مقدار': toBillion(data.minValue.totalSellIndividual),
      میانگین: toBillion(data.averageValue.totalSellIndividual),
      میانه: toBillion(data.lastDayNormalized.totalSellIndividualNormalized),
      name: 'ارزش کل فروش حقیقی',
    },
    {
      'آخرین روز معاملاتی': toBillion(data.lastDay.totalSellCorporate),
      'بیشترین مقدار': toBillion(data.maxValue.totalSellCorporate),
      'کمترین مقدار': toBillion(data.minValue.totalSellCorporate),
      میانگین: toBillion(data.averageValue.totalSellCorporate),
      میانه: toBillion(data.lastDayNormalized.totalSellCorporateNormalized),
      name: 'ارزش کل فروش حقوقی',
    },
  ];

  const options: Highcharts.Options = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      polar: true,
      type: 'line',
      marginTop: 30,
    },
    tooltip: {
      enabled: false,
    },
    pane: {
      size: '90%',
    },
    xAxis: {
      ...xAxisLabels,
      categories: categoriesWithValues,
      labels: {
        useHTML: true,
        formatter: function () {
          const isActive = this.pos === activeIndex;
          let labelHtml = categoriesWithValues[this.pos];
          if (isActive) {
            // add active-label class to container div
            labelHtml = labelHtml.replace(
              'category-label',
              'category-label active-label',
            );
          }
          return labelHtml;
        },
        style: {
          fontSize: '12px',
          fontWeight: '500',
          textAlign: 'center',
        },
      },
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },
    yAxis: {
      ...yAxisLabels,
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
    },
    series: [
      {
        name: 'آخرین روز معاملاتی',
        data: chartData,
        pointPlacement: 'on',
        type: 'line',
        color: '#1976d2',
        events: {
          mouseOut: () => setActiveIndex(null),
        },
        point: {
          events: {
            mouseOver: function () {
              setActiveIndex(this.index);
            },
            mouseOut: function () {
              setActiveIndex(null);
            },
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      floating: true,
    },
  };

  return (
    <ReportCardBase
      onSubmit={handleSubmit}
      onRemove={onRemove}
      title={title ?? ''}
      popupInfoItems={financialDefinitionsReport13_1}
      settingOptions={[
        toBasicSetting(filterState[0], updateOption),
        toBasicSetting(filterState[1], updateOption),
      ]}
      switchIcons={{
        items: [
          { icon: { name: 'grid-3x3' } },
          { icon: { name: 'chart-scatter' } },
        ],
        onChange: (value: number) => {
          setSwitchIndex(value);
        },
        size: 'sm',
        bgWhite: false,
        initialIndex: 1,
      }}
    >
      {switchIndex === 1 ? (
        <HighchartsReact highcharts={Highcharts} options={options} />
      ) : (
        <div
          style={{
            // direction: '',
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <GeneralTable
            data={tableData}
            theadClassName="h-[34px] after:h-0"
            showHeadBodySpacer={true}
            schema={tableSchema}
            tableDataStyleClasses="text-center p-1 "
            border={false}
            striped={false}
          />
        </div>
      )}
    </ReportCardBase>
  );
};
