import Highcharts from 'highcharts/highstock';
import jalaali from 'jalaali-js';
import HighchartsReact from 'highcharts-react-official';

export const MultiLineChart = () => {
  const days = 30;
  const baseDate = Date.UTC(2025, 0, 1);

  const priceData = Array.from({ length: days }, (_, i) => [
    baseDate + i * 24 * 3600 * 1000,
    Math.round(
      (50 + Math.sin(i * 0.8) * 30 + (Math.random() - 0.5) * 20) * 0.6,
    ),
  ]);

  const volumeData = Array.from({ length: days }, (_, i) => [
    baseDate + i * 24 * 3600 * 1000,
    Math.round(
      (50 + Math.cos(i * 0.6) * 25 + (Math.random() - 0.5) * 20) * 0.6,
    ),
  ]);

  const indexData = Array.from({ length: days }, (_, i) => [
    baseDate + i * 24 * 3600 * 1000,
    Math.round(
      (50 + Math.sin(i * 1.2) * 30 + (Math.random() - 0.5) * 20) * 0.6,
    ),
  ]);

  const options: Highcharts.Options = {
    legend: {
      labelFormatter: function () {
        if (this.name === 'صندوق سهم آشنا') {
          return `صندوق سهم آشنا: <span style="color: ${this.selected ? this.color : null}; font-size: 11px;">%${22}</span>`;
        } else if (this.name === 'صندوق‌های سهامی') {
          return `صندوق‌های سهامی: <span style="color: ${this.color};">%${22}</span>`;
        }
        return `شاخص کل: <span style="color: ${this.color};">%${22}</span>`;
      },
      rtl: true,
      itemDistance: 14,
      symbolHeight: 8,
      symbolWidth: 8,
    },
    // legend: {
    //   itemDistance: 14,
    //   symbolHeight: 8,
    //   symbolWidth: 8,
    //   itemStyle: {
    //     color: 'var(--color-text-neutral-primary)',
    //     fontSize: '12px',
    //     fontWeight: '500',
    //   },
    // },
    chart: {
      backgroundColor: 'var(--color-surface-neutral-primary)',
      type: 'line',
      events: {},
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
    title: { text: '' },
    yAxis: {
      title: {
        text: '',
      },
      gridLineColor: 'var(--color-border-neutral-secondary)',
      tickInterval: 10,
      min: 0,
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
      },
      crosshair: {
        color: 'var(--color-border-neutral-highcontrast)',
        width: 1,
        dashStyle: 'Dash',
        zIndex: 5,
      },
    },
    series: [
      {
        type: 'line',
        name: 'شاخص کل',
        color: 'var(--color-border-accent-red-600)',
        data: indexData,
        marker: {
          enabled: false,
          symbol: 'square',
        },
        lineWidth: 2,
      },
      {
        type: 'line',
        name: 'صندوق‌های سهامی',
        color: 'var(--color-border-accent-yellow-600)',
        data: volumeData,
        lineWidth: 2,
        marker: {
          enabled: false,
          symbol: 'triangle',
        },
      },

      {
        type: 'line',
        name: 'صندوق سهم آشنا',
        color: 'var(--color-border-accent-blue-600)',
        data: priceData,
        marker: { enabled: false, symbol: 'circle' },
        lineWidth: 2,
      },
    ],
  };

  return <HighchartsReact highcharts={Highcharts} options={options} />;
};
