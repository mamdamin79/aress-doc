'use client';
import React, { useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/highcharts-more';
import {
  ReportCardBase,
  GeneralTable,
  renderCell,
  RenderCellProps,
  TableRow,
  cn,
  OptionItem,
} from 'design-system';
import { baseOptions, xAxisLabels } from '../Report.config.shared';
import { Report13Dot1CalculationResult } from '@openapi';
import { toBasicSetting } from '../Report.utils';
import { financialDefinitionsReport13_1 } from './Report_13_1.constants';
import { CustomChartOptions, ReportProps } from '../Report.types';

const categories = [
  'ارزش معاملات',
  'خرید حقیقی',
  'فروش حقیقی',
  'خرید حقوقی',
  'فروش حقوقی',
];

export const Report_13_1: React.FC<
  ReportProps<Report13Dot1CalculationResult>
> = ({ data, filters, onSubmit, title, onRemove, onShare, onReplace }) => {
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
      <div class="category-label" style="text-align:center; font-weight:500; direction:rtl; color:var(--color-text-text-neutral-primary);">
        <div class="label-text" style="white-space:nowrap;">${label}</div>
        <div class="label-value" style="white-space:nowrap;">
          <span class="value-number">${value}</span>
          <span class="value-unit" style="margin-left:4px; color:var(--color-text-text-neutral-secondary);">${data.currencyUnit}</span>
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
        const isHighlighted =
          hoveredCol === colIndex || hoveredRow === rowIndex;

        return renderCell(
          value,
          rowIndex,
          colIndex,
          hoveredCol,
          hoveredRow,
          { type: 'decimal', precision: 0, signed: false },
          undefined,
          cn(
            sharedStyle,
            rowIndex === STDDEV_ROW_INDEX
              ? 'bg-surface-neutral-secondary'
              : isHighlighted
                ? 'bg-surface-accent-blue-100'
                : 'transparent',
            'justify-center min-w-[86px] max-w-[102px] py-2 text-xs font-medium border border-border-accent-blue-300 rounded-xs transition-colors duration-300',
          ),
        );
      },
    })),
  ];

  const tableData = [
    {
      'آخرین روز معاملاتی': data.lastDay.totalTrades,
      'بیشترین مقدار': data.maxValue.totalTrades,
      'کمترین مقدار': data.minValue.totalTrades,
      میانگین: data.averageValue.totalTrades,
      میانه: data.lastDayNormalized.totalTradesNormalized,
      name: 'ارزش کل معاملات',
    },
    {
      'آخرین روز معاملاتی': data.lastDay.totalBuyIndividual,
      'بیشترین مقدار': data.maxValue.totalBuyIndividual,
      'کمترین مقدار': data.minValue.totalBuyIndividual,
      میانگین: data.averageValue.totalBuyIndividual,
      میانه: data.lastDayNormalized.totalBuyIndividualNormalized,
      name: 'ارزش کل خرید حقیقی',
    },
    {
      'آخرین روز معاملاتی': data.lastDay.totalBuyCorporate,
      'بیشترین مقدار': data.maxValue.totalBuyCorporate,
      'کمترین مقدار': data.minValue.totalBuyCorporate,
      میانگین: data.averageValue.totalBuyCorporate,
      میانه: data.lastDayNormalized.totalBuyCorporateNormalized,
      name: 'ارزش کل خرید حقوقی',
    },
    {
      'آخرین روز معاملاتی': data.lastDay.totalSellIndividual,
      'بیشترین مقدار': data.maxValue.totalSellIndividual,
      'کمترین مقدار': data.minValue.totalSellIndividual,
      میانگین: data.averageValue.totalSellIndividual,
      میانه: data.lastDayNormalized.totalSellIndividualNormalized,
      name: 'ارزش کل فروش حقیقی',
    },
    {
      'آخرین روز معاملاتی': data.lastDay.totalSellCorporate,
      'بیشترین مقدار': data.maxValue.totalSellCorporate,
      'کمترین مقدار': data.minValue.totalSellCorporate,
      میانگین: data.averageValue.totalSellCorporate,
      میانه: data.lastDayNormalized.totalSellCorporateNormalized,
      name: 'ارزش کل فروش حقوقی',
    },
  ];

  const options: CustomChartOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      polar: true,
      type: 'area',
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
          const isActive = false;
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
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      labels: {
        enabled: false,
      },
    },
    series: [
      {
        name: 'آخرین روز معاملاتی',
        data: chartData,
        pointPlacement: 'on',
        type: 'line',
        color: '#1976d2',
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
      onShare={onShare}
      onReplace={onReplace}
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
            tableDataStyleClasses="text-center py-[3px] px-0.5 "
            border={false}
            striped={false}
          />
        </div>
      )}
    </ReportCardBase>
  );
};
