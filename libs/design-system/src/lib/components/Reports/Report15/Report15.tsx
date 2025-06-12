import React, { FC, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions } from '../Report.config.shared';
import { ReportCardBase } from '../../ReportCardBase';
import { financialDefinitions } from './Report15.constants';

const getMean = (data: number[]) => {
  if (data.length === 0) return 0;
  return data.reduce((a, b) => a + b, 0) / data.length;
};

interface InfoBoxProps {
  label: string;
  value: string | number;
}

const InfoBox: FC<InfoBoxProps> = ({ label, value }) => (
  <div className="border-border-neutral-secondary text-text-neutral-primary flex h-[38px] w-[209px] items-center justify-between rounded-lg border px-3 py-2 text-xs font-normal">
    <span>{label}</span>
    <span>{value}</span>
  </div>
);

export interface Report15Props {
  scatterData: [number, number][];
  beta: number;
  adjustedBeta: number;
  intercept: number;
  rSquared: number;
  pValue: string;
}

export const Report15: FC<Report15Props> = ({
  scatterData,
  beta,
  adjustedBeta,
  intercept,
  rSquared,
  pValue,
}) => {
  const containerWidth = 367;
  const containerHeight = 223;

  const chartData = useMemo(() => {
    const xValues = scatterData.map((p) => p[0]);
    const yValues = scatterData.map((p) => p[1]);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);

    const regressionLine = [
      [minX, beta * minX + intercept],
      [maxX, beta * maxX + intercept],
    ];

    const xMean = getMean(xValues);
    const yMean = getMean(yValues);
    const minXY = Math.min(...xValues, ...yValues);
    const maxXY = Math.max(...xValues, ...yValues);

    const squareSize = Math.min(containerWidth, containerHeight);
    const horizontalPadding = (containerWidth - squareSize) / 2;
    const verticalPadding = (containerHeight - squareSize) / 2;

    return {
      regressionLine,
      xMean,
      yMean,
      minXY,
      maxXY,
      spacing: [
        verticalPadding,
        horizontalPadding,
        verticalPadding,
        horizontalPadding,
      ],
    };
  }, [scatterData, beta, intercept]);
  const tickInterval = (chartData.maxXY - chartData.minXY) / 10;
  const options: Highcharts.Options = {
    ...baseOptions,
    chart: {
      type: 'scatter',
      width: 367,
      height: 223,
      reflow: false,
      backgroundColor: 'transparent',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
    },

    xAxis: {
      min: chartData.minXY,
      max: chartData.maxXY,
      tickInterval: tickInterval,
      startOnTick: true,
      endOnTick: true,
      gridLineWidth: 1,
      gridLineColor: 'var(--color-border-neutral-secondary)',
      lineColor: 'transparent',
      tickWidth: 0,
      alignTicks: false,
      labels: {
        enabled: false,
      },
      plotLines: [
        {
          color: 'var(--color-border-accent-blue-600)',
          width: 1,
          value: chartData.xMean,
          zIndex: 3,
        },
      ],
    },

    yAxis: {
      min: chartData.minXY,
      max: chartData.maxXY,
      tickInterval: tickInterval,
      startOnTick: true,
      endOnTick: true,
      gridLineWidth: 1,
      gridLineColor: 'var(--color-border-neutral-secondary)',
      labels: { enabled: false },
      title: { text: null },
      alignTicks: false,
      plotLines: [
        {
          color: 'var(--color-border-accent-blue-600)',
          width: 1,
          value: chartData.yMean,
          zIndex: 3,
        },
      ],
    },

    legend: { enabled: false },
    series: [
      {
        name: 'داده‌های واقعی',
        type: 'scatter',
        data: scatterData,
        marker: {
          symbol: 'diamond',
          radius: 5,
          fillColor: 'var(--color-border-accent-purple-600)',
        },
      },
      {
        name: 'Y = βX+C',
        type: 'line',
        data: chartData.regressionLine,
        color: 'var(--color-border-accent-red-600)',
        lineWidth: 2,
        marker: { enabled: false },
        enableMouseTracking: false,
      },
    ],
  };

  return (
    <ReportCardBase
      settingOptions={[
        {
          type: 'basicSelection',
          props: {
            title: 'جریان پول: ',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'ورودی',
          },
        },
        {
          type: 'basicSelection',
          props: {
            title: 'نوع سرمایه‌گذار: ',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'حقیقی',
          },
        },
        {
          type: 'basicSelection',
          props: {
            title: 'بازه زمانی: ',
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: 'یک ماه',
          },
        },
      ]}
      title="رابطه بین شاخص قیمت (وزنی-ارزشی) و شاخص پالایشی در یک سال گذشته"
      popupInfoItems={financialDefinitions}
    >
      <div className="flex flex-col gap-1">
        <div className="text-text-neutral-primary flex items-center justify-start gap-6 px-3 pt-1 text-xs font-medium">
          <div className="flex items-center gap-2">
            <span className="text-surface-accent-purple-600">◆</span>
            <span>داده‌های واقعی</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-surface-accent-blue-600">X</span>
            <span>بازدهی شاخص قیمت (وزنی-ارزشی)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-surface-accent-blue-600">Y</span>
            <span>بازدهی شاخص پالایشی</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Y = βX+C</span>
            <span className="text-surface-accent-red-600">―</span>
          </div>
        </div>

        <div className="flex flex-row gap-3 px-3 pb-3" dir="rtl">
          {/* Info Boxes */}
          <div className="flex flex-col gap-2 pt-[18px]">
            <InfoBox label="بتا (β)" value={beta} />
            <InfoBox label="بتای تعدیل شده" value={adjustedBeta} />
            <InfoBox label="عرض از مبدا (C)" value={`${intercept}%+`} />
            <InfoBox label="ضریب تعیین (R2)" value={rSquared} />
            <InfoBox label="سطح معنادار (P-Value)" value={pValue} />
          </div>

          {/* Chart */}
          <div className="h-[223px] w-[367px] pt-[18px]">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </ReportCardBase>
  );
};
