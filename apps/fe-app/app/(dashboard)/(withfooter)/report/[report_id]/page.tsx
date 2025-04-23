import { Breadcrumb, Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from './_components/ReportOverview';
import { TabsWrapper } from './_components/TabsWrapper';
import { ReportCardBaseWrapper } from './_components/ReportCardBaseWrapper';
import { ReportDetailPageApiResponse } from './_types/api.types';
import Markdown from 'react-markdown';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';
import { DashboardService, OpenAPI } from '@openapi';

async function getData(id: number) {
  OpenAPI.HEADERS = {
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJ0ZXN0IiwiZXhwIjoxNzQ1NDE2MjY5fQ.fYoeXOvstJcWxcoExDW1fwwmvzi0L7aXqgO_3viizU0`,
  };

  const user = (await DashboardService.getDashboardReportsByReportId({
    reportId: id,
  })) as ReportDetailPageApiResponse;
  return user;
}
const page = async () => {
  const REPORT = await getData(1);
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
        <div className="flex w-fit flex-col gap-2">
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
        <div className="mt-12">
          <VideoPlayerWrapper />
        </div>
      </section>
      <section
        className="flex flex-col items-center justify-center px-20 pt-[112px]"
        id="1"
      >
        <SectionTitle align="center" level={3} title="اطلاعات بیشتر" />
        <div className="mt-12 flex flex-col items-center justify-center">
          {/* Section Component */}
          <Markdown
            components={{
              // Custom renderer for the ul element
              ul: ({ node, ...props }) => (
                <ul
                  className="rtl marker:text-brand-600 list-disc text-xl font-medium marker:text-3xl"
                  {...props}
                />
              ),
              // Custom renderer for h4 (titles)
              h4: ({ node, ...props }) => (
                <h4 className="mb-4 text-2xl font-medium" {...props} />
              ),
              // Custom renderer for paragraphs
              p: ({ node, ...props }) => (
                <p className="text-md mb-4 leading-relaxed" {...props} />
              ),
              // Custom renderer for ordered lists
              ol: ({ node, ...props }) => (
                <ol
                  className="list-decimal pr-2.5 text-right leading-relaxed"
                  {...props}
                />
              ),
              // Custom renderer for list items
              li: ({ node, ...props }) => <li className="mb-4" {...props} />,
            }}
          >
            {REPORT?.htmlDescription}
          </Markdown>
        </div>
      </section>
      <section className="flex flex-col gap-12 pt-[112px]" id="2">
        <SectionTitle align="center" level={2} title="گزارش‌های مرتبط" />
        {REPORT?.relatedReports && (
          <ReportsCarousel
            cards={REPORT?.relatedReports.map((REPORT) => {
              return {
                title: REPORT.title,
                categoryType: REPORT.category.title,
                image: REPORT.image,
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
      <div className="mb-6 h-14 w-full border-b border-gray-200"></div>
    </div>
  );
};

export default page;
