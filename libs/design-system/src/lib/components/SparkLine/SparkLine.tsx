'use client';
import React, { useEffect, useRef } from 'react';
import Highcharts, { Options, Chart } from 'highcharts';
import { defaultOptions, SPARKLINE_CONSTANTS } from './SparkLine.constants';

export interface SparkLineProps {
  data: number[];
  trend: 'positive' | 'negative';
  options?: Options;
  width?: number;
  height?: number;
}

export const SparkLine: React.FC<SparkLineProps> = ({
  options,
  data,
  trend,
  height,
  width,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const chartRef = useRef<Chart | null>(null);
  const chartWidth = width ?? SPARKLINE_CONSTANTS.DIMENSIONS.DEFAULT_WIDTH;
  const chartHeight = height ?? SPARKLINE_CONSTANTS.DIMENSIONS.DEFAULT_HEIGHT;
  useEffect(() => {
    if (containerRef.current) {
      const lineColor =
        trend === 'positive'
          ? SPARKLINE_CONSTANTS.COLORS.POSITIVE
          : SPARKLINE_CONSTANTS.COLORS.NEGATIVE;
      const mergedOptions = Highcharts.merge(defaultOptions, {
        chart: {
          width: chartWidth,
          height: chartHeight,
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
  }, [options, trend, chartWidth, chartHeight]);

  useEffect(() => {
    if (chartRef.current && data) {
      chartRef.current.series[0].setData(data);
    }
  }, [data]);

  return (
    <div
      ref={containerRef}
      style={{
        width: chartWidth + 'px',
        height: chartHeight + 'px',
      }}
      role="img"
      aria-label={`${trend} trend sparkline chart`}
    ></div>
  );
};
