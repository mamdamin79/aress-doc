import React, { useState } from 'react';
import Highcharts from 'highcharts';
import 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from '../../ReportCardBase';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { GeneralTable } from '../../GeneralTable/GeneralTable';
import { renderCell, RenderCellProps, TableRow } from '../../GeneralTable';
import { cn } from 'libs/design-system/src/utils';
import { financialDefinitionsReport13_1 } from './Report_13_1.constants';

const categories = [
  'ارزش معاملات',
  'خرید حقیقی',
  'فروش حقیقی',
  'خرید حقوقی',
  'فروش حقوقی',
];

const data = [37.8, 20, 31.2, 23.2, 31.2];

// Updated to use CSS classes and no inline colors
const categoriesWithValues = categories.map((label, i) => {
  const value = data[i]?.toFixed(1) ?? '۰';
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

export const Report_13_1 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [switchIndex, setSwitchIndex] = useState<number>(1); // 1 is initialIndex

  const STDDEV_ROW_INDEX = 10;
  const AVERAGE_ROW_INDEX = 9;
  const sharedStyle = '';
  const HEADERS = ['آخرین روز معاملاتی', 'بیشترین مقدار', 'کمترین مقدار', 'میانگین', 'میانه'];

  // Table schema and data for the alternative view
  const tableSchema = [
    {
      key: 'name',
      header: '',
      rowHeaderClassName:"text-xs font-medium h-[22px] mx-2"
    },
    ...HEADERS.map((header) => ({
      key: header,
      header,
      headerClassName: 'text-xs',
      render: ({
        colIndex,
        hoveredCol,
        hoveredRow,
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
          format,
          undefined, // no formatOptions
          cn(
            sharedStyle,
            'justify-center min-w-[86px] max-w-[96px] py-2  text-xs font-medium border border-border-accent-blue-300 rounded-xs bg-white hover:bg-surface-accent-blue-100 transition-colors duration-300',
            rowIndex === STDDEV_ROW_INDEX
              ? 'bg-surface-neutral-secondary'
              : ((hoveredCol !== null && hoveredCol !== colIndex) ||
                    (hoveredRow !== null && hoveredRow !== rowIndex)) &&
                  rowIndex !== AVERAGE_ROW_INDEX
                ? 'transparent'
                : '',
          ),
        );
      },
    })),
  ];

  const tableData = [
    {
      'آخرین روز معاملاتی': '5',
      'بیشترین مقدار': '33.45',
      'کمترین مقدار': '33.45',
      میانگین: '33.45',
      میانه: '33.45',
      name: 'ارزش کل معاملات',
    },
    {
      'آخرین روز معاملاتی': '5',
      'بیشترین مقدار': '33.45',
      'کمترین مقدار': '33.45',
      میانگین: '33.45',
      میانه: '33.45',
      name: 'ارزش کل',
    },
    {
      'آخرین روز معاملاتی': '5',
      'بیشترین مقدار': '33.45',
      'کمترین مقدار': '33.45',
      میانگین: '33.45',
      میانه: '33.45',
      name: 'ارزش کل خرید حقوقی',
    },
    {
      'آخرین روز معاملاتی': '5',
      'بیشترین مقدار': '33.45',
      'کمترین مقدار': '33.45',
      میانگین: '33.45',
      میانه: '33.45',
      name: 'ارزش کل فروش حقیقی',
    },
    {
      'آخرین روز معاملاتی': '5',
      'بیشترین مقدار': '33.45',
      'کمترین مقدار': '33.45',
      میانگین: '33.45',
      میانه: '33.45',
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
        data,
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
      title="مقایسه معاملات امروز بازار بورس با توزیع تاریخی - شش ماه گذشته"
      popupInfoItems={financialDefinitionsReport13_1}
      settingOptions={[]}
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
            theadClassName="h-[42px] after:h-2"
            schema={tableSchema}
            tableDataStyleClasses="text-center p-0.5 "
            border={false}
            striped={false}
          />
        </div>
      )}
    </ReportCardBase>
  );
};
