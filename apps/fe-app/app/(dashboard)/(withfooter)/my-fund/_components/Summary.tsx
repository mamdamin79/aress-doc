import {
  AssetInfoBox,
  DataList,
  SectionTitle,
  SummaryCellCarousel,
  SummaryCellProps,
  Tabs,
  VideoPlayer,
  PlayList,
  Video,
} from 'design-system';
import Highcharts from 'highcharts/highstock';
import HighchartsReact from 'highcharts-react-official';
import React, { useMemo, useState } from 'react';
import { baseOptions } from 'apps/fe-app/app/components/Reports/Report.config.shared';

export const Summary: React.FC = ({
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
  points,
}) => {
  const [hiddenContent, setHiddenContent] = useState(false);
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);

  const displayQuantity = hoveredData ? hoveredData.value : defaultQuantity;
  const displayValueChange = defaultValueChange;
  const displayPercentageChange = defaultPercentageChange;

  const handleChartHover = (data: HoverData | null) => {
    setHoveredData(data);
  };
  const handleToggleHiddenContent = () => {
    setHiddenContent(!hiddenContent);
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
        icon: 'wallet',
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

  // Online videos array
  const videos: Video[] = [
    {
      qualities: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
          label: '1080',
        },
        {
          src: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4',
          label: '720',
        },
        {
          src: 'https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4',
          label: '360',
        },
      ],
      title: 'Big Buck Bunny',
      jobTitle: 'فیلمساز انیمیشن',
      avatarUrl: 'https://i.pravatar.cc/80?img=1',
      name: 'محمد باقر خادمی',
      poster:
        'https://peach.blender.org/wp-content/uploads/title_anouncement.jpg?x11217',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      date: '1403/09/22',
    },
    {
      qualities: [
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          label: '1080',
        },
        {
          src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
          label: '720',
        },
        {
          src: 'https://www.rmp-streaming.com/media/big-buck-bunny-360p.mp4',
          label: '360',
        },
      ],
      title: 'Elephants Dream',
      jobTitle: 'برنامه‌نویس فرانت‌اند',
      avatarUrl: 'https://i.pravatar.cc/80?img=2',
      name: 'علی رضایی',
      poster: 'https://dummyimage.com/600x400/000/fff.jpg&text=Elephants+Dream',
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      date: '1403/11/22',
    },
  ];

  const [selectedVideo, setSelectedVideo] = useState<Video>(videos[0]);

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
        <div className="flex-1">
          <div className="flex w-full justify-end">
            <AssetInfoBox
              hiddenContent={hiddenContent}
              onToggleHiddenContent={handleToggleHiddenContent}
              quantity={displayQuantity}
              valueChange={displayValueChange}
              percentageChange={displayPercentageChange}
            />
          </div>
          <LineChart
            hiddenContent={hiddenContent}
            onHover={handleChartHover}
            points={points}
          />
        </div>
      </div>
      <div className="mb-14 mt-6 flex items-center justify-center">
        <Tabs
          variant="sliding"
          activeTab={0}
          tabs={[
            { id: '1', title: 'یک ماهه' },
            { id: '2', title: 'سه ماهه' },
            { id: '3', title: 'شش ماهه' },
            { id: '4', title: 'نه ماهه' },
            { id: '4', title: 'یک ساله' },
          ]}
        />
      </div>
      <div className="bg-surface-neutral-background mb-12 h-[1px] w-full border border-dashed"></div>
      <div>
        <div className="mb-12">
          <SectionTitle
            title="مصاحبه با مدیر صندوق سهم آشنا"
            align="center"
            level={3}
          />
        </div>
        {/* Video player with playlist */}
        <div className="mx-auto mb-40 flex w-full items-center justify-center">
          <div className="w-full max-w-[816px] gap-6 2xl:flex 2xl:max-w-full 2xl:flex-row-reverse 2xl:justify-between">
            <div>
              <VideoPlayer
                videos={videos}
                setSelectedVideo={setSelectedVideo}
                {...selectedVideo}
                className="mb-6 h-[396px] min-w-[704px] xl:w-[816px] 2xl:h-[459px] 2xl:w-[816px]"
                selectedVideo={selectedVideo}
              />
            </div>
            <div className="h-[459px] 2xl:min-w-[536px] 2xl:flex-1">
              <PlayList
                playListTitle="لیست مصاحبه ها"
                isFullscreen={false}
                videos={videos}
                setSelectedVideo={setSelectedVideo}
                selectedVideo={selectedVideo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface LineChartProps {
  points: {
    date: string;
    value: number;
  }[];
  onHover?: (data: { date: string; value: number } | null) => void;
  hiddenContent?: boolean;
}
const LineChart = ({
  points,
  onHover,
  hiddenContent = false,
}: LineChartProps) => {
  const priceData = useMemo<[number, number][]>(() => {
    if (!points.length) return [];

    return points.map(({ date, value }) => {
      const [year, month, day] = date.split('-').map(Number);
      const timestamp = Date.UTC(year, month - 1, day);
      return [timestamp, parseFloat(value.toFixed(2))];
    });
  }, [points]);

  // Calculate Y-axis range
  const yAxisConfig = useMemo(() => {
    if (!priceData.length) return { min: 0 };

    const values = priceData.map(([, value]) => value);
    const minValue = Math.min(...values);
    const maxValue = Math.max(...values);

    // If all values are the same (including all zeros)
    if (minValue === maxValue) {
      if (minValue === 0) {
        // For all zeros, set a range that shows the line at the bottom
        return { min: 0, max: 10 };
      } else {
        // For other constant values, add some padding
        const padding = Math.abs(minValue) * 0.1;
        return {
          min: Math.max(0, minValue - padding),
          max: maxValue + padding,
        };
      }
    }

    // For varying values, let Highcharts handle it but ensure min is 0
    return { min: 0 };
  }, [priceData]);

  const options: Highcharts.Options = {
    ...baseOptions,
    legend: { enabled: false },
    chart: {
      backgroundColor: 'var(--color-surface-neutral-background)',
      type: 'line',
      style: {
        width: 741,
        height: 510,
      },
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
      ...baseOptions.yAxis,
      gridLineInterpolation: 'polygon',
      gridLineColor: 'Var(--color-border-neutral-secondary)',
      title: { text: '' },
      ...yAxisConfig,
      labels: {
        formatter: function () {
          return hiddenContent ? '.....' : `${this.value}`;
        },
        style: {
          fontSize: '16px',
          fontWeight: '400',
          fontFamily: 'Vazirmatn',
          color: 'var(--color-text-neutral-secondarycontrast)',
        },
      },
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
        data: priceData.map((point, index) => {
          if (index === 0) {
            return {
              x: point[0],
              y: point[1],
              marker: {
                enabled: true,
                radius: 4,
                fillColor: 'var(--color-border-accent-blue-600)',
                lineWidth: 2,
                lineColor: 'var(--color-border-accent-blue-600)',
                symbol: 'circle',
              },
            };
          }
          return { x: point[0], y: point[1] };
        }),
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
    <div className="w-full">
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  );
};
