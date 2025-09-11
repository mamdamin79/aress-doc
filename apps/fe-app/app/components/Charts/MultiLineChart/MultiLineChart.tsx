import Highcharts from 'highcharts/highstock';
import jalaali from 'jalaali-js';
import HighchartsReact from 'highcharts-react-official';

import { FundReturnAnalysisReturnChartApiModel } from '@openapi';

type MultiLineChartProps = {
  data: FundReturnAnalysisReturnChartApiModel[];
};

export const MultiLineChart: React.FC<MultiLineChartProps> = ({ data }) => {
  const series = data.map((fund) => ({
    type: 'line' as const,
    name: fund.title,
    data: fund.history.map((h) => [
      new Date(h.dt).getTime(), // تبدیل تاریخ میلادی به timestamp
      h.returnPercent,
    ]),
    marker: { enabled: false },
    lineWidth: 2,
  }));

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: 'var(--color-surface-neutral-primary)',
      type: 'line',
      height: 600,
    },
    credits: { enabled: false },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    title: { text: '' },
    legend: {
      rtl: true,
      itemDistance: 14,
      symbolHeight: 8,
      symbolWidth: 8,
    },
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
        const { jm, jd } = jalaali.toJalaali(
          gregorianDate.getFullYear(),
          gregorianDate.getMonth() + 1,
          gregorianDate.getDate(),
        );

        const monthNames = [
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

        const formattedDate = `${jd} ${monthNames[jm - 1]}`;
        return `
        <div dir="rtl" style="font-family: vazirmatn, sans-serif; margin-bottom: 0.25rem; border-radius: 10px; background-color: rgba(6, 8, 15,0.85); padding: 0.5rem 1rem; text-align: right; font-size: 0.875rem; font-weight: 500; line-height: 1.5rem; color: var(--color-text-neutral-oninverse); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); backdrop-filter: blur(6px); z-index: 1000;">
          <div style="font-weight: 500;">${formattedDate}</div>
          ${this.points
            ?.map(
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              (p: any) => `
            <div style="margin-top: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
              <span style="color: ${p.color}; font-size: 0.875rem;">
                ${p.series.userOptions.marker.symbol === 'circle' ? '●' : p.series.userOptions.marker.symbol === 'triangle' ? '▲' : '■'}
              </span>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; width: 100%;">
                <span style="font-size: 0.875rem; font-weight: 400;">${p.series.name}:</span>
                <span style="unicode-bidi: plaintext;">
                 ٪${p.y < 0 ? p.y + '-' : p.y}${p.series.userOptions.unit ? ' ' + p.series.userOptions.unit : ''}
                </span>
              </div>
            </div>
          `,
            )
            .join('')}
        </div>
      `;
      },
    },
    yAxis: {
      title: {
        text: '',
      },
      gridLineColor: 'var(--color-border-neutral-secondary)',
      // tickInterval: 0.1,
      // min:
      //   Math.min(
      //     ...data.flatMap((f) => f.history.map((h) => h.returnPercent)),
      //   ) - 1,
      // max:
      //   Math.max(
      //     ...data.flatMap((f) => f.history.map((h) => h.returnPercent)),
      //   ) + 1,
      labels: {
        style: {
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
          fontFamily: 'Vazirmatn',
        },
      },
    },
    xAxis: {
      type: 'datetime',
      tickLength: 0,
      labels: {
        style: {
          color: 'var(--color-text-neutral-secondarycontrast)',
          fontFamily: 'Vazirmatn',
        },
        formatter: function () {
          const date = new Date(this.value as number);
          const { jm, jd } = jalaali.toJalaali(
            date.getFullYear(),
            date.getMonth() + 1,
            date.getDate(),
          );

          const monthShortNames = [
            'فر', // فروردین
            'ار', // اردیبهشت
            'خ', // خرداد
            'تی', // تیر
            'مر', // مرداد
            'شه', // شهریور
            'مه', // مهر
            'آب', // آبان
            'آذ', // آذر
            'دی', // دی
            'به', // بهمن
            'اس', // اسفند
          ];

          return `${jd} ${monthShortNames[jm - 1]}`;
        },
      },
      crosshair: {
        color: 'var(--color-border-neutral-highcontrast)',
        width: 1,
        dashStyle: 'Dash',
        zIndex: 5,
      },
    },

    series,
  };

  return (
    <div className="h-full w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
