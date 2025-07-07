import React, { FC, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { financialDefinitions } from './Report6.constants';
import { ReportCardBase } from 'design-system';
import { Report6CalculationResult } from '@openapi';

export const Report6: FC<Report6CalculationResult> = ({ data }) => {
  const { xCategories, inFlowData, outFlowData, indexData } = useMemo(() => {
    const xCategories: string[] = [];
    const inFlowData: number[] = [];
    const outFlowData: number[] = [];
    const indexData: number[] = [];

    data.forEach((item) => {
      xCategories.push(item.dt); // use raw dt
      indexData.push(item.indexValue ?? null);

      const flow = item.netFlow ?? 0;
      if (flow >= 0) {
        inFlowData.push(flow);
        outFlowData.push(0);
      } else {
        inFlowData.push(0);
        outFlowData.push(Math.abs(flow));
      }
    });

    return { xCategories, inFlowData, outFlowData, indexData };
  }, [data]);

  const options: Highcharts.Options = {
    ...baseOptions,
    xAxis: {
      categories: xCategories,
      crosshair: true,
      labels: xAxisLabels,
    },
    yAxis: [
      {
        title: { text: '' },
        min: -100,
        max: 120,
        tickInterval: 20,
        labels: yAxisLabels,
        plotLines: [
          {
            value: 0,
            width: 0,
          },
        ],
      },
      {
        title: { text: '' },
        tickInterval: 2,
        opposite: true,
        labels: yAxisLabels,
      },
    ],
    series: [
      {
        name: 'ورود',
        type: 'column',
        data: inFlowData,
        color: 'var(--color-surface-accent-green-600)',
        yAxis: 0,
      },
      {
        name: 'خروج',
        type: 'column',
        data: outFlowData,
        color: 'var(--color-surface-accent-red-600)',
        yAxis: 0,
      },
      {
        name: 'شاخص کل',
        type: 'spline',
        data: indexData,
        color: 'var(--color-border-accent-blue-600)',
        yAxis: 1,
      },
    ],
    legend: {
      ...baseOptions.legend,
      useHTML: true,
      labelFormatter: function () {
        if (this.name === 'ورود') {
          return 'ورود <span style="color: var(--color-text-neutral-secondary); font-size: 11px;">(میلیارد ریال)</span>';
        } else if (this.name === 'خروج') {
          return 'خروج <span style="color: var(--color-text-neutral-secondary);">(میلیارد ریال)</span>';
        }
        return 'شاخص کل <span style="color: var(--color-text-neutral-secondary);">(میلیون واحد)</span>';
      },
    },
  };

  return (
    <ReportCardBase
      title="شاخص کل، ورود و خروج ماهانه سرمایه‌گذاران حقیقی به سهام"
      popupInfoItems={financialDefinitions}
      settingOptions={[
        {
          type: 'nestedDropdown',
          props: {
            title: 'نمودار خطی',
            items: [
              {
                title: 'نام شاخص:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'شاخص کل',
                optionsListProps: {
                  selectedItemId: 1,
                  searchable: false,
                  title: 'نام شاخص',
                  items: {
                    items: [
                      { id: 1, title: 'ذغال سنگ' },
                      { id: 2, title: 'شاخص کل (هم‌وزن)' },
                      { id: 3, title: 'شاخص قیمت (وزنی-ارزشی)' },
                      { id: 4, title: 'شاخص قیمت (هم‌وزن)' },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          type: 'nestedDropdown',
          props: {
            title: 'نمودار میله‌ای',
            items: [
              {
                title: 'نوع سرمایه‌گذار:',
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: 'حقیقی',
                optionsListProps: {
                  selectedItemId: 1,
                  searchable: false,
                  title: 'نوع سرمایه‌گذار',
                  items: {
                    items: [
                      { id: 1, title: 'حقیقی' },
                      { id: 2, title: 'حقوقی' },
                    ],
                  },
                },
              },
            ],
          },
        },
        {
          type: 'basicSelection',
          props: {
            title: 'تفکیک زمانی: ',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'ماهانه',
            optionsListProps: {
              selectedItemId: 3,
              searchable: false,
              title: 'تفکیک زمانی',
              items: {
                items: [
                  { id: 1, title: 'روزانه' },
                  { id: 2, title: 'هفتگی' },
                  { id: 3, title: 'ماهانه' },
                  { id: 4, title: 'سالانه' },
                ],
              },
            },
          },
        },
      ]}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};
