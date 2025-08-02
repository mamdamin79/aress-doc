import { Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from '../_components/ReportOverview';
import { ReportWrapper } from '../_components/ReportWrapper';
import { TabsWrapper } from '../_components/TabsWrapper';
import { MarkdownRender } from '../_components/MarkdownRender';
import { ReportsService } from '@openapi';

import { ReactComponent as RightWaveSVG } from '@aress-assets/images/rightwaves.svg';
import { ReactComponent as LeftWaveSVG } from '@aress-assets/images/leftwaves.svg';
import { StaticImageData } from 'next/image';

async function getData(id: number, screenshotQueryId?: string) {
  const report = await ReportsService.getReportsByReportId({
    reportId: String(id),
    screenshotQueryId: screenshotQueryId,
  });

  return report;
}

export default async function ReportContent({
  id,
  searchParams,
}: {
  id: number;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const screenshotQueryId = (await searchParams)?.queryId as string | undefined;
  const REPORT = await getData(id, screenshotQueryId);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
  console.log('Search Params:', searchParams);

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
          {/*   <VideoPlayerWrapper data={REPORT.video} /> */}
        </div>
      </section>

      <section
        className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-[112px] sm:px-10 md:px-20"
        id="1"
      >
        <div className="absolute -right-16 top-1/4 h-[760px] w-[288px]">
          <RightWaveSVG className="h-full w-full" />
        </div>
        <div className="absolute -left-16 top-10 h-[760px] w-[288px]" dir="ltr">
          <LeftWaveSVG className="h-full w-full" />
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
              image:
                baseURL && rep.image
                  ? (`${baseURL}${rep.image}` as unknown as StaticImageData)
                  : null,
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
