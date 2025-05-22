import { Breadcrumb, Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from './_components/ReportOverview';
import { TabsWrapper } from './_components/TabsWrapper';
import { ReportCardBaseWrapper } from './_components/ReportCardBaseWrapper';
import { ReportDetailPageApiResponse } from './_types/api.types';
import Markdown from 'react-markdown';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';
import { DashboardService, OpenAPI } from '@openapi';
import { fetchToken } from '../../../../(auth)/auth.utils';

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
    <div className="mx-auto max-w-[1680px]">
      {/* Breadcrumb */}
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
        className="flex flex-col items-center justify-center px-20 pt-[112px]"
        id="1"
      >
        <SectionTitle align="center" level={3} title="اطلاعات بیشتر" />
        <div className="mt-2 flex flex-col text-right">
          {/* Section Component */}
          <Markdown
            components={{
              // Custom renderer for the ul element
              ul: ({ node, ...props }) => (
                <ul
                  className="rtl marker:text-brand-600 list-disc text-right marker:text-3xl"
                  {...props}
                />
              ),
              // Custom renderer for h1 (titles)
              h1: ({ node, ...props }) => (
                <div className="before:bg-brand-600 relative pr-4 before:absolute before:bottom-3.5 before:right-0 before:h-2 before:w-2 before:rounded-full before:content-['']">
                  <h1
                    className="pt-10 text-right text-xl font-medium"
                    {...props}
                  />
                </div>
              ),
              // Custom renderer for h2 (subtitles)

              h2: ({ node, ...props }) => (
                <h2 className="text-right text-lg font-medium" {...props} />
              ),
              // Custom renderer for paragraphs
              p: ({ node, ...props }) => (
                <p
                  className="text-md mt-4 text-right font-normal leading-relaxed text-gray-600"
                  {...props}
                />
              ),
              // ** strong **
              strong: ({ node, ...props }) => (
                <strong className="text-lg font-medium text-black" {...props} />
              ),
              // Custom renderer for ordered lists
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pr-2.5 text-right text-lg font-medium leading-relaxed"
                  {...props}
                />
              ),
              // Custom renderer for list items
              li: ({ node, ...props }) => (
                <li className="text-right" {...props} />
              ),
            }}
          >
            {REPORT?.markdownDescription}
          </Markdown>
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
  );
};

export default page;
