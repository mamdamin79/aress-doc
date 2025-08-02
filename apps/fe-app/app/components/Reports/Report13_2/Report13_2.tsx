import React, { FC, useEffect, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { OptionItem, ReportCardBase } from 'design-system';
import { report13Definitions } from './Report13_2.constants';
import { Report13Dot2CalculationResult } from '@openapi';
import { toBasicSetting } from '../Report.utils';
import { ReportProps } from '../Report.types';

export const Report13_2: FC<ReportProps<Report13Dot2CalculationResult>> = ({
  data,
  filters,
  onRemove,
  onSubmit,
  title,
  onShare,
}) => {
  const [dataState, setDataState] = useState(data);
  const [filterState, setFilterState] = useState(filters);

  useEffect(() => {
    setDataState(data);
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

  // Step 1: Convert histogram bins to { x, y }
  const formattedHistogram = dataState.data.histPoints.map((p) => ({
    x: (p.xMin + p.xMax) / 2,
    y: p.y,
  }));

  const normalizedHistogram = formattedHistogram.map((p) => ({
    x: p.x,
    y: p.y,
  }));

  const normalizedKDE = dataState.data.kdePoints.map((p) => ({
    x: p.x,
    y: p.y,
  }));

  const options: Highcharts.Options = {
    ...baseOptions,
    xAxis: [
      {
        labels: {
          ...xAxisLabels,
          style: {
            fontSize: '12px',
            fontWeight: '400',
            color: 'var(--color-text-neutral-secondary)',
          },
          format: '{value:.2f}',
        },
        crosshair: true,
        plotLines: [
          {
            color: 'var(--color-border-accent-green-700)',
            value: dataState.data.lastTrade,
            width: 1,
            zIndex: 4,
          },
          {
            color: 'var(--color-border-accent-gray-600)',
            value: dataState.data.mean,
            width: 1.5,
            zIndex: 4,
            dashStyle: 'Dash',
          },
        ],
        title: { text: '' },
      },
    ],

    yAxis: [
      {
        title: { text: '' },
        labels: yAxisLabels,
        gridLineWidth: 1,
        tickPixelInterval: 40,
      },
    ],

    series: [
      {
        type: 'spline',
        name: 'میانگین',
        data: [{ x: dataState.data.mean, y: null }],
        color: 'transparent',
        showInLegend: false,
        enableMouseTracking: true,
        tooltip: {
          pointFormatter: function () {
            return `میانگین: <b>${this.x.toFixed(2)}</b>`;
          },
        },
      },
      {
        name: 'فراوانی ارزش معاملات',
        type: 'column',
        data: normalizedHistogram,
        color: 'var(--color-surface-accent-blue-600)',
        yAxis: 0,
        maxPointWidth: 20,
      },
      {
        name: 'تخمین تابع چگالی',
        type: 'spline',
        data: normalizedKDE,
        color: 'var(--color-surface-accent-red-600)',
        yAxis: 0,
      },
      {
        name: 'ارزش معامله‌ی امروز',
        type: 'spline',
        data: [{ x: dataState.data.lastTrade, y: null }],
        color: 'var(--color-surface-accent-green-600)',
        showInLegend: true,
        enableMouseTracking: true,
        tooltip: {
          pointFormatter: function () {
            return `ارزش معامله‌ی امروز: <b>${this.x.toFixed(2)}</b>`;
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      labelFormatter: function () {
        if (this.name === 'فراوانی ارزش معاملات') {
          return 'فراوانی ارزش معاملات <span style="color: var(--color-text-neutral-secondary); font-size: 11px;">(تعداد معامله)</span>';
        } else if (this.name === 'تخمین تابع چگالی') {
          return 'تخمین تابع چگالی <span style="color: var(--color-text-neutral-secondary);">(تعداد معامله)</span>';
        }
        return 'ارزش معامله‌ی امروز <span style="color: var(--color-text-neutral-secondary);">(میلیارد ریال)</span>';
      },
      itemDistance: 14,
      symbolHeight: 8,
      symbolWidth: 8,
    },
  };

  return (
    <ReportCardBase
      title={title ?? ''}
      popupInfoItems={report13Definitions}
      settingOptions={[
        toBasicSetting(filterState[0], updateOption),
        toBasicSetting(filterState[1], updateOption),
        toBasicSetting(filterState[2], updateOption),
      ]}
      onSubmit={handleSubmit}
      onRemove={onRemove}
      onShare={onShare}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};
