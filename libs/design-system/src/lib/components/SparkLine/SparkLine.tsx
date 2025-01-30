'use client';
import React, { useEffect, useRef } from 'react';
import Highcharts, { Options, Chart } from 'highcharts';

interface SparkLineProps {
  options?: Options;
  data: number[];
  trend: 'positive' | 'negative'; // Add the trend prop
}

const defaultOptions: Options = {
  chart: {
    backgroundColor: 'transparent',
    borderWidth: 0,
    type: 'area',
    margin: [2, 0, 2, 0],
    style: {
      overflow: 'visible',
    },
  },
  title: {
    text: '',
  },
  credits: {
    enabled: false,
  },
  xAxis: {
    visible: false,
  },
  yAxis: {
    visible: false,
  },
  legend: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
  plotOptions: {
    series: {
      animation: false,
      lineWidth: 2,
      shadow: false,
      states: {
        hover: {
          enabled: false,
          lineWidth: 1,
        },
      },
      marker: {
        enabled: false,
      },
    },
  },
  series: [
    {
      data: [],
      type: 'area',
    },
  ],
};

export const SparkLine: React.FC<SparkLineProps> = ({
  options,
  data,
  trend,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const lineColor = trend === 'positive' ? '#00822D' : '#DD1919';
      const mergedOptions = Highcharts.merge(defaultOptions, {
        chart: {
          width: 88,
          height: 44,
        },
        series: [
          {
            lineColor,
            fillColor: 'transparent',
          },
        ],
        ...options,
      });
      chartRef.current = Highcharts.chart(containerRef.current, mergedOptions);
    }

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy();
      }
    };
  }, [options, trend]);

  useEffect(() => {
    if (chartRef.current && data) {
      chartRef.current.series[0].setData(data);
    }
  }, [data]);

  return <div ref={containerRef} className="h-11 w-[88px]"></div>;
};
