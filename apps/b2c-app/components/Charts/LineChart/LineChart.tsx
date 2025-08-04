import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useMemo } from 'react';
import { baseOptions } from '../Chart.config.shared';

export interface LineChartProps {
  points: {
    date: string;
    value: number;
  }[];
}
export const LineChart: React.FC<LineChartProps> = ({ points }) => {
  const priceData = useMemo<[number, number][]>(() => {
    if (!points.length) return [];

    return points.map(({ date, value }) => {
      const [year, month, day] = date.split('-').map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      return [timestamp, parseFloat((value / 10000000000000).toFixed(2))];
    });
  }, [points]);

  const options: Highcharts.Options = {
    ...baseOptions,
    legend: { enabled: false },
    chart: {
      backgroundColor: 'var(--color-surface-neutral-primary)',
      type: 'spline',
    },
    credits: { enabled: false },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      style: { direction: 'rtl' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        const gregorianDate = new Date(this.x as number);
        const formattedDate = `${gregorianDate.getFullYear()}/${String(
          gregorianDate.getMonth() + 1,
        ).padStart(
          2,
          '0',
        )}/${String(gregorianDate.getDate()).padStart(2, '0')}`;

        interface TooltipPoint {
          series: { color: string; name: string };
          y: number;
        }

        return `
          <div dir="rtl"
            style="
              background: var(--color-surface-neutral-inverse);
              color: var(--color-text-neutral-oninverse);
              border-radius: 10px;
              padding: 8px 16px;
              font-family: Vazirmatn;
              font-size: 14px;
              font-weight: 500;
              line-height: 26px;
              text-align: right;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              margin-bottom: 4px;
              backdrop-filter: blur(6px);
              -webkit-backdrop-filter: blur(6px);
            "
          >
            <div style="font-weight: 500;">${formattedDate}</div>

            ${this.points
              ?.map(
                (point: TooltipPoint) => `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="color:${point.series.color}; font-size: 12px;">●</span>
                  <div style="display: flex; align-items: center; gap: 4px; justify-content: space-between; width: 100%;">
                    <span style="font-size: 14px; font-weight: 400;">${point.series.name}</span>
                    <span style="font-size: 14px; font-weight: 400; margin-left: 12px;">مقدار</span>
                    <span style="unicode-bidi: plaintext;">${Math.round(point.y)} میلیارد</span>
                  </div>
                </div>
              `,
              )
              .join('')}
          </div>
        `;
      },
    },
    title: { text: '' },
    yAxis: {
      ...baseOptions.yAxis,
      gridLineInterpolation: 'polygon',
      gridLineColor: 'Var(--color-border-neutral-secondary)',
      title: { text: '' },
      min: 0,
      labels: {
        formatter: function () {
          return `${this.value}`;
        },
        style: {
          fontSize: '16px',
          fontWeight: '400',
          fontFamily: 'Vazirmatn',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },
    xAxis: {
      reversed: true,
      type: 'datetime',
      tickInterval: 1000 * 60 * 60 * 24 * 2,
      labels: {
        formatter: function () {
          const d = new Date(this.value as number);
          return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        },
        style: {
          fontFamily: 'Vazirmatn',
          fontSize: '16px',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },
    series: [
      {
        type: 'areaspline' as const,
        name: 'ارزش روزانه',
        color: 'var(--color-border-accent-blue-600)',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'var(--coloropacity-surface-accent-blue-600-30per)'],
            [1, 'var(--coloropacity-surface-accent-blue-600-0per)'],
          ],
        },
        data: priceData.map((point, index) => {
          if (index === 0) {
            return {
              x: point[0],
              y: point[1],
              marker: {
                enabled: true,
                radius: 4,
                fillColor: 'var(--color-border-accent-blue-600)',
                lineWidth: 2,
                lineColor: 'var(--color-border-accent-blue-600)',
                symbol: 'circle',
              },
            };
          }
          return { x: point[0], y: point[1] };
        }),
        marker: { enabled: false },
        lineWidth: 2,
      },
    ],
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
