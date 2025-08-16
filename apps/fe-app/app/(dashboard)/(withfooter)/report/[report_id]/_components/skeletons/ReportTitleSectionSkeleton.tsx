export function ReportTitleSectinoSkeleton() {
  return (
    <div className="w-full">
      <div className="skeleton-shimmer h-[38px] w-full rounded-2xl" />
      <div className="my-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer h-[22px] w-[54px] rounded-2xl" />
          <div className="skeleton-shimmer h-[22px] w-[94px] rounded-2xl" />
          <div className="skeleton-shimmer h-[22px] w-[37px] rounded-2xl" />
          <div className="skeleton-shimmer h-[22px] w-[37px] rounded-2xl" />
        </div>
        <div className="flex items-center gap-3">
          <div className="skeleton-shimmer h-[32px] w-[32px] rounded-full" />
          <div className="skeleton-shimmer h-[38px] w-[163px] rounded-md" />
        </div>
      </div>
      <div className="skeleton-shimmer mb-4 h-[2px] w-full" />
      <div className="flex flex-col gap-2">
        <div className="skeleton-shimmer h-[30px] w-[82px] rounded-2xl" />
        <div className="skeleton-shimmer h-[26px] w-full rounded-2xl" />
        <div className="skeleton-shimmer h-[26px] w-[335px] rounded-2xl" />
      </div>
    </div>
  );
}
