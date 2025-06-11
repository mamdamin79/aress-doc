import React from 'react';
import ReactDOMServer from 'react-dom/server';
import type Highcharts from 'highcharts';
interface extendedPoint extends Highcharts.Point {
  point?: {
    unit?: string;
  };
}
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
    formatter: function () {
      return ReactDOMServer.renderToStaticMarkup(
        <div
          dir="rtl"
          className="font-vazirmatn mb-1 rounded-[10px] bg-neutral-900 px-4 py-2 text-right text-sm font-medium leading-6 text-white shadow-md backdrop-blur-[6px]"
          style={{ zIndex: 1000 }}
        >
          <div className="font-medium">{this.key}</div>
          {this.points?.map((p: extendedPoint) => (
            <div key={p.series.name} className="mt-1 flex items-center gap-1">
              <span style={{ color: p.color as any }} className="text-xs">
                ●
              </span>
              <div className="flex w-full items-center justify-between gap-3">
                <span className="text-sm font-normal">{p.series.name}:</span>
                <span
                  className="inline-block"
                  style={{ unicodeBidi: 'plaintext' }}
                >
                  {p.y && p.y < 0 ? `${Math.abs(p.y)}-` : p.y}
                  {p.point && 'unit' in p.point ? ` ${p.point.unit}` : ''}
                </span>
              </div>
            </div>
          ))}
        </div>,
      );
    },
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
