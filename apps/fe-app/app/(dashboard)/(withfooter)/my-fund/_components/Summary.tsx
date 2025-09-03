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
  Icon,
} from 'design-system';
import React, { useState } from 'react';
import { LineChart } from './LineChart';

interface SummaryProps {
  defaultQuantity: number;
  points: {
    date: string;
    value: number;
  }[];
  defaultValueChange: number;
  defaultPercentageChange: number;
}

interface HoverData {
  date: string;
  value: number;
}

export const Summary: React.FC<SummaryProps> = ({
  defaultQuantity,
  defaultValueChange,
  defaultPercentageChange,
  points,
}) => {
  const [hiddenContent, setHiddenContent] = useState(false);
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);
  const [activeTab, setActiveTab] = useState(0);

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
      <div className="mb-2">
        <SummaryCellCarousel cells={cells} />
      </div>
      <div className="flex w-full items-start justify-between gap-8">
        <div className="hidden xl:block">
          <div className="text-text-neutral-primary mb-6 flex items-center gap-2 text-lg font-medium">
            خلاصه موردی
            <div className="text-icon-neutral-secondary">
              <Icon name="info" size="md" />
            </div>
          </div>
          <div>
            <DataList
              mode="vertical"
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
        </div>
        <div className="flex-1">
          <div className="flex w-full justify-between lg:justify-end">
            <div className="text-text-neutral-primary mb-6 flex items-center gap-2 text-lg font-medium lg:hidden">
              خلاصه موردی
              <div className="text-icon-neutral-secondary">
                <Icon name="info" size="md" />
              </div>
            </div>
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
      <div className="mt-8 block lg:hidden">
        <DataList
          mode="carousel"
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
        />
      </div>
      <div className="mb-14 mt-6 flex items-center justify-center">
        <Tabs
          activeTab={activeTab}
          onClickTab={(newTabId) => {
            setActiveTab(newTabId);
            console.log('clicked tab id:', newTabId);
          }}
          variant="sliding"
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
