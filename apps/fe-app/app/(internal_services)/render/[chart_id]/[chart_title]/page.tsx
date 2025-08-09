import { OpenAPI, ReportsService } from '@openapi';
import { DynamicReportRenderer } from '../../../../(dashboard)/(nofooter)/(dashboard)/_components/DynamicReportRenderer';
import { cookies } from 'next/headers';

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ chart_id: string; chart_title: string }>;
  searchParams: Promise<{ [key: string]: string }>;
}) {
  const { chart_id, chart_title } = await params;
  const resolvedSearchParams = await searchParams;
  const cookieStore = await cookies();

  OpenAPI.TOKEN = cookieStore.get('access_token')?.value;

  const { calculation, filters } = await ReportsService.postReportsByReportId({
    reportId: chart_id,
    requestBody: {
      selectedFilters: resolvedSearchParams,
    },
  });

  return (
    <div className="h-[336px] w-[616px] bg-transparent">
      <DynamicReportRenderer
        identifier={Number(chart_id)}
        data={calculation}
        filters={filters}
        title={decodeURIComponent(chart_title)}
      />
    </div>
  );
}
