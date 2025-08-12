export function ReportSectionSkeleton() {
  return (
    <div className="border-border-neutral-secondary h-[336px] w-[616px] rounded-2xl border-2 p-2">
      <div className="skeleton-shimmer h-[34px] w-1/2 rounded-2xl" />
      <div className="skeleton-shimmer mt-2 h-[1px] w-full rounded-2xl" />
      <div className="skeleton-shimmer mt-5 h-[34px] w-full rounded-2xl" />
    </div>
  );
}
