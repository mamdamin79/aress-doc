'use client';

'use client';

import dynamic from 'next/dynamic';

const HighchartsReact = dynamic(() => import('highcharts-react-official'), {
  ssr: false,
});
import Highcharts from 'highcharts/highstock';
import 'highcharts/highcharts-more';
import { useMemo } from 'react';
import { baseOptions } from '../../../../components/Reports/Report.config.shared';

interface BubbleChartProps {
  bubbleData?: { x: number; y: number; z: number; name: string; nav: string }[];
  currentFundName?: string;
}

export const BubbleChart = ({
  bubbleData = [],
  currentFundName = 'صندوق سهم آشنا',
}: BubbleChartProps) => {
  const points = useMemo(() => {
    const sortedData = [...bubbleData].sort((a, b) => a.y - b.y);

    const getQuantile = (data: typeof sortedData, q: number) => {
      if (!data || data.length === 0) return 0;
      const index = (data.length - 1) * q;
      const lower = Math.floor(index);
      const upper = Math.ceil(index);
      if (lower === upper) return data[lower].y;
      const p = index - lower;
      return data[lower].y * (1 - p) + data[upper].y * p;
    };

    const q1 = getQuantile(sortedData, 1 / 3);
    const q2 = getQuantile(sortedData, 2 / 3);

    const getGradientColor = (
      baseColor: string,
    ): Highcharts.GradientColorObject => ({
      radialGradient: { cx: 0.5, cy: 0.5, r: 0.5 },
      stops: [
        [0, `${baseColor}33`] as [number, string],
        [1, `${baseColor}FF`] as [number, string],
      ],
    });

    return bubbleData.map((p) => {
      let colorGradient;
      let lineColor = '';

      if (p.name === currentFundName) {
        colorGradient = getGradientColor('#1876DC');
        lineColor = '#1876DC';
      } else if (p.y > q2) {
        colorGradient = getGradientColor('#16883C');
        lineColor = '#16883C';
      } else if (p.y > q1) {
        colorGradient = getGradientColor('#74777C');
        lineColor = '#74777C';
      } else {
        colorGradient = getGradientColor('#DD3636');
        lineColor = '#DD3636';
      }

      return {
        ...p,
        z: parseFloat(p.nav),
        color: colorGradient,
        marker: {
          lineColor,
          lineWidth: 2,
          fillOpacity: 1,
        },
      };
    });
  }, [bubbleData, currentFundName]);

  const options: Highcharts.Options = {
    ...baseOptions,
    chart: {
      plotBorderColor: 'var(--color-border-neutral-secondary)',
      backgroundColor: 'var(--color-surface-neutral-background)',
      type: 'bubble',
      plotBorderWidth: 1,
      style: {
        width: 741,
        height: 510,
      },
    },
    title: { text: '' },
    legend: { enabled: false },
    credits: { enabled: false },
    tooltip: {
      useHTML: true,
      shadow: false,
      borderColor: 'transparent',
      backgroundColor: 'var(--color-surface-neutral-inverse)',
      borderRadius: 8,
      borderWidth: 1,
      style: {
        direction: 'rtl',
        textAlign: 'right',
        color: 'var(--color-text-neutral-oninverse)',
        padding: '8px 16px',
      },
      formatter: function () {
        const point = this as Highcharts.Point & {
          nav: string;
        };
        return `
          <div style="direction: rtl; font-family: Vazirmatn; color: var(--color-text-neutral-oninverse);">
            <div style="font-size: 14px; font-weight: bold; margin-bottom: 10px; white-space: nowrap; line-height: 26px;">
              ${point.name}
            </div>
            <div style="font-size: 14px; margin-bottom: 5px;">
              بازده:  <span style="font-weight: bold;">${point.y}</span>%
            </div>
            <div style="font-size: 14px; margin-bottom: 5px;">
              انحراف معیار:  <span style="font-weight: bold;">${point.x}</span>
            </div>
            <div style="font-size: 14px; margin-bottom: 5px;">
              ارزش خالص دارایی ها:  <span style="font-weight: bold;">${point.nav}</span> میلیارد ریال
            </div>
          </div>
        `;
      },
    },
    xAxis: {
      gridLineWidth: 1,
      gridLineColor: 'var(--color-border-neutral-secondary)',
      tickAmount: 9,
      title: {
        text: 'انحراف معیار',
        style: {
          fontFamily: 'Vazirmatn',
          fontSize: '14px',
          fontWeight: 'bold',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
      labels: {
        formatter: function () {
          return `${this.value}`;
        },
        style: {
          fontFamily: 'Vazirmatn',
          fontSize: '14px',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },
    yAxis: {
      gridLineColor: 'var(--color-border-neutral-secondary)',
      startOnTick: false,
      endOnTick: false,
      tickAmount: 6,
      title: {
        text: undefined,
        style: {
          fontWeight: 'bold',
          position: 'top',
        },
      },
      labels: {
        formatter: function () {
          return `%${this.value}`;
        },
        style: {
          fontFamily: 'Vazirmatn',
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },
    plotOptions: {
      bubble: {
        minSize: 10,
        maxSize: 60,
        zMin: 12, // Updated to match your new NAV data
        zMax: 70, // Updated to match your new NAV data
        cursor: 'pointer',
        marker: {
          fillOpacity: 0.6,
          lineWidth: 1,
          lineColor: 'var(--color-border-neutral-secondary)',
        },
      },
      series: {
        stickyTracking: false,
        dataLabels: {
          enabled: true,
          format: '{point.name}',
          style: {
            fontFamily: 'Vazirmatn',
            fontSize: '12px',
            color: 'var(--color-text-neutral-primary)',
            fontWeight: '500',
            textOutline: 'none',
          },
          // allowOverlap: false,
          // align: 'right',
          // verticalAlign: 'middle',
          // x: , // Adjust this value to move the label away from the bubble
        },
      },
    },
    series: [
      {
        type: 'bubble',
        data: points,
      },
    ],
  };

  return (
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
