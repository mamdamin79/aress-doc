import { Icon, SectionTitle, ReportsCarousel } from 'design-system';
import { ReportOverview } from '../_components/ReportOverview';
import { ReportWrapper } from '../_components/ReportWrapper';
import { TabsWrapper } from '../_components/TabsWrapper';
import { VideoPlayerWrapper } from '../_components/VideoPlayerWrapper';
import { MarkdownRender } from '../_components/MarkdownRender';
import { fetchToken } from '../../../../../(auth)/auth.utils';
import { OpenAPI, ReportsService } from '@openapi';
import Image, { StaticImageData } from 'next/image';

import rightWaveSVG from '@aress-assets/images/rightwaves.svg?url';
import leftWaveSVG from '@aress-assets/images/leftwaves.svg?url';

async function getData(id: number) {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }

  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };

  const report = await ReportsService.getReportsByReportId({
    reportId: String(id),
  });

  return report;
}

export default async function ReportContent({ id }: { id: number }) {
  const REPORT = await getData(id);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <div className="text-text-neutral-primary mx-auto max-w-[1680px]">
      <section className="mb-16 flex w-full flex-col-reverse items-center gap-8 px-20 pt-6 xl:flex-row xl:items-start xl:justify-around">
        <div className="flex w-fit flex-col gap-6">
          <ReportWrapper
            data={REPORT.reportCalculation}
            title={REPORT.title}
            identifier={REPORT.identifier}
          />

          <div className="flex w-fit flex-row items-center gap-1 text-sm font-normal">
            <Icon name="info" size="md" />
            <span>با زدن بر روی آیکون </span>
            <span className="flex flex-row items-center">
              {'('} <Icon name="settings" size="sm" />
              {')'}
            </span>
            <span> امکان تغییر تنظیمات پیشفرض پروژه وجود دارد.</span>
          </div>
        </div>

        <ReportOverview
          title={REPORT?.title}
          category={REPORT?.category}
          summary={REPORT?.summary}
          userFavorite={REPORT?.userFavorite}
          isNew={REPORT?.isNew}
        />
      </section>

      <TabsWrapper />

      <section className="flex w-full flex-col items-center px-20" id="0">
        <SectionTitle align="center" level={3} title="ویدیو بررسی" />
        <div className="mt-10">
          <VideoPlayerWrapper data={REPORT.video} />
        </div>
      </section>

      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-[112px] sm:px-10 md:px-20"
        id="1"
      >
        <div className="absolute -right-16 top-1/4 h-[760px] w-[288px]">
          <Image src={rightWaveSVG} alt="wave-right" fill />
        </div>
        <div className="absolute -left-16 top-10 h-[760px] w-[288px]" dir="ltr">
          <Image src={leftWaveSVG} alt="wave-left" fill />
        </div>
        <SectionTitle align="center" level={3} title="اطلاعات بیشتر" />
        <div className="mt-2 flex flex-col text-right">
          <MarkdownRender markdown={REPORT?.markdownDescription ?? ''} />
        </div>
      </section>

      <section className="flex flex-col gap-12 pb-20 pt-[112px]" id="2">
        <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
        {REPORT?.relatedReports && (
          <ReportsCarousel
            cards={REPORT.relatedReports.map((rep) => ({
              title: rep.title,
              categoryType: rep.category.title,
              image: `${baseURL}${rep.image}` as unknown as StaticImageData,
              summary: rep.summary,
              fixedBrief: false,
              newBadge: rep.isNew,
              userFavorite: rep.userFavorite,
              videoBadge: !!rep.hasVideo,
            }))}
          />
        )}
      </section>
    </div>
  );
}
