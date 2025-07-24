import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from 'design-system';
import {
  baseOptions,
  yAxisLabels,
  xAxisLabels,
} from './../Report.config.shared';
import {
  FinancialReportFilterApiModel,
  Report2CalculationResult,
} from '@openapi';
import { OptionItem } from 'design-system';
import { financialDefinitions } from './Report2.constants';
import { toBasicSetting } from '../Report.utils';
import { useEffect, useState, useMemo } from 'react';

export interface Report2Props {
  title?: string;
  data: Report2CalculationResult;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
  onRemove?: () => void;
}

export function Report2({
  data,
  filters,
  onSubmit,
  title,
  onRemove,
}: Report2Props) {
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
            id: Number(filter.selectedOption?.identifier),
            title: filter.selectedOption?.title ?? '',
          },
        ]),
      );

      return await onSubmit(filterOptions);
    } catch (error) {
      console.error('Submit failed:', error);
      return false;
    }
  };

  const seriesData = useMemo(() => {
    return dataState.data.map((item) => ({
      y: item.netFlow,
      name: item.sectorTitle,
      color:
        filterState[0].selectedOption.identifier === '1'
          ? 'var(--color-surface-accent-green-600)'
          : 'var(--color-surface-accent-red-600)',
    }));
  }, [dataState]);

  const chartOptions: Highcharts.Options = useMemo(() => {
    return {
      ...baseOptions,
      chart: {
        ...baseOptions.chart,
      },
      yAxis: {
        gridLineColor: 'var(--color-border-neutral-secondary)',
        reversed: true,
        min: 0,
        title: {
          text: 'میلیارد ریال',
          textAlign: 'right',
          offset: 15,
          x: 590,
        },
        labels: yAxisLabels,
      },
      legend: { enabled: false },
      series: [
        {
          name: 'صنعت',
          type: 'bar',
          data: seriesData,
          borderRadius: 4,
        },
      ],
      xAxis: {
        opposite: true,
        lineColor: 'var(--color-border-neutral-highcontrast)',
        labels: {
          ...xAxisLabels,
          align: 'right',
          reserveSpace: true,
        },
        categories: dataState.data.map((item) => item.sectorTitle),
      },
    };
  }, [seriesData, dataState]);

  return (
    <ReportCardBase
      title={title ?? ''}
      popupInfoItems={financialDefinitions}
      settingOptions={[
        toBasicSetting(filterState[0], updateOption),
        toBasicSetting(filterState[1], updateOption),
        toBasicSetting(filterState[2], updateOption),
      ]}
      onSubmit={handleSubmit}
      onRemove={onRemove}
    >
      <HighchartsReact highcharts={Highcharts} options={chartOptions} />
    </ReportCardBase>
  );
}
