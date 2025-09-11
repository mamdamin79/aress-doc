import { Breadcrumb, Icon, ReportsCarousel, SectionTitle } from 'design-system';
import { ReportOverview } from './_components/ReportOverview';
import { ReportWrapper } from './_components/ReportWrapper';
import { TabsWrapper } from './_components/TabsWrapper';
import { MarkdownRender } from './_components/MarkdownRender';
import { ReportsService } from '@openapi';
import { cookies } from 'next/headers';
import { OpenAPI } from '@openapi';
import { Metadata } from 'next';

import { ReactComponent as RightWaveSVG } from '@aress-assets/images/rightwaves.svg';
import { ReactComponent as LeftWaveSVG } from '@aress-assets/images/leftwaves.svg';
import { StaticImageData } from 'next/image';
import { VideoPlayerWrapper } from './_components/VideoPlayerWrapper';

interface ReportPageParams {
  params: Promise<{ report_id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

async function getData(id: string, screenshotQueryId?: string) {
  const report = await ReportsService.getReportsByReportId({
    reportId: String(id),
    screenshotQueryId: screenshotQueryId,
  });

  return report;
}

export async function generateMetadata({
  params,
  searchParams,
}: ReportPageParams): Promise<Metadata> {
  const { report_id: id } = await params;
  const cookieStore = await cookies();

  OpenAPI.TOKEN = cookieStore.get('access_token')?.value;

  if (!id) {
    return {
      title: 'گزارش نامعتبر',
      description: 'آی‌دی گزارش نامعتبر است.',
    };
  }

  try {
    const screenshotQueryId = (await searchParams)?.queryId as
      | string
      | undefined;
    const REPORT = await getData(id, screenshotQueryId);
    const baseURL = process.env.NEXT_PUBLIC_API_URL;

    const imageUrl = REPORT.screenshotUrl
      ? `${baseURL}${REPORT.screenshotUrl}`
      : REPORT.image
        ? `${baseURL}${REPORT.image}`
        : null;

    return {
      title: REPORT.title,
      description: REPORT.summary,
      openGraph: {
        title: REPORT.title,
        description: REPORT.summary,
        images: imageUrl
          ? [
              {
                url: imageUrl,
                width: 1200,
                height: 630,
                alt: REPORT.title,
              },
            ]
          : [],
        type: 'article',
      },
      twitter: {
        card: 'summary_large_image',
        title: REPORT.title,
        description: REPORT.summary,
        images: imageUrl ? [imageUrl] : [],
      },
    };
  } catch {
    return {
      title: 'گزارش',
      description: 'گزارش مالی',
    };
  }
}

export default async function ReportPage({
  params,
  searchParams,
}: ReportPageParams) {
  const { report_id } = await params;
  const cookieStore = await cookies();

  OpenAPI.TOKEN = cookieStore.get('access_token')?.value;
  const id = String(report_id);

  if (!id) {
    return (
      <div className="text-text-accent-red-primary-600 mt-20 text-center font-semibold">
        آی‌دی گزارش نامعتبر است.
      </div>
    );
  }

  const screenshotQueryId = (await searchParams)?.queryId as string | undefined;
  const REPORT = await getData(id, screenshotQueryId);
  const baseURL = process.env.NEXT_PUBLIC_API_URL;

  return (
    <>
      <div className="px-8 pt-3">
        <Breadcrumb
          items={[{ title: 'گزارش ها', link: '/reports' }, { title: '' }]}
        />
      </div>

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
            reportId={REPORT?.identifier}
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
            <RightWaveSVG className="h-full w-full" />
          </div>
          <div
            className="absolute -left-16 top-10 h-[760px] w-[288px]"
            dir="ltr"
          >
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
    </>
  );
}
