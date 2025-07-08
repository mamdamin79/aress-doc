import React, { FC, useEffect, useMemo, useState } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { financialDefinitions } from './Report6.constants';
import { ReportCardBase } from 'design-system';
import {
  FinancialReportFilterApiModel,
  Report6CalculationResult,
} from '@openapi';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';
import { IconName } from 'libs/design-system/src/lib/components/Icon/Icon.types';

interface Report6Props {
  title?: string;
  data: Report6CalculationResult;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
}

export const Report6: FC<Report6Props> = ({
  data,
  filters,
  onSubmit,
  title,
}) => {
  const [dataState, setDataState] = useState(data);
  const [filterState, setFilterState] = useState(filters);
  const [changedOptions, setChangedOptions] = useState<
    Record<string, OptionItem>
  >({});

  useEffect(() => {
    setDataState(data);
    setFilterState(filters);
  }, [data, filters]);

  const updateOption = (optionType: string, item: OptionItem) => {
    setChangedOptions((prev) => ({ ...prev, [optionType]: item }));
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
    if (!onSubmit || Object.keys(changedOptions).length === 0) return true;
    try {
      const success = await onSubmit(changedOptions);
      if (success) setChangedOptions({});
      return success;
    } catch (error) {
      console.error('Submit failed:', error);
      return false;
    }
  };

  const toOptionListProps = (filter: FinancialReportFilterApiModel) => ({
    onChange: (item: OptionItem) => updateOption(filter.optionType, item),
    selectedItemId: Number(filter.selectedOption.identifier),
    searchable: filter.searchable,
    title: filter.title,
    items: {
      items: filter.options.map((opt) => ({
        id: Number(opt.identifier),
        title: opt.title,
      })),
    },
  });

  const icon = (name: IconName) => ({ name, size: 'sm' as const });

  const toDropdownSetting = (filter: FinancialReportFilterApiModel) => ({
    type: 'nestedDropdown' as const,
    props: {
      title: filter.parentTitle ?? '',
      items: [
        {
          title: filter.title,
          icon: icon('square-mouse-pointer'),
          status: 'normal' as const,
          selectedOption: filter.selectedOption.title,
          optionsListProps: toOptionListProps(filter),
        },
      ],
    },
  });

  const toBasicSetting = (filter: FinancialReportFilterApiModel) => ({
    type: 'basicSelection' as const,
    props: {
      title: filter.title,
      icon: icon('square-mouse-pointer'),
      status: 'normal' as const,
      selectedOption: filter.selectedOption.title,
      optionsListProps: toOptionListProps(filter),
    },
  });

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

  const chartOptions: Highcharts.Options = {
    ...baseOptions,
    xAxis: {
      categories: xCategories,
      crosshair: true,
      labels: xAxisLabels,
    },
    yAxis: [
      {
        title: { text: '' },
        labels: yAxisLabels,
        plotLines: [{ value: 0, width: 0 }],
      },
      {
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
      },
      {
        name: 'خروج',
        type: 'column',
        data: outFlowData,
        color: 'var(--color-surface-accent-red-600)',
        yAxis: 0,
      },
      {
        name: 'شاخص کل',
        type: 'spline',
        data: indexData,
        color: 'var(--color-border-accent-blue-600)',
        yAxis: 1,
      },
    ],
    legend: {
      ...baseOptions.legend,
      useHTML: true,
      labelFormatter: function () {
        if (this.name === 'ورود') {
          return 'ورود <span style="color: var(--color-text-neutral-secondary); font-size: 11px;">(میلیارد ریال)</span>';
        } else if (this.name === 'خروج') {
          return 'خروج <span style="color: var(--color-text-neutral-secondary);">(میلیارد ریال)</span>';
        }
        return 'شاخص کل <span style="color: var(--color-text-neutral-secondary);">(میلیون واحد)</span>';
      },
    },
  };

  return (
    <ReportCardBase
      title={title ?? ''}
      popupInfoItems={financialDefinitions}
      settingOptions={[
        toDropdownSetting(filterState[0]),
        toDropdownSetting(filterState[1]),
        toBasicSetting(filterState[2]),
      ]}
      onSubmit={handleSubmit}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ReportCardBase>
  );
};
