'use client';
import React, { useEffect, useMemo, useState } from 'react';
import Highcharts, { GradientColorObject } from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import 'highcharts/highcharts-more';
import 'highcharts/modules/solid-gauge';

const translateRiskText = (value: number): string => {
  if (value <= 25) return 'کم';
  if (value <= 50) return 'متوسط';
  if (value <= 75) return 'زیاد';
  return 'شدید';
};

const getRiskColor = (value: number) => {
  if (value <= 25)
    return [
      'var(--color-surface-accent-green-100)',
      'var(--color-surface-accent-green-300)',
      'var(--color-surface-accent-green-600)',
    ];
  if (value <= 50)
    return [
      'var(--color-surface-accent-vividgreen-100)',
      'var(--color-surface-accent-vividgreen-300)',
      'var(--color-surface-accent-vividgreen-500)',
    ];
  if (value <= 75)
    return [
      'var(--color-surface-accent-yellow-100)',
      'var(--color-surface-accent-yellow-400)',
      'var(--color-surface-accent-yellow-600)',
    ];
  return [
    'var(--color-surface-accent-red-200)',
    'var(--color-surface-accent-red-400)',
    'var(--color-surface-accent-red-600)',
  ];
};

export interface RiskGaugeProps {
  value: number;
  className?: string;
  title?: string;
}

