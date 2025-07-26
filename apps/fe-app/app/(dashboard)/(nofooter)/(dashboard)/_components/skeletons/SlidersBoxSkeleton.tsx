import { ReportSectionSkeleton } from './ReportSectionSkeleton';
import { ReportTitleSkeleton } from './ReportTitleSkeleton';

export function SlidersBoxSkeleton() {
  return (
    <div className="w-fit">
      <ReportTitleSkeleton />
      <section className="mt-6 flex w-full justify-center">
        <div className="grid w-full grid-cols-1 gap-6 xl:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <ReportSectionSkeleton key={`skeleton-report-${i}`} />
          ))}
        </div>
      </section>
    </div>
  );
}
