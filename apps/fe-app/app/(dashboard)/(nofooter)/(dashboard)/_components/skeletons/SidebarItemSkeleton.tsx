export function SidebarItemSkeleton() {
  return (
    <div>
      <div className="mb-[9px] mt-3 flex items-center justify-between">
        <div className="skeleton-shimmer h-[26px] w-[74px] rounded-2xl" />
        <div className="flex items-center justify-center gap-[47px]">
          <div className="skeleton-shimmer h-[43px] w-[88px] rounded-2xl" />
          <div className="skeleton-shimmer h-[22px] w-[41px] rounded-2xl" />
        </div>
      </div>
      <div className="skeleton-shimmer h-[1px] w-full rounded-2xl" />
    </div>
  );
}
