import React, { useState } from 'react';
import Highcharts from 'highcharts';
import 'highcharts/highcharts-more';
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from '../../ReportCardBase';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { GeneralTable } from '../../GeneralTable/GeneralTable';

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

  // Table schema and data for the alternative view
  const tableSchema = [
    { key: 'name', header: '' },
    {
      key: 'last',
      header: 'آخرین روز',
      render: ({ value }: { value: string }) => (
        <span className="custom-table-gap-cell text-base font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'max',
      header: 'بیشترین',
      render: ({ value }: { value: string }) => (
        <span className="custom-table-gap-cell text-base font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'min',
      header: 'کمترین',
      render: ({ value }: { value: string }) => (
        <span className="custom-table-gap-cell text-base font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'avg',
      header: 'میانگین',
      render: ({ value }: { value: string }) => (
        <span className="custom-table-gap-cell text-base font-bold">
          {value}
        </span>
      ),
    },
    {
      key: 'median',
      header: 'میانه',
      render: ({ value }: { value: string }) => (
        <span className="custom-table-gap-cell text-base font-bold">
          {value}
        </span>
      ),
    },
  ];

  const tableData = [
    {
      last: '۳۳.۴۵ B',
      max: '۳۳.۴۵ B',
      min: '۳۳.۴۵ B',
      avg: '۳۳.۴۵ B',
      median: '۳۳.۴۵ B',
      name: 'ارزش کل معاملات',
    },
    {
      last: '۳۳.۴۵ B',
      max: '۳۳.۴۵ B',
      min: '۳۳.۴۵ B',
      avg: '۳۳.۴۵ B',
      median: '۳۳.۴۵ B',
      name: 'ارزش کل',
    },
    {
      last: '۳۳.۴۵ B',
      max: '۳۳.۴۵ B',
      min: '۳۳.۴۵ B',
      avg: '۳۳.۴۵ B',
      median: '۳۳.۴۵ B',
      name: 'ارزش کل خرید حقوقی',
    },
    {
      last: '۳۳.۴۵ B',
      max: '۳۳.۴۵ B',
      min: '۳۳.۴۵ B',
      avg: '۳۳.۴۵ B',
      median: '۳۳.۴۵ B',
      name: 'ارزش کل فروش حقیقی',
    },
    {
      last: '۳۳.۴۵ B',
      max: '۳۳.۴۵ B',
      min: '۳۳.۴۵ B',
      avg: '۳۳.۴۵ B',
      median: '۳۳.۴۵ B',
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
    <>
      <style>{`
  .category-label {
    color: var(--color-text-neutral-primary);
    font-weight: 500;
  }
  .category-label .label-text,
  .category-label .value-number {
    color: inherit;
  }
  .category-label .value-unit {
    color: var(--color-text-neutral-secondary); 
    font-weight:400;
  }
  .category-label.active-label {
    color: var(--color-text-accent-blue-contrast-700);
  }
  .category-label.active-label .value-unit {
    color: var(--color-text-accent-blue-contrast-700); 
  }
  .custom-table-gap-cell {
    border: 1px solid #B6E0FE;
    border-radius: 8px;
    font-size:12px;
    font-weight:500;
    padding: 8px 12px;
    transition: background 0.2s;
    display: inline-block;
    min-width: 70px;
    text-align: center;
  }
  .custom-table-gap-cell:hover {
    background: #E3F2FD;
  }
`}</style>

      <ReportCardBase
        title="مقایسه معاملات امروز بازار بورس با توزیع تاریخی - شش ماه گذشته"
        popupInfoItems={[]}
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
              schema={tableSchema}
              tableDataStyleClasses="text-center px-2 py-1"
              border={false}
              striped={false}
            />
          </div>
        )}
      </ReportCardBase>
    </>
  );
};
