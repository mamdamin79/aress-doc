import React, { FC, useMemo } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { baseOptions, xAxisLabels, yAxisLabels } from '../Report.config.shared';
import { financialDefinitions } from './Report6.constants';
import { ReportCardBase } from 'design-system';
import {
  FinancialReportFilterApiModel,
  Report6CalculationResult,
} from '@openapi';
interface Report6Props {
  data: Report6CalculationResult;
  filters: FinancialReportFilterApiModel[];
}
export const Report6: FC<Report6Props> = ({ data, filters }) => {
  const { xCategories, inFlowData, outFlowData, indexData } = useMemo(() => {
    const xCategories: string[] = [];
    const inFlowData: (number | null)[] = [];
    const outFlowData: (number | null)[] = [];
    const indexData: number[] = [];

    data.data.forEach((item) => {
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
  }, [data]);

  const options: Highcharts.Options = {
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
        plotLines: [
          {
            value: 0,
            width: 0,
          },
        ],
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
      title="شاخص کل، ورود و خروج ماهانه سرمایه‌گذاران حقیقی به سهام"
      popupInfoItems={financialDefinitions}
      settingOptions={[
        {
          type: 'nestedDropdown',
          props: {
            title: filters[0].parentTitle ?? '',
            items: [
              {
                title: filters[0].title,
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: filters[0].selectedOption.title,
                optionsListProps: {
                  onChange: (item) => {
                    console.log(item);
                  },
                  selectedItemId: Number(filters[0].selectedOption.identifier),
                  searchable: filters[0].searchable,
                  title: filters[0].title,
                  items: {
                    items: filters[0].options.map((option) => ({
                      id: Number(option.identifier),
                      title: option.title,
                    })),
                  },
                },
              },
            ],
          },
        },
        {
          type: 'nestedDropdown',
          props: {
            title: filters[1].parentTitle ?? '',
            items: [
              {
                title: filters[1].title,
                icon: { name: 'square-mouse-pointer', size: 'sm' },
                status: 'normal',
                selectedOption: filters[1].selectedOption.title,
                optionsListProps: {
                  onChange: (item) => {
                    console.log(item);
                  },
                  selectedItemId: Number(filters[1].selectedOption.identifier),
                  searchable: filters[1].searchable,
                  title: filters[1].title,
                  items: {
                    items: filters[1].options.map((option) => ({
                      id: Number(option.identifier),
                      title: option.title,
                    })),
                  },
                },
              },
            ],
          },
        },
        {
          type: 'basicSelection',
          props: {
            title: filters[2].title,
            icon: { name: 'square-mouse-pointer', size: 'sm' },
            status: 'normal',
            selectedOption: filters[2].selectedOption.title,
            optionsListProps: {
              onChange: (item) => {
                console.log(item);
              },
              selectedItemId: Number(filters[2].selectedOption.identifier),
              searchable: filters[2].searchable,
              title: filters[2].title,
              items: {
                items: filters[2].options.map((option) => ({
                  id: Number(option.identifier),
                  title: option.title,
                })),
              },
            },
          },
        },
      ]}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};
