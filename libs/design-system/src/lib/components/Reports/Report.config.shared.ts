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
      color: 'var(--color-text-neutral-primary)', // Or any custom color
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
    backgroundColor: 'transparent', // required for custom styling
    borderWidth: 0, // remove default border
    shadow: false, // remove default shadow
    style: {
      zIndex: 1000, // set a high z-index value
      direction: 'rtl',
    },
    headerFormat: `
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
              <div style="font-weight: 500;">{point.key}</div>
          `,
    pointFormat: `
          <div style="display: flex; align-items: center; gap: 4px;">
            <span style="color:{series.color}; font-size: 12px;">●</span>
            <div style="display: flex; align-items: center; gap: 4px; justify-content: space-between; width: 100%;">
              <span style="font-size: 14px; font-weight: 400;">{series.name}:</span>
<span style="unicode-bidi: plaintext; display: inline-block; text-direction: left;">{point.y}</span>
            </div>
          </div>
        `,
    footerFormat: `</div>`,
  },
  plotOptions: {
    column: {
      grouping: false,
      borderWidth: 0,
      borderRadius: 4,
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

    const maxChars = spacePerLabel < 50 ? 3 : 6;

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
