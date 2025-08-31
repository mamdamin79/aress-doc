export function RelationReportSkeleton() {
  return (
    <div className="relative h-[308px] w-[416px] rounded-2xl">
      <div className="skeleton-shimmer absolute top-0 z-0 h-full w-full rounded-2xl" />
      <div className="absolute right-4 top-4 z-10 h-[200px] w-[384px] rounded-2xl bg-white" />
      <div className="absolute top-[220px] z-10 mr-4 mt-4 h-[22px] w-[384px] rounded-2xl bg-white shadow-none" />
      <div className="absolute bottom-0 z-10 my-4 mr-4 flex items-center gap-4">
        <div className="h-[22px] w-[54px] rounded-2xl bg-white" />
        <div className="h-[22px] w-[94px] rounded-2xl bg-white" />
        <div className="h-[22px] w-[37px] rounded-2xl bg-white" />
        <div className="h-[22px] w-[37px] rounded-2xl bg-white" />
      </div>
    </div>
  );
}
