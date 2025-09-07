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
  VideoQuality,
} from 'design-system';
import React, { useMemo, useState } from 'react';
import { LineChart } from './LineChart';
import {
  FundSummaryBaseInfoApiModel,
  FundSummaryCaseByCaseApiModel,
  FundVideoPlaylistItemApiModel,
} from '@openapi';

interface SummaryProps {
  defaultQuantity: number;
  points: {
    date: string;
    value: number;
  }[];
  defaultValueChange: number;
  defaultPercentageChange: number;
  fundSummaryBasicInfo: FundSummaryBaseInfoApiModel;
  fundSummaryCaseByCase: FundSummaryCaseByCaseApiModel;
  fundVideoPlaylist: Array<FundVideoPlaylistItemApiModel>;
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
  fundSummaryBasicInfo,
  fundSummaryCaseByCase,
  fundVideoPlaylist,
}) => {
  const [hiddenContent, setHiddenContent] = useState(false);
  const [hoveredData, setHoveredData] = useState<HoverData | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const displayQuantity = hoveredData ? hoveredData.value : defaultQuantity;
  const displayValueChange = defaultValueChange;
  const displayPercentageChange = defaultPercentageChange;

  function calculateFundAge(isoDate: string): string {
    if (!isoDate) return '-';
    const start = new Date(isoDate);
    const now = new Date();
    const diffMonths =
      (now.getFullYear() - start.getFullYear()) * 12 +
      (now.getMonth() - start.getMonth());

    const years = Math.floor(diffMonths / 12);
    const months = diffMonths % 12;

    return `${years} سال و ${months} ماه`;
  }

  function formatRial(value: number): string {
    if (!value) return '-';
    return `${(value / 1_000_000_000).toFixed(1)} میلیارد ریال`;
  }

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
      value: fundSummaryBasicInfo.initiationJdate,
    },
    {
      label: {
        icon: 'CustomClock',
        title: 'سابقه صندوق',
      },
      value: calculateFundAge(fundSummaryBasicInfo.initiationDate),
    },
    {
      label: {
        icon: 'user',
        title: 'مدیر صندوق',
      },
      value: fundSummaryBasicInfo.manager,
    },
    {
      label: {
        icon: 'CustomBag',
        title: 'سیاست سرمایه‌گذاری',
      },
      value: fundSummaryBasicInfo.investmentStrategy,
    },
    {
      label: {
        icon: 'wallet',
        title: 'ارزش خالص دارایی',
      },
      value: formatRial(fundSummaryBasicInfo.assetUnderManagementRials),
    },
    {
      label: {
        icon: 'CustomAlpha',
        title: 'بازده اضافی',
      },
      value: `${fundSummaryBasicInfo.alphaSinceInitiationPercent}٪`,
    },
    {
      label: {
        icon: 'CustomBeta',
        title: 'بتای صندوق',
      },
      value: `${fundSummaryBasicInfo.betaSinceInitiationPercent}٪`,
    },
  ];

  const dataListData = [
    {
      key: 'بازده صندوق',
      value: `${fundSummaryCaseByCase.returnInPeriodPercent}٪`,
    },
    {
      key: 'بتا صندوق',
      value: `${fundSummaryCaseByCase.betaInPeriodPercent} واحد`,
    },
    {
      key: 'واحد های ابطال شده',
      value: `${fundSummaryCaseByCase.revokedUnitsInPeriod.toLocaleString()} واحد`,
    },
    {
      key: 'واحد های صادر شده',
      value: `${fundSummaryCaseByCase.issuedUnitsInPeriod.toLocaleString()} واحد`,
    },
    {
      key: 'رنج قیمتی',
      value: `${fundSummaryCaseByCase.priceRangeMinimumRials.toLocaleString()} - ${fundSummaryCaseByCase.priceRangeMaximumRials.toLocaleString()} ریال`,
    },
    {
      key: 'گردش دارایی',
      value: `${fundSummaryCaseByCase.assetTurnoverRatioPercent}٪`,
    },
  ];

  // Online videos array
  const baseURL = process.env.NEXT_PUBLIC_API_URL ?? '';

  const videos: Video[] = useMemo(() => {
    return fundVideoPlaylist
      .map((videoApi) => {
        const qualities: VideoQuality[] = [
          { src: videoApi.video.mp4Video1080P, label: '1080' },
          { src: videoApi.video.mp4Video720P, label: '720' },
          { src: videoApi.video.mp4Video480P, label: '480' },
          { src: videoApi.video.mp4Video360P, label: '360' },
          { src: videoApi.video.mp4Video240P, label: '240' },
        ]
          .filter((q) => !!q.src)
          .map((q) => ({
            ...q,
            src: q.src!.startsWith('http') ? q.src! : `${baseURL}${q.src}`,
          }));

        if (!qualities.length) return null;

        return {
          src: qualities[0].src,
          title: videoApi.video.title,
          date: videoApi.recordJdate,
          poster: videoApi.video.poster
            ? videoApi.video.poster.startsWith('http')
              ? videoApi.video.poster
              : `${baseURL}${videoApi.video.poster}`
            : undefined,
          qualities,
          avatarUrl: videoApi.intervieweeImageThumbnail
            ? videoApi.intervieweeImageThumbnail.startsWith('http')
              ? videoApi.intervieweeImageThumbnail
              : `${baseURL}${videoApi.intervieweeImageThumbnail}`
            : undefined,
          name: videoApi.intervieweeName || undefined,
          jobTitle: videoApi.intervieweeRole || undefined,
          spriteBaseUrl: `${baseURL}${videoApi.video.thumbnailImages[0].image}`,
        };
      })
      .filter(Boolean) as Video[];
  }, [fundVideoPlaylist, baseURL]);

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
              data={dataListData}
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
        <DataList mode="carousel" data={dataListData} />
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