export const RiskGauge: React.FC<RiskGaugeProps> = ({ value, className }) => {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    const duration = 500; // animation duration in ms

    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = timestamp - start;
      const currentValue = Math.min(
        value,
        Math.round((progress / duration) * value),
      );

      setAnimatedValue(currentValue);
      if (progress < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [value]);
  const startAngle = -135;
  const endAngle = 135;
  const totalAngle = endAngle - startAngle;
  const triangleRotation = startAngle + (totalAngle * animatedValue) / 100;
  const chartOptions = useMemo<Highcharts.Options>(() => {
    const segmentPercents = Array(8).fill(12.5); // 8 equal segments
    const gap = 2;
    const segmentColors: GradientColorObject[] = [
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-green-500)'],
          [1, 'var(--color-surface-accent-green-600)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-green-500)'],
          [1, 'var(--color-surface-accent-green-600)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-vividgreen-500)'],
          [1, 'var(--color-surface-accent-vividgreen-700)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-vividgreen-500)'],
          [1, 'var(--color-surface-accent-vividgreen-700)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-yellow-500)'],
          [1, 'var(--color-surface-accent-yellow-600)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-yellow-500)'],
          [1, 'var(--color-surface-accent-yellow-600)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-red-500)'],
          [1, 'var(--color-surface-accent-red-600)'],
        ] as [number, string][],
      },
      {
        linearGradient: { x1: 0.5, y1: 0, x2: 0.5, y2: 1 },
        stops: [
          [0, 'var(--color-surface-accent-red-500)'],
          [1, 'var(--color-surface-accent-red-600)'],
        ] as [number, string][],
      },
    ];

    // Calculate plot bands
    let current = startAngle;
    const plotBands: Highcharts.YAxisPlotBandsOptions[] = segmentPercents.map(
      (p, idx) => {
        const fromAngle = current;
        const toAngle = current + (totalAngle * p) / 100;
        const from = (100 * (fromAngle - startAngle)) / totalAngle + gap / 2;
        const to = (100 * (toAngle - startAngle)) / totalAngle - gap / 2;
        current = toAngle;

        return {
          from,
          to,
          color: segmentColors[idx],
          borderWidth: 0,
          thickness: '18%', // slightly thinner
          innerRadius: '74%', // keep a small gap for the center circle
          outerRadius: '92%', // slightly smaller than 100%
        };
      },
    );

    return {
      chart: {
        type: 'solidgauge',
        backgroundColor: 'transparent',
        spacing: [0, 0, 0, 0],
        width: 300,
        height: 285,
        margin: 0,
      },
      title: undefined,
      tooltip: { enabled: false },
      credits: { enabled: false },
      pane: { startAngle, endAngle, size: '100%', background: undefined },
      yAxis: {
        min: 0,
        max: 100,
        lineWidth: 0,
        tickPositions: [],
        labels: { enabled: false },
        plotBands,
      },
      plotOptions: {
        solidgauge: {
          radius: '100%',
          innerRadius: '75%',
          linecap: 'round',
          rounded: true,
        },
      },
      series: [
        {
          type: 'solidgauge',
          data: [animatedValue],
          radius: '0%', // shrink radius
          innerRadius: '0%', // shrink radius
          color: 'transparent',
          dataLabels: { enabled: false },
        },
      ],
    };
  }, [animatedValue]);

  return (
    <div className={`${className} w-[300px]`}>
      {/* Chart container */}
      <div className="relative h-[263px] w-[300px]">
        <HighchartsReact
          highcharts={Highcharts}
          options={chartOptions}
          containerProps={{ style: { width: '300px', height: '300px' } }}
        />

        {/* Center circle */}
        <div
          className="absolute inset-0 m-auto flex items-center justify-center rounded-full"
          style={{
            width: 185,
            height: 185,
            top: 50,
            right: 56,
            backgroundColor: getRiskColor(value)[0],
          }}
        >
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width: 167,
              height: 167,
              backgroundColor: getRiskColor(value)[1],
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width: 149,
                height: 149,
                transform: `rotate(${triangleRotation + 48}deg)`,
                transformOrigin: '50% 50%', // rotate around the center
                backgroundColor: getRiskColor(value)[2],
              }}
            >
              <div
                className="text-text-neutral-white flex flex-col justify-center gap-2 text-center font-medium"
                style={{
                  transform: `rotate(${-triangleRotation - 48}deg)`,
                  transformOrigin: '50% 50%', // rotate around the center
                }}
              >
                <span className="text-4xl">{value}</span>
                <div className="flex flex-col">
                  <span className="text-xs">میزان ریسک:</span>
                  <span className="text-md">{translateRiskText(value)}</span>
                </div>
              </div>
              <div
                className="absolute"
                style={{
                  width: 0,
                  height: 0,
                  borderLeft: '20px solid transparent',
                  borderRight: '20px solid transparent',
                  borderBottom: `40px solid ${getRiskColor(value)[2]}`,
                  top: 0,
                  left: '0',
                  transform: 'rotate(-45deg)',
                  clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)',
                  borderRadius: '3px',
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-14 flex w-[322px] flex-col">
        <div className="flex w-full justify-between text-xs font-medium">
          <span>درجه ریسک</span>
          <span>میزان ریسک</span>
        </div>
        <ul className="mt-4 flex w-full flex-col gap-4">
          <li className="text-text-neutral-secondary flex w-full items-center gap-5">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: 'var(--color-surface-accent-green-600)',
              }}
            ></div>
            <div className="">0-25</div>
            <div className="flex flex-1 items-center">
              ..................................
            </div>
            <div className="text-xs font-medium">کم</div>
          </li>
          <li className="text-text-neutral-secondary flex w-full items-center gap-5">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: 'var(--color-surface-accent-vividgreen-600)',
              }}
            ></div>
            <div className="">26-50</div>
            <div className="flex flex-1 items-center">
              ..................................
            </div>
            <div className="text-xs font-medium">متوسط</div>
          </li>
          <li className="text-text-neutral-secondary flex w-full items-center gap-5">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: 'var(--color-surface-accent-yellow-600)',
              }}
            ></div>
            <div className="">51-75</div>
            <div className="flex flex-1 items-center">
              ..................................
            </div>
            <div className="text-xs font-medium">زیاد</div>
          </li>
          <li className="text-text-neutral-secondary flex w-full items-center gap-5">
            <div
              className="h-4 w-4 rounded-full"
              style={{
                backgroundColor: 'var(--color-surface-accent-red-600)',
              }}
            ></div>
            <div className="">75-100</div>
            <div className="flex flex-1 items-center">
              ..................................
            </div>
            <div className="text-xs font-medium">شدید</div>
          </li>
        </ul>
      </div>
    </div>
  );
};
