import React, { FC, useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions } from '../Report.config.shared';
import { financialDefinitions } from './Report15.constants';
import { ReportCardBase } from 'design-system';
import {
  FinancialReportFilterApiModel,
  Report15CalculationResult,
} from '@openapi';
import { OptionItem } from 'design-system';
import { toBasicSetting, toDropdownSetting } from '../Report.utils';

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
  title?: string;
  data: Report15CalculationResult;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemove?: () => void;
  onShare?: () => void;
}

export const Report15: FC<Report15Props> = ({
  data,
  filters,
  onRemove,
  onSubmit,
  onShare,
  title,
}) => {
  const [filterState, setFilterState] = useState(filters);

  useEffect(() => {
    setFilterState(filters);
  }, [data, filters]);

  const updateOption = (optionType: string, item: OptionItem) => {
    setFilterState((prev) =>
      prev.map((f) =>
        f.optionType === optionType
          ? {
              ...f,
              selectedOption: {
                identifier: item.id.toString(),
                title: item.title,
              },
            }
          : f,
      ),
    );
  };

  const handleSubmit = async (): Promise<boolean> => {
    if (!onSubmit) return true;
    try {
      const filterOptions: Record<string, OptionItem> = Object.fromEntries(
        filterState.map((filter) => [
          filter.optionType,
          {
            id: Number(filter.selectedOption.identifier),
            title: filter.selectedOption.title,
          },
        ]),
      );

      const success = await onSubmit(filterOptions);
      return success;
    } catch (error) {
      console.error('Submit failed:', error);
      return false;
    }
  };
  const containerWidth = 367;
  const containerHeight = 223;

  const chartData = useMemo(() => {
    const xValues = data.graphData.map((p) => p.x);
    const yValues = data.graphData.map((p) => p.y);

    const minX = Math.min(...xValues);
    const maxX = Math.max(...xValues);
    const minY = Math.min(...yValues);
    const maxY = Math.max(...yValues);

    // Make axis symmetric for centered cross lines
    const fullMin = Math.min(minX, minY);
    const fullMax = Math.max(maxX, maxY);

    const regressionLine = [
      [fullMin, data.beta * fullMin + data.yIntersect],
      [fullMax, data.beta * fullMax + data.yIntersect],
    ];

    const squareSize = Math.min(containerWidth, containerHeight);
    const horizontalPadding = (containerWidth - squareSize) / 2;
    const verticalPadding = (containerHeight - squareSize) / 2;

    return {
      regressionLine,
      minXY: fullMin,
      maxXY: fullMax,
      spacing: [
        verticalPadding,
        horizontalPadding,
        verticalPadding,
        horizontalPadding,
      ],
      xMiddle: (minX + maxX) / 2,
      yMiddle: (minY + maxY) / 2,
    };
  }, [data.graphData, data.beta, data.yIntersect]);

  const tickInterval = (chartData.maxXY - chartData.minXY) / 10;

  const options: Highcharts.Options = {
    ...baseOptions,
    chart: {
      type: 'scatter',
      width: containerWidth,
      height: containerHeight,
      reflow: false,
      backgroundColor: 'transparent',
      spacing: [0, 0, 0, 0],
      margin: [0, 0, 0, 0],
    },
    xAxis: {
      min: chartData.minXY,
      max: chartData.maxXY,
      tickInterval,
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
          value: chartData.xMiddle,
          zIndex: 3,
        },
      ],
    },
    tooltip: {
      ...baseOptions.tooltip,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        return `
          <div dir="rtl" style="font-family: vazirmatn, sans-serif; margin-bottom: 0.25rem; border-radius: 10px; background-color: #171717; padding: 0.5rem 1rem; text-align: right; font-size: 0.875rem; font-weight: 500; line-height: 1.5rem; color: white; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); backdrop-filter: blur(6px); z-index: 1000;">
            <div style="font-weight: 500;">${this.tradeDateShamsi}</div>
              <div style="margin-top: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; width: 100%;">
                  <span style="font-size: 0.875rem; font-weight: 400;">بازدهی شاخص قیمت (وزنی-ارزشی)</span>
                  <span style="unicode-bidi: plaintext;">
                    ${this.x < 0 ? '-' + Math.abs(this.x) : this.x}${this.point?.unit ? ' ' + this.point.unit : ''}
                  </span>
                </div>
              </div>
          <div style="margin-top: 0.25rem; display: flex; align-items: center; gap: 0.25rem;">
                <div style="display: flex; justify-content: space-between; align-items: center; gap: 0.75rem; width: 100%;">
                  <span style="font-size: 0.875rem; font-weight: 400;">بازده شاخص پالایشی</span>
                  <span style="unicode-bidi: plaintext;">
                    ${this.y < 0 ? '-' + Math.abs(this.y) : this.y}${this.point?.unit ? ' ' + this.point.unit : ''}
                  </span>
                </div>
              </div>
          </div>
        `;
      },
    },
    yAxis: {
      min: chartData.minXY,
      max: chartData.maxXY,
      tickInterval,
      startOnTick: true,
      endOnTick: true,
      gridLineWidth: 1,
      gridLineColor: 'var(--color-border-neutral-secondary)',
      labels: { enabled: false },
      title: { text: undefined },
      alignTicks: false,
      plotLines: [
        {
          color: 'var(--color-border-accent-blue-600)',
          width: 1,
          value: chartData.yMiddle,
          zIndex: 3,
        },
      ],
    },
    legend: { enabled: false },
    series: [
      {
        name: 'داده‌های واقعی',
        type: 'scatter',
        data: data.graphData,
        marker: {
          symbol: 'diamond',
          radius: 5,
          fillColor: 'var(--color-border-accent-purple-600)',
        },
      },
      {
        name: 'Y = βX+C',
        type: 'line',
        data: chartData.regressionLine.map(([x, y]) => ({ x, y })),
        color: 'var(--color-border-accent-red-600)',
        lineWidth: 2,
        marker: { enabled: false },
        enableMouseTracking: false,
        zIndex: 10,
      },
    ],
  };

  return (
    <ReportCardBase
      settingOptions={[
        toDropdownSetting(filterState[0], updateOption),
        toDropdownSetting(filterState[1], updateOption),
        toBasicSetting(filterState[2], updateOption),
      ]}
      title={title ?? ''}
      popupInfoItems={financialDefinitions}
      onSubmit={handleSubmit}
      onRemove={onRemove}
      onShare={onShare}
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
            <span>بازدهی شاخص {filters[1].selectedOption.title}</span>
          </div>
          <div className="flex items-center gap-2">
            <span>Y = βX+C</span>
            <span className="text-surface-accent-red-600">―</span>
          </div>
        </div>

        <div className="flex flex-row gap-3 px-3 pb-3" dir="rtl">
          <div className="flex flex-col gap-2 pt-[18px]">
            <InfoBox label="بتا (β)" value={data.beta} />
            <InfoBox label="بتای تعدیل شده" value={data.betaAdjusted} />
            <InfoBox label="عرض از مبدا (C)" value={`${data.yIntersect}%+`} />
            <InfoBox label="ضریب تعیین (R2)" value={data.rSquared} />
            <InfoBox label="سطح معنادار (P-Value)" value={data.pValue} />
          </div>
          <div className="h-[223px] w-[367px] pt-[18px]">
            <HighchartsReact highcharts={Highcharts} options={options} />
          </div>
        </div>
      </div>
    </ReportCardBase>
  );
};
