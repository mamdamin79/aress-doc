import React from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions } from '../Chart.config.shared';

const PIE_COLORS = [
  'var(--color-surface-accent-blue-500)',
  'var(--color-surface-accent-green-500)',
  'var(--color-surface-accent-yellow-500)',
  'var(--color-surface-accent-purple-500)',
];

export interface PiechartProps {
  data: { name: string; value: number }[];
  state: 'default' | 'empty';
  showValues?: boolean;
}

export const Piechart: React.FC<PiechartProps> = ({
  data,
  state,
  showValues = true,
}) => {
  if (state === 'empty') {
    return (
      <div className="border-surface-accent-gray-400 flex h-[224px] w-[224px] flex-col items-center justify-center rounded-full border-4">
        <div className="flex h-full flex-col items-center justify-center">
          <span className="text-text-brand-primary-600 text-2xl font-medium">
            0٪
          </span>
          <span className="text-text-neutral-primary mt-2 text-xs font-medium">
            شما هنوز سرمایه‌گذاری نکرده‌اید.
          </span>
        </div>
      </div>
    );
  }

  const chartOptions = {
    ...baseOptions,
    chart: {
      ...baseOptions.chart,
      type: 'pie',
      height: 224,
      width: 224,
      backgroundColor: 'transparent',
    },
    tooltip: {
      ...baseOptions.tooltip,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        const point = this.point as Highcharts.Point;
        return `<div dir='rtl' style='font-family: Vazirmatn, sans-serif; background: var(--color-surface-neutral-inverse); backdrop-filter: blur(6px); color: var(--color-text-neutral-oninverse); border-radius: 10px; padding: 8px 16px; min-width: 120px; direction: rtl; text-align: right;'>
          <div style='font-weight: 500;'>${point.name}</div>
          ${showValues ? `<div style='display: flex; justify-content: space-between; gap: 8px;'><span>ارزش:</span><span>${point.y?.toLocaleString?.() ?? '-'} ریال</span></div>` : ''}
          <div style='display: flex; justify-content: space-between; gap: 8px;'><span>وزن:</span><span>${point.percentage?.toFixed?.(0) ?? '-'}٪</span></div>
        </div>`;
      },
    },
    plotOptions: {
      pie: {
        allowPointSelect: false,
        cursor: 'pointer',
        borderWidth: 2,
        dataLabels: { enabled: false },
        borderColor: 'var(--color-surface-neutral-background)',
      },
    },
    series: [
      {
        type: 'pie',
        innerSize: '75%',
        data: data.map((item, i) => ({
          name: item.name,
          y: item.value,
          color: PIE_COLORS[i % PIE_COLORS.length],
        })),
        showInLegend: false,
      },
    ],
  };

  return (
    <div className="flex flex-col items-center">
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </div>
  );
};
