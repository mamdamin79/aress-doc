import { Breadcrumb } from 'design-system';
import ReportContent from './_components/ReportContent';
import { Suspense } from 'react';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const id = Number(searchParams.id);

  if (!id || isNaN(id)) {
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
