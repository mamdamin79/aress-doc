import {
  AssetInfoBox,
  DataList,
  SummaryCellCarousel,
  SummaryCellProps,
} from 'design-system';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useMemo, useState } from 'react';
import { baseOptions } from 'apps/fe-app/app/components/Reports/Report.config.shared';

export const Summary: React.FC = ({
  data,
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
  onHover,
  hoveredData,
}) => {
  const [dataState, setDataState] = useState(data);
  const [hiddenContent, setHiddenContent] = useState(false);

  const handleToggleHiddenContent = () => {
    setHiddenContent(!hiddenContent);
  };
  const displayQuantity = hoveredData ? hoveredData.value : defaultQuantity;
  const displayValueChange = defaultValueChange;
  const displayPercentageChange = defaultPercentageChange;

  const cells: SummaryCellProps[] = [
    {
      label: {
        icon: 'CustomCalendar',
        title: 'تاریخ ورود به صندوق',
      },
      value: '۱۴۰۲/۰۶/۰۸',
    },
    {
      label: {
        icon: 'CustomClock',
        title: 'سابقه صندوق',
      },
      value: '۷ سال و ۳ ماه',
    },
    {
      label: {
        icon: 'user',
        title: 'مدیر صندوق',
      },
      value: 'سبدگردان سهم آشنا',
    },
    {
      label: {
        icon: 'CustomBag',
        title: 'سیاست سرمایه‌گذاری',
      },
      value: 'مخاطره آمیز',
    },
    {
      label: {
        icon: 'CustomWallet',
        title: 'ارزش خالص دارایی',
      },
      value: '۴۰۸.۴ میلیارد ریال',
    },
    {
      label: {
        icon: 'CustomAlpha',
        title: 'بازده اضافی',
      },
      value: '۴.۱٪',
    },
    {
      label: {
        icon: 'CustomBeta',
        title: 'بای صندوق',
      },
      value: '۳.۸۴',
    },
  ];

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
      style:{
        width:741,
        height:510
      }
    },
    credits: { enabled: false },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },
    tooltip: {
      enabled: true,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      useHTML: true,
      formatter: function () {
        return '';
      },
    },
    plotOptions: {
      series: {
        point: {
          events: {
            mouseOver: function () {
              if (onHover) {
                const point = this as Highcharts.Point;
                const date = new Date(point.x as number);
                const formattedDate = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
                onHover({
                  date: formattedDate,
                  value: (point.y as number) * 1000000,
                });
              }
            },
            mouseOut: function () {
              if (onHover) {
                onHover(null);
              }
            },
          },
        },
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
      type: 'datetime',
      tickInterval: 1000 * 60 * 60 * 24 * 2,
      crosshair: {
        width: 1,
        color: 'var(--color-border-accent-blue-600)',
        dashStyle: 'Solid',
      },
      labels: {
        formatter: function () {
          const d = new Date(this.value as number);
          return `${d.getFullYear()}/${String(d.getMonth() + 1).padStart(2, '0')}/${String(d.getDate()).padStart(2, '0')}`;
        },
        style: {
          fontFamily: 'Vazirmatn',
          fontSize: '16px',
          color: 'var(--color-text-neutral-secondarycontrast)',
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
        marker: {
          enabled: false,
          states: {
            hover: {
              enabled: true,
              radius: 6,
              fillColor: 'var(--color-border-accent-blue-600)',
              lineWidth: 2,
              lineColor: 'var(--color-surface-neutral-primary)',
            },
          },
        },
        enableMouseTracking: true,
        lineWidth: 2,
      },
    ],
  };

  return (
    <div className="mt-12">
      <SummaryCellCarousel cells={cells} />

      <div className="flex w-full items-start justify-between gap-8">
        <div>
          <div className="text-text-neutral-primary mb-6 text-lg font-medium">
            خلاصه موردی
          </div>
          <DataList
            data={[
              {
                key: 'بازده صندوق',
                value: '۴.۳٪',
              },
              {
                key: 'بتا صندوق',
                value: '۱.۳ واحد',
              },
              {
                key: 'واحد های ابطال شده',
                value: '۳۵۶ واحد',
              },
              {
                key: 'واحد های صادر شده',
                value: '۶,۲۵۴ واحد',
              },
              {
                key: 'رنج قیمتی',
                value: '۳,۱۰۰-۳,۳۰۰ ریال',
              },
              {
                key: 'گردش دارایی',
                value: '۱۲٪',
              },
            ]}
            className="h-[544px] w-[346px]"
          />
        </div>
        <div className="h-[510px] w-[741px] flex-1">
          {/* <AssetInfoBox
            hiddenContent={hiddenContent}
            onToggleHiddenContent={handleToggleHiddenContent}
            quantity={displayQuantity}
            valueChange={displayValueChange}
            percentageChange={displayPercentageChange}
          /> */}
          <HighchartsReact highcharts={Highcharts} options={options} />
        </div>
      </div>
    </div>
  );
};
