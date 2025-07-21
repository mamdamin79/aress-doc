import { OpenAPI, ReportsService } from '@openapi';
import { DynamicReportRenderer } from '../../../../(dashboard)/(nofooter)/(dashboard)/_components/DynamicReportRenderer';
import { fetchToken } from 'apps/fe-app/app/(auth)/auth.utils';

export default async function Page({
  params,
  searchParams,
}: {
  params: { chart_id: string; chart_title: string };
  searchParams: { [key: string]: string };
}) {
  const { chart_id, chart_title } = params;
  const token = await fetchToken();
  if (!token) {
    throw new Error('Failed to fetch access token');
  }

  OpenAPI.HEADERS = {
    Authorization: `Bearer ${token}`,
  };

  const { calculation, filters } = await ReportsService.postReportsByReportId({
    reportId: chart_id,
    requestBody: {
      selectedFilters: searchParams,
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
