import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { ReportCardBase } from '../../ReportCardBase';
import {baseOptions, yAxisLabels, xAxisLabels} from './../Report.config.shared'


interface Props {
  categories: string[];
  data: number[];
  flow: 'inflow' | 'outflow';
  title: string;
}

export function Report2({ categories, data, flow, title }: Props) {
  const seriesData = data.map((value) => ({
    y: value,
    color:
      flow === 'inflow'
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
    legend: {enabled: false},
    series: [
      {
        name: 'صنعت',
        type: 'bar',
        data: seriesData,
        borderRadius: 7,
      },
    ],
    xAxis: {
      opposite: true,
      lineColor: 'var(--color-border-neutral-highcontrast)',
      categories: categories,
      labels: xAxisLabels,
    },
  };

  return (
    <ReportCardBase
      title={title}
      popupInfoItems={[
        {
          title: 'جریان ورودی',
          content:
            'جریان ورودی به معنای ورود سرمایه به بازار، یک صنعت یا یک دارایی خاص از طریق خرید سهام یا حق تقدم توسط سرمایه‌گذاران است. این جریان، افزایش تمایل بازار به سرمایه‌گذاری در آن حوزه و تزریق پول تازه به صنایع یا بخش‌های مختلف را نشان می‌دهد.',
        },
        {
          title: 'جریان خروجی',
          content:
            'جریان خروجی به معنای خروج سرمایه از بازار یا یک صنعت یا یک دارایی خاص از طریق فروش سهام یا حق تقدم، توسط سرمایه‌گذاران است. این جریان نشان‌دهنده‌ی کاهش تمایل بازار به سرمایه‌گذاری در آن حوزه و برداشت پول از صنایع یا بخش‌های مختلف می‌باشد.',
        },
        {
          title: 'ورود سرمایه‌گذاران حقیقی',
          content:
            'ورود سرمایه‌گذاران حقیقی به مجموع خالص سرمایه‌ای گفته می‌شود که توسط افراد عادی (سرمایه‌گذاران حقیقی) برای خرید سهام و حق تقدم در معاملات خرد و بلوکی به بازار تزریق می‌شود.',
        },
        {
          title: 'خروج سرمایه‌گذاران حقیقی',
          content:
            'خروج سرمایه‌گذاران حقیقی به مجموع خالص سرمایه‌ای گفته می‌شود که توسط افراد عادی (سرمایه‌گذاران حقیقی) از طریق فروش سهام و حق تقدم در معاملات خرد و بلوکی از بازار خارج می‌شود.',
        },
        {
          title: 'ورود سرمایه‌گذاران حقوقی',
          content:
            'ورود سرمایه‌گذاران حقوقی به مجموع خالص سرمایه‌ای گفته می‌شود که توسط شرکت‌ها، سازمان‌ها و نهادهای مالی (سرمایه‌گذاران حقوقی) برای خرید سهام و حق تقدم در معاملات خرد و بلوکی به بازار تزریق می‌شود.',
        },
        {
          title: 'خروج سرمایه‌گذاران حقوقی',
          content:
            'خروج سرمایه‌گذاران حقوقی به مجموع خالص سرمایه‌ای گفته می‌شود که توسط شرکت‌ها، سازمان‌ها و نهادهای مالی (سرمایه‌گذاران حقوقی) از طریق فروش سهام و حق تقدم در معاملات خرد و بلوکی از بازار خارج می‌شود.',
        },
      ]}
    >
      <HighchartsReact highcharts={Highcharts} options={options} />
    </ReportCardBase>
  );
}
