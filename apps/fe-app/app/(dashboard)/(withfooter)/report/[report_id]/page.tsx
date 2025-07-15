import { Breadcrumb, Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from './_components/ReportOverview';
import { TabsWrapper } from './_components/TabsWrapper';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { MarkdownRender } from './_components/MarkdownRender';
import rightWaveSVG from '@aress-assets/images/rightwaves.svg';
import leftWaveSVG from '@aress-assets/images/leftwaves.svg';

import Image from 'next/image';
import { OpenAPI, ReportsService } from '@openapi';
import { ReportWrapper } from './_components/ReportWrapper';
import { ReportSectionSkeleton } from '../../../(nofooter)/(dashboard)/_components/skeletons/ReportSectionSkeleton';
import { ReportTitleSectinoSkeleton } from './_components/skeletons/ReportTitleSectionSkeleton';
import { ReportTitleSettingSkeleton } from './_components/skeletons/ReportTitleSettingSkeleton';
import { ReportTabSkeleton } from './_components/skeletons/ReportTabSkeleton';
import { VideoPlayerSkeleton } from './_components/skeletons/VideoPlayerSkeleton';
import { MarkdownSkeleton } from './_components/skeletons/MarkdownSkeleton';
import { RelationReportSkeleton } from './_components/skeletons/RelationReportSkeleton';
async function getData(id: number) {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };
  const user = await ReportsService.getReportsByReportId({
    reportId: String(id),
  });
  return user;
}
const page = async () => {
  const REPORT = await getData(6);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  console.log(REPORT.relatedReports);

  return (
    <>
      <div className="px-8 pt-3">
        <Breadcrumb
          items={[
            { title: 'گزارش ها' },
            {
              title: REPORT?.title,
            },
          ]}
        />
      </div>
      <div className="text-text-neutral-primary mx-auto max-w-[1680px]">
        {/* Breadcrumb */}

        <section className="mb-16 flex w-full flex-col-reverse items-center gap-8 px-20 pt-6 xl:flex-row xl:items-start xl:justify-around">
          <div className="flex w-fit flex-col gap-6">
            {
              <ReportSectionSkeleton />
            }

            {/* <div className="flex w-fit flex-row items-center gap-1 text-sm font-normal">
              <Icon name="info" size="md" />
              <span>با زدن بر روی آیکون </span>
              <span className="flex flex-row items-center">
                {'('} <Icon name="settings" size="sm" />
                {')'}
              </span>
              <span> امکان تغییر تنظیمات پیشفرض پروژه وجود دارد.</span>
            </div> */}
            <ReportTitleSettingSkeleton />
          </div>
          {/* <ReportOverview
            title={REPORT?.title}
            category={REPORT?.category}
            summary={REPORT?.summary}
            userFavorite={REPORT?.userFavorite}
            isNew={REPORT?.isNew}
          /> */}
          <ReportTitleSectinoSkeleton />
        </section>
        {/* <TabsWrapper /> */}
        <ReportTabSkeleton />
        <section className="flex w-full flex-col items-center px-20" id="0">
          <SectionTitle align="center" level={3} title="ویدیو بررسی" />
          <div className="mt-10">
            {
              // REPORT.video ? 
              // <VideoPlayerWrapper data={REPORT.video} />
              // : 
              <VideoPlayerSkeleton />
            }
          </div>
        </section>

        <section
          className="relative flex flex-col items-center justify-center overflow-hidden px-4 pt-[112px] sm:px-10 md:px-20"
          id="1"
        >
          <div className="absolute -right-16 top-1/4 h-[760px] w-[288px]">
            <Image src={rightWaveSVG} alt="wave-right" fill />
          </div>
          <div
            className="absolute -left-16 top-10 h-[760px] w-[288px]"
            dir="ltr"
          >
            <Image src={leftWaveSVG} alt="wave-left" fill />
          </div>
          <SectionTitle align="center" level={3} title="اطلاعات بیشتر" />
          <div className="mt-2 flex flex-col text-right w-full">
            {/* Section Component */}
            <div className='flex flex-col gap-[100px]'>
              <MarkdownSkeleton />
              <MarkdownSkeleton />
              <MarkdownSkeleton />
            </div>
            {/* <MarkdownRender markdown={REPORT?.markdownDescription ?? ''} /> */}
          </div>
        </section>

        <section className="flex flex-col gap-12 pb-20 pt-[112px]" id="2">
          <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
          {/* {REPORT?.relatedReports && (
            <ReportsCarousel
              cards={REPORT?.relatedReports.map((REPORT) => {
                return {
                  title: REPORT.title,
                  categoryType: REPORT.category.title,
                  image: `${baseURL}${REPORT.image}`,
                  summary: REPORT.summary,
                  fixedBrief: false,
                  newBadge: REPORT.isNew,
                  userFavorite: REPORT.userFavorite,
                  videoBadge: !!REPORT.hasVideo,
                };
              })}
            />
          )} */}
          <div className='flex items-center justify-between'>
            <RelationReportSkeleton />
            <RelationReportSkeleton />
            <RelationReportSkeleton />
          </div>
        </section>
      </div>
    </>
  );
};

export default page;
