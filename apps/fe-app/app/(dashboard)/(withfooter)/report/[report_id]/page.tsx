import { Breadcrumb } from 'design-system';
import ReportContent from './_components/ReportContent';
import { Suspense } from 'react';
import { cookies } from 'next/headers';
import { OpenAPI } from '@openapi';
interface ReportPageParams {
  params: Promise<{ report_id: string }>;
}
export default async function ReportPage({ params }: ReportPageParams) {
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

  return (
    <>
      <div className="px-8 pt-3">
        <Breadcrumb items={[{ title: 'گزارش ها' }, { title: '...' }]} />
      </div>

      <Suspense
        fallback={
          <div className="mt-20 text-center">در حال بارگذاری گزارش...</div>
        }
      >
        <ReportContent id={id} />
      </Suspense>
    </>
  );
}
