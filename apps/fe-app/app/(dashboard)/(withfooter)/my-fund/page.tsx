'use client';
import { Breadcrumb, Button, FundsLogo, Tabs } from 'design-system';
import {
  SummaryCellCarousel,
  SummaryCellProps,
} from '../../../../../../libs/design-system/src';
import HighchartsReact from 'highcharts-react-official';
import Highcharts from 'highcharts/highstock';
import { baseOptions } from 'apps/fe-app/app/components/Reports/Report.config.shared';
import { useMemo, useState } from 'react';

export default function MyFund() {
  return (
    <div>
      <div className="mb-1 mr-8 mt-2">
        <Breadcrumb
          items={[
            {
              icon: 'home',
            },
            {
              title: 'صندوق من',
              link: '/my-fund',
            },
            {
              title: 'صندوق سرمایه گذاری سهم آشنا',
            },
          ]}
        />
      </div>
      <div className="mt-7 px-20">
        <div className="mb-7 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FundsLogo hasTag size="md" />
            <div className="text-text-neutral-primary text-xl font-semibold">
              صندوق سرمایه گذاری سهم آشنا
              <span className="font-medium"> (در سهام)</span>
            </div>
          </div>
          <Button
            className="w-[183px]"
            iconRight={{ name: 'plus', size: 'lg' }}
          >
            افزودن به دیده‌بان
          </Button>
        </div>
        <Tabs
          activeTab={0}
          className="w-full"
          fullWidthDivider
          onClickTab={(id) => console.log(id)}
          variant="lined"
          tabs={[
            {
              id: 'tab1',
              title: 'خلاصه',
              content: <Summary />,
            },
            {
              id: 'tab2',
              title: 'تحلیل بازدهی',
            },
            {
              id: 'tab3',
              title: 'ارزیابی ریسک',
            },
          ]}
        />
      </div>
    </div>
  );
}

const Summary = () => {
  const [dataState] = useState({
    data: [
      {
        mean: 14000, // نمونه مقدار میانگین
        points: [
          { date: '2025-02-01', value: 13200 },
          { date: '2025-02-05', value: 13800 },
          { date: '2025-02-10', value: 13500 },
          { date: '2025-02-15', value: 14200 },
          { date: '2025-02-20', value: 14000 },
          { date: '2025-03-01', value: 14600 },
          { date: '2025-03-10', value: 16000 },
          { date: '2025-03-15', value: 14000 },
          { date: '2025-03-20', value: 15000 },
          { date: '2025-03-25', value: 14700 },
          { date: '2025-03-31', value: 15300 },
        ],
      },
    ],
  });

  const priceData = useMemo<[number, number][]>(() => {
    if (!dataState.data[0].points.length) return [];
    return dataState.data[0].points.map(({ date, value }) => {
      const [year, month, day] = date.split('-').map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      return [timestamp, value];
    });
  }, [dataState]);

  const options: Highcharts.Options = {
    chart: {
      backgroundColor: 'var(--color-surface-neutral-primary)',
      type: 'area',
      style: { fontFamily: 'Vazirmatn', direction: 'rtl' },
      height: 500,
    },
    title: { text: '' },
    credits: { enabled: false },
    legend: { enabled: false },
    navigator: { enabled: false },
    rangeSelector: { enabled: false },
    scrollbar: { enabled: false },

    tooltip: {
      shared: true,
      useHTML: true,
      backgroundColor: 'transparent',
      borderWidth: 0,
      shadow: false,
      positioner: function (labelWidth, labelHeight, point) {
        return {
          x: point.plotX + this.chart.plotLeft - labelWidth / 2,
          y: point.plotY - labelHeight - 10,
        };
      },
      formatter: function (this: any) {
        const gregorianDate = new Date(this.x as number);
        const formattedDate = `${gregorianDate.getFullYear()}/${String(
          gregorianDate.getMonth() + 1,
        ).padStart(
          2,
          '0',
        )}/${String(gregorianDate.getDate()).padStart(2, '0')}`;
        return `
          <div dir="rtl"
            style="
              background: var(--color-surface-neutral-inverse);
              color: var(--color-text-neutral-oninverse);
              border-radius: 10px;
              padding: 8px 16px;
              font-family: Vazirmatn;
              font-size: 14px;
              font-weight: 500;
              line-height: 26px;
              text-align: right;
              box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
              backdrop-filter: blur(6px);
            ">
            <div style="font-weight: 500;">${formattedDate}</div>
            ${this.points
              ?.map(
                (point: any) => `
                  <div style="display: flex; align-items: center; gap: 4px;">
                    <span style="color:${point.series.color}; font-size: 12px;">●</span>
                    <div style="display: flex; justify-content: space-between; align-items: center; gap: 8px; width: 100%;">
                      <span>${point.series.name}</span>
                      <span>${Math.round(point.y)} ریال</span>
                    </div>
                  </div>
                `,
              )
              .join('')}
          </div>
        `;
      },
    },

    yAxis: {
      gridLineColor: 'var(--color-border-neutral-secondary)',
      title: { text: '' },
      // min: 12000,
      // max: 16000,
      // tickPositions: [12000, 13000, 14000, 15000, 16000],
      labels: {
        formatter: function () {
          if (this.value === 12000) {
            return `0 (${this.value})`;
          }
          return `${this.value} ریال`;
        },
        style: {
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },
    xAxis: {
      reversed: true,
      type: 'datetime',
      labels: {
        style: {
          fontSize: '12px',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
    },

    series: [
      {
        type: 'area',
        name: 'قیمت هر واحد سرمایه‌گذاری',
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
      // ...(dataState.data[0]?.mean
      //   ? [
      //       {
      //         type: 'line',
      //         name: 'میانگین قیمت',
      //         color: 'red',
      //         dashStyle: 'Dash',
      //         marker: { enabled: false },
      //         data: [
      //           [priceData[0]?.[0] ?? 0, dataState.data[0].mean],
      //           [
      //             priceData[priceData.length - 1]?.[0] ?? 0,
      //             dataState.data[0].mean,
      //           ],
      //         ],
      //       },
      //     ]
      //   : []),
    ],
  };

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

  return (
    <>
      <div className="mt-12">
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
      <div>
        {/* <SummaryCellCarousel cells={cells} /> */}
      </div>
    </>
  );
};
