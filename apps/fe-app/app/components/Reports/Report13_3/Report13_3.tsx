import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import { useMemo, useState, useEffect } from 'react';
import { ReportCardBase } from 'design-system';
import { baseOptions } from './../Report.config.shared';
import { Report13Dot3CalculationResult } from '@openapi';
import { OptionItem } from 'design-system';
import { toBasicSetting } from '../Report.utils';
import { ReportProps } from '../Report.types';

export const Report13_3: React.FC<
  ReportProps<Report13Dot3CalculationResult>
> = ({ data, filters, title, onSubmit, onRemove, onShare, onReplace }) => {
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

  const priceData = useMemo<[number, number][]>(() => {
    if (!dataState.data[0].points.length) return [];

    return dataState.data[0].points.map(({ date, value }) => {
      const [year, month, day] = date.split('-').map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      return [timestamp, parseFloat(value.toFixed(2))];
    });
  }, [dataState]);

  const options: Highcharts.Options = {
    ...baseOptions,
    legend: { enabled: false },
    chart: {
      backgroundColor: 'var(--color-surface-neutral-primary)',
      type: 'line',
    },
    credits: { enabled: false },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      style: { direction: 'rtl' },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      formatter: function (this: any) {
        const gregorianDate = new Date(this.x as number);
        const formattedDate = `${gregorianDate.getFullYear()}/${String(
          gregorianDate.getMonth() + 1,
        ).padStart(
          2,
          '0',
        )}/${String(gregorianDate.getDate()).padStart(2, '0')}`;

        interface TooltipPoint {
          series: { color: string; name: string };
          y: number;
        }

        return `
            <div dir="rtl" style="font-family: vazirmatn, sans-serif; margin-bottom: 0.25rem; border-radius: 10px; background-color: rgba(6, 8, 15,0.85); padding: 0.5rem 1rem; text-align: right; font-size: 0.875rem; font-weight: 500; line-height: 1.5rem; color: var(--color-text-neutral-oninverse); box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3); backdrop-filter: blur(6px); z-index: 1000;">
            <div style="font-weight: 500;">${formattedDate}</div>

            ${this.points
              ?.map(
                (point: TooltipPoint) => `
                <div style="display: flex; align-items: center; gap: 4px;">
                  <span style="color:${point.series.color}; font-size: 12px;">●</span>
                  <div style="display: flex; align-items: center; gap: 4px; justify-content: space-between; width: 100%;">
                    <span style="font-size: 14px; font-weight: 400; margin-left: 12px;">نسبت</span>
                    <span style="unicode-bidi: plaintext;">${point.y.toFixed(2)} صدم درصد</span>
                  </div>
                </div>
              `,
              )
              .join('')}
          </div>
        `;
      },
    },
    title: { text: '' },
    yAxis: {
      gridLineInterpolation: 'polygon',
      gridLineColor: 'Var(--color-border-neutral-secondary)',
      title: { text: '' },
      min: 0,
      labels: {
        style: {
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
          fontFamily: 'Vazirmatn',
        },
      },
      plotLines: [
        {
          value: data.data[0].mean,
          color: 'var(--color-border-accent-gray-600)',
          dashStyle: 'Dash',
          width: 1.5,
          zIndex: 5,
        },
      ],
    },
    xAxis: {
      tickLength: 0,
      tickPixelInterval: 120,
      reversed: false,
      type: 'datetime',
      labels: {
        formatter: function () {
          const d = new Date(this.value as number);
          return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        },
        style: {
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
          fontFamily: 'Vazirmatn',
        },
      },
    },

    series: [
      {
        type: 'area' as const,
        name: 'ارزش روزانه',
        color: 'var(--color-border-accent-blue-600)',
        fillColor: {
          linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 },
          stops: [
            [0, 'var(--coloropacity-surface-accent-blue-600-30per)'],
            [1, 'var(--coloropacity-surface-accent-blue-600-0per)'],
          ],
        },
        data: priceData,
        marker: { enabled: false },
        lineWidth: 2,
      },
    ],
  };

  return (
    <ReportCardBase
      onSubmit={handleSubmit}
      onRemove={onRemove}
      popupInfoItems={[]}
      settingOptions={[
        toBasicSetting(filterState[0], updateOption),
        toBasicSetting(filterState[1], updateOption),
        toBasicSetting(filterState[2], updateOption),
      ]}
      onShare={onShare}
      title={title ?? ''}
      onReplace={onReplace}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
};
