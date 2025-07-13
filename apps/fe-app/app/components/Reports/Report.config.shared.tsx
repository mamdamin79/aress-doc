import type Highcharts from 'highcharts';
export const baseOptions: Highcharts.Options = {
  chart: {
    backgroundColor: 'var(--color-surface-neutral-primary)',
    style: {
      fontFamily: 'Vazirmatn',
      width: 616,
      height: 286,
    },
  },
  legend: {
    align: 'right',
    verticalAlign: 'top',
    layout: 'horizontal',
    rtl: true,
    itemStyle: {
      color: 'var(--color-text-neutral-primary)',
      fontSize: '12px',
      fontWeight: '500',
    },
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  tooltip: {
    shared: true,
    useHTML: true,
    backgroundColor: 'transparent',
    borderWidth: 0,
    shadow: false,
    style: {
      zIndex: 1000,
      direction: 'rtl',
    },
    formatter: function (this: any) {
      return `
        <div dir="rtl" style="font-family: vazirmatn, sans-serif; margin-bottom: 0.25rem; border-radius: 10px; background-color: #171717; padding: 0.5rem 1rem; text-align: right; font-size: 0.875rem; font-weight: 500; line-height: 1.5rem; color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); backdrop-filter: blur(6px); z-index: 1000;">
          <div style="font-weight: 500;">${this.key}</div>
          ${this.points
            ?.map(
              (p: any) => `
            <div style="margin-top: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
              <span style="color: ${p.color}; font-size: 0.875rem;">
                ${p.series.userOptions.type === 'spline' ? '●' : '■'}
              </span>
              <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; width: 100%;">
                <span style="font-size: 0.875rem; font-weight: 400;">${p.series.name}:</span>
                <span style="unicode-bidi: plaintext;">
                  ${p.y < 0 ? '-' + Math.abs(p.y) : p.y}${p.point?.unit ? ' ' + p.point.unit : ''}
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

  plotOptions: {
    column: {
      grouping: false,
      borderWidth: 0,
      borderRadius: 4,
    },
    series: {
      borderWidth: 0,
    },
    spline: {
      marker: {
        enabled: false,
      },
    },
  },
};

export const xAxisLabels: Highcharts.XAxisLabelsOptions = {
  style: {
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--color-text-neutral-primary)',
  },
  formatter: function (this: Highcharts.AxisLabelsFormatterContextObject) {
    const chart = this.axis.chart;
    const totalLabels = this.axis.categories?.length ?? 12;
    const spacePerLabel = chart.plotWidth / totalLabels;
    const maxChars = spacePerLabel < 50 ? 10 : 30;
    const label = this.value as string;
    return label.length > maxChars ? label.slice(0, maxChars) : label;
  },
};

export const yAxisLabels: Highcharts.YAxisLabelsOptions = {
  style: {
    fontSize: '12px',
    fontWeight: '400',
    color: 'var(--color-text-neutral-secondarycontrast)',
  },
};
