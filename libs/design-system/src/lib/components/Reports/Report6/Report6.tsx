import React, { FC } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { ReportCardBase } from '../../ReportCardBase';
const months: string[] = [
  'فروردین',
  'اردیبهشت',
  'خرداد',
  'تیر',
  'مرداد',
  'شهریور',
  'مهر',
  'آبان',
  'آذر',
  'دی',
  'بهمن',
  'اسفند',
];

export interface Report6Props {
  inFlowData: (number | null)[];
  outFlowData: (number | null)[];
  indexData: (number | null)[];
}
export const Report6: FC<Report6Props> = ({
  inFlowData,
  indexData,
  outFlowData,
}) => {
  const options: Highcharts.Options = {
    ...baseOptions,
    xAxis: {
      categories: months,
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
        min: -6,
        max: 6,
        tickInterval: 2,
        tickPositions: [-6, -4, -2, 0, 2, 4, 6],
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
  };

  return (
    <ReportCardBase title="شاخص کل، ورود و خروج ماهانه سرمایه‌گذاران حقیقی به سهام">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};
