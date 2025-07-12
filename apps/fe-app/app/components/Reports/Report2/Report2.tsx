import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from '../../../../../../libs/design-system/src/lib/components/ReportCardBase';
import { baseOptions, yAxisLabels, xAxisLabels } from './../Report.config.shared'
import { financialDefinitions } from './Report2.constants';
import { FinancialReportFilterApiModel, Report2CalculationResult } from '@openapi';
import { OptionItem } from 'libs/design-system/src/lib/components/OptionsListExplorer/OptionsListExplorer.types';
import { useEffect, useMemo, useState } from 'react';
import { toBasicSetting, toDropdownSetting } from '../Report.utils';


interface Report6Props {
  title?: string;
  data: Report2CalculationResult;
  filters: FinancialReportFilterApiModel[];
  onSubmit?: (changedOptions: Record<string, OptionItem>) => Promise<boolean>;
}


export function Report2({ data, title, filters, onSubmit }: Report6Props) {

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

  const categories = data.data.map((value) => value.sectorTitle);

  const chartData = data.data.map((value) => ({
    y: Math.round(value.netFlow / 1_000_000_000_000),
    color:
      value.netFlow > 0
        ? 'var(--color-surface-accent-green-600)'
        : 'var(--color-surface-accent-red-600)',
  }));


  const options: Highcharts.Options = {
    ...baseOptions,
    yAxis: {
      gridLineColor: 'var(--color-border-neutral-secondary)',
      reversed: true,
      min: 0,
      tickInterval: 10,
      title: { text: null },
      labels: yAxisLabels,
    },
    legend: { enabled: false },
    series: [
      {
        name: 'صنعت',
        type: 'bar',
        data: chartData,
        borderRadius: 7,
      },
    ],
    xAxis: {
      opposite: true,
      lineColor: 'var(--color-border-neutral-highcontrast)',
      categories,
      labels: xAxisLabels,
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
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
}
