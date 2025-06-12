import { Breadcrumb, Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from './_components/ReportOverview';
import { TabsWrapper } from './_components/TabsWrapper';
import { ReportCardBaseWrapper } from './_components/ReportCardBaseWrapper';
import { ReportDetailPageApiResponse } from './_types/api.types';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';
import { DashboardService, OpenAPI } from '@openapi';
import { fetchToken } from '../../../../(auth)/auth.utils';
import { MarkdownRender } from './_components/MarkdownRender';
import rightWaveSVG from '@aress-assets/images/rightwaves.svg';
import leftWaveSVG from '@aress-assets/images/leftwaves.svg';

import Image from 'next/image';
async function getData(id: number) {
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }
  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };
  const user = (await DashboardService.getDashboardReportsByReportId({
    reportId: id,
  })) as ReportDetailPageApiResponse;
  return user;
}
const page = async () => {
  const REPORT = await getData(1);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;
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

        <section className="mb-16 flex w-full flex-col-reverse items-center gap-8 px-20 pt-6 xl:flex-row xl:justify-around">
          <div className="flex w-fit flex-col gap-6">
            <ReportCardBaseWrapper />

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
            <VideoPlayerWrapper />
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
          <div className="mt-2 flex flex-col text-right">
            {/* Section Component */}
            <MarkdownRender markdown={REPORT?.markdownDescription} />
          </div>
        </section>

        <section className="flex flex-col gap-12 pb-20 pt-[112px]" id="2">
          <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
          {REPORT?.relatedReports && (
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
                  videoBadge: !!REPORT.video,
                };
              })}
            />
          )}
        </section>
      </div>
    </>
  );
};

export default page;
