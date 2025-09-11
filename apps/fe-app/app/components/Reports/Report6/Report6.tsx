import React, { FC, useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { financialDefinitions } from './Report6.constants';
import { ReportCardBase } from 'design-system';
import { Report6CalculationResult } from '@openapi';
import { OptionItem } from 'design-system';
import { toBasicSetting, toDropdownSetting } from '../Report.utils';
import { CustomChartOptions, ReportProps } from '../Report.types';

// Custom interface extending Highcharts.Options with unit property for series

export const Report6: FC<ReportProps<Report6CalculationResult>> = ({
  data,
  filters,
  onSubmit,
  title,
  onRemove,
  onShare,
  onReplace,
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

  const { xCategories, inFlowData, outFlowData, indexData } = useMemo(() => {
    const xCategories: string[] = [];
    const inFlowData: (number | null)[] = [];
    const outFlowData: (number | null)[] = [];
    const indexData: number[] = [];

    dataState.data.forEach((item) => {
      xCategories.push(item.dt);
      indexData.push(item.indexValue ?? null);
      const flow = item.netFlow ?? 0;
      if (flow >= 0) {
        inFlowData.push(flow);
        outFlowData.push(null);
      } else {
        inFlowData.push(null);
        outFlowData.push(flow);
      }
    });

    return { xCategories, inFlowData, outFlowData, indexData };
  }, [dataState]);

  const chartOptions: CustomChartOptions = {
    ...baseOptions,
    xAxis: {
      categories: xCategories,
      crosshair: true,
      labels: xAxisLabels,
    },
    yAxis: [
      {
        gridLineColor: 'var(--color-border-neutral-secondary)',
        title: { text: '' },
        labels: yAxisLabels,
        plotLines: [{ value: 0, width: 0 }],
      },
      {
        gridLineColor: 'var(--color-border-neutral-secondary)',
        title: { text: '' },
        opposite: true,
        labels: yAxisLabels,
      },
    ],
    series: [
      {
        name: 'ورود',
        type: 'column',
        data: inFlowData,
        color: 'var(--color-surface-accent-green-600)',
        yAxis: 0,
        unit: data.netFlowUnit + ' ریال ',
        states: {
          inactive: {
            opacity: 1, // prevents other series from dimming
          },
          hover: {
            brightness: 0, // prevents darkening or lightening on hover
          },
        },
      },
      {
        name: 'خروج',
        type: 'column',
        data: outFlowData,
        color: 'var(--color-surface-accent-red-600)',
        yAxis: 0,
        unit: data.netFlowUnit + ' ریال ',
        states: {
          inactive: {
            opacity: 1, // prevents other series from dimming
          },
          hover: {
            brightness: 0, // prevents darkening or lightening on hover
          },
        },
      },
      {
        name: 'شاخص کل',
        type: 'spline',
        data: indexData,
        color: 'var(--color-border-accent-blue-600)',
        yAxis: 1,
        unit: data.indexUnit + ' واحد ',
        states: {
          inactive: {
            opacity: 1, // prevents other series from dimming
          },
          hover: {
            brightness: 0, // prevents darkening or lightening on hover
          },
        },
      },
    ],
    legend: {
      ...baseOptions.legend,
      useHTML: true,
      symbolRadius: 0, // makes it a perfect square

      labelFormatter: function () {
        if (this.name === 'ورود') {
          return `ورود <span style="color: var(--color-text-neutral-secondary); font-size: 11px;">${data.netFlowUnit} ریال</span>`;
        } else if (this.name === 'خروج') {
          return `خروج <span style="color: var(--color-text-neutral-secondary);">${data.netFlowUnit} ریال</span>`;
        }
        return `شاخص کل <span style="color: var(--color-text-neutral-secondary);">${data.indexUnit} واحد</span>`;
      },
    },
  };

  return (
    <ReportCardBase
      title={title ?? ''}
      popupInfoItems={financialDefinitions}
      settingOptions={[
        toDropdownSetting(filterState[0], updateOption),
        toDropdownSetting(filterState[1], updateOption),
        toBasicSetting(filterState[2], updateOption),
      ]}
      onSubmit={handleSubmit}
      onRemove={onRemove}
      onShare={onShare}
      onReplace={onReplace}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ReportCardBase>
  );
};
